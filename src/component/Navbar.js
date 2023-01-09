import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { IconButton } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';


const Navbar = () => {

  let navigate = useNavigate();

  const onClick = () => {
    localStorage.clear();
    navigate(0)
}
    return(
        <>
        <nav class="navbar navbar-expand-lg navbar-dark bg-success">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Product Management</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <Link to="/" class="nav-link active" aria-current="page" href="#">Home</Link>
        </li>

        <li class="nav-item">
          <a href="/addProduct" class="nav-link active" aria-current="page">Add Product</a>
        </li>
        <li>
          <div><IconButton onClick={onClick}><LockIcon style={{ color: '#FFFBE9',position:"relative",left:"1050px" }}></LockIcon></IconButton> <a href="/auth" style={{ textDecoration: "none", boxShadow: "none", color: "white" }}></a> </div></li>
        
      </ul>
    </div>
  </div>
</nav>

        </>
    )
}
export default Navbar