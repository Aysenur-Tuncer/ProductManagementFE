import logo from './logo.svg';
import './App.css';
import Navbar from './component/Navbar';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './component/Home';
import AddProduct from './component/AddProduct';
import EditProduct from './component/EditProduct';
import LoginForm from './component/auth/LoginForm';

function App() {
  return (
    <>

    <Routes>
      <Route path='/' element={localStorage.getItem("currentUser") != null ? <Home /> : <LoginForm />} ></Route>
      <Route path='/addProduct' element={localStorage.getItem("currentUser") != null ? <AddProduct /> : <LoginForm />} ></Route>
      <Route path='/editProduct/:productId' element={localStorage.getItem("currentUser") != null ? <EditProduct /> : <LoginForm />} ></Route>
      <Route path="/auth"
            element={localStorage.getItem("currentUser") != null ? <Home/> : <LoginForm />}
          ></Route>
    </Routes>
    
    </>
    

  );
}

export default App;
