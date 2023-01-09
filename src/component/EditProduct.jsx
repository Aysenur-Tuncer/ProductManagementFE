import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";

function EditProduct(){
    const [product, setProduct] = useState({
        productName:"",
        price: "",
        stock: "",
    });

    const navigate=useNavigate();

    const { productId } =useParams();
    console.log(productId);

    const [msg, setMsg] = useState("");

    useEffect(() => {
            fetch("/api/product/"+productId ,{
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' + localStorage.getItem("token"),
              },
            })
              .then(res => res.json())
              .then(
                (result) => {
                  console.log(result);
                  setProduct(result);
                },
                (error) => {
                  console.log(error)
                }
              )
    },[]);


    const ProductUpdate = (e) => {
        e.preventDefault();
        updateProduct();

    }

    const updateProduct = () => {
        fetch("/api/product/updateProduct/"+productId,{
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + localStorage.getItem("token"),
          },
          body: JSON.stringify({
            productName: product.productName,
            price: product.price,
            stock: product.stock,
          }),
        })
          .then(res => res.json())
          .then(
            (result) => {
              console.log(result);
              setProduct(result);
              navigate("/")
            },
            (error) => {
              console.log(error)
            }
          )

        }

        const handleChange = (e) => {
            const value = e.target.value;
            setProduct({ ...product, [e.target.name]: value });
        };
      

    return (
        <>
        <Navbar></Navbar>
            <div className="container mt-3">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div className="card">
                            <div className="card-header fs-3 text-center">
                                Edit Product
                            </div>
                            {msg && <p className="fs-4 text-center text-success">{msg}</p>}
                            <div className="card-body">
                                <form onSubmit={(e) => ProductUpdate(e)}>
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
                                    <button className="btn btn-primary col-md-12">Update</button>
                                </form>

                            </div>


                        </div>
                    </div>
                </div>



            </div>
        </>
    )
}

export default EditProduct