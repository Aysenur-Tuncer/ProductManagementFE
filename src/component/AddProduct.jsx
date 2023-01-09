import React, { useState } from "react";
import Navbar from "./Navbar";

function AddProduct() {
  const [product, setProduct] = useState({
    productName: "",
    price: "",
    stock: "",
    id:"",
  });

  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setProduct({ ...product, [e.target.name]: value });
  };

  const ProductRegsiter = (e) => {
    e.preventDefault();
    saveProduct();
  };

  const saveProduct = () => {
    fetch("/api/product/saveProduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": 'Bearer ' + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        productName: product.productName,
        price: product.price,
        stock: product.stock,
        id:localStorage.getItem("currentUser"),

      }),
    })
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          setProduct(result);
          setMsg("Product Added Sucessfully");
        },
        (error) => {
          console.log(error)
        }
      )
  }

  return (
    <>
    <Navbar/>
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card">
              <div className="card-header fs-3 text-center">Add Product</div>
              {msg && <p className="fs-4 text-center text-success">{msg}</p>}

              <div className="card-body">
                <form onSubmit={(e) => ProductRegsiter(e)}>
                  <div className="mb-3">
                    <label>Enter Product Name</label>
                    <input
                      type="text"
                      name="productName"
                      className="form-control"
                      onChange={(e) => handleChange(e)}
                      value={product.productName}
                    />
                  </div>
                  <div className="mb-3">
                    <label>Enter Price</label>
                    <input
                      type="text"
                      name="price"
                      className="form-control"
                      onChange={(e) => handleChange(e)}
                      value={product.price}
                    />
                  </div>

                  <div className="mb-3">
                    <label>Enter Stock</label>
                    <input
                      type="text"
                      name="stock"
                      className="form-control"
                      onChange={(e) => handleChange(e)}
                      value={product.stock}
                    />
                  </div>
                  <button className="btn btn-primary col-md-12">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;