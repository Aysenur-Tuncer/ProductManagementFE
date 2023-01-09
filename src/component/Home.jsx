import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FilterProduct from "./FilterProduct/FilterProduct";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { textAlign } from "@mui/system";


function Home() {

    const [productList, setProductList] = useState([]);
    const [msg, setMsg] = useState("");
    let [filterTextValue, updateFilterText] = useState('all');
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    let filteredProductList = productList.filter((product) => {
        if (filterTextValue === 'available') {
            return product.stock > 0;
        } else if (filterTextValue === 'unavailable') {
            return product.stock == 0;
        } else {
            return product;
        }
    })



    const getProduct = () => {
        fetch("/api/product/userProduct/" + localStorage.getItem("currentUser"), {
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
                    setProductList(result);
                },
                (error) => {
                    console.log(error)
                    localStorage.clear();
                    navigate(0)
                }
            )

    }

    useEffect(() => {
        getProduct();
    }, []);



    const deleteProduct = (productId) => {
        fetch("/api/product/deleteProduct/" + productId, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' + localStorage.getItem("token"),
            },
        })
            .then((res) => {
                setMsg("Delete Sucessfully");
                navigate(0);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    console.log(localStorage)



    function onFilterValueSelected(filterValue) {
        updateFilterText(filterValue);

    }

    return (
        <>

            <Navbar></Navbar>


                {productList.length!=0 ?
                <div className="container mt-3">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">

                                <div className="card-header fs-3 text-center">
                                    All Product List
                                    {msg && <p className="fs-4 text-center text-success">{msg}</p>}
                                </div>
                                <div className="card-body">
                                    <FilterProduct filterValueSelected={onFilterValueSelected}></FilterProduct>
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        className="search"
                                        onChange={(e) => setQuery(e.target.value)}
                                    />
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">Product Id</th>
                                                <th scope="col">Product Name</th>
                                                <th scope="col">Price</th>
                                                <th scope="col">Stock</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredProductList.filter(product => product.productName.toLowerCase().includes(query)).map((p) => (
                                                <tr>
                                                    <td>{p.productId}</td>
                                                    <td>{p.productName}</td>
                                                    <td>{p.price+"₺"}</td>
                                                    <td>{p.stock}</td>
                                                    <td>
                                                        <Link to={'editProduct/' + p.productId} className="btn btn-sm btn-primary">Edit</Link>
                                                        <button className="btn btn-sm btn-danger ms-1" onClick={() => deleteProduct(p.productId)}>Delete</button>
                                                    </td>
                                                </tr>
                                            ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className="card-header fs-2 text-center">
                    You haven't added any products yet...
                </div>
                }

            

        </>

    )
}

export default Home