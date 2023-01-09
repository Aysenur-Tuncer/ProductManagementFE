import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from "react-router-dom";
import Auth from './Auth.css'
import { border } from '@mui/system';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = () => {
    
    setError('');

    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!emailRegex.test(email)) {
      setError('Gecerli bir email adresi giriniz.');
      return;
    }

    if (password.length < 8) {
      setError('Sifreniz en az 8 karakter olmalidir.');
      return;
    }

    fetch("/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if(result.statusCodeValue==400){
          setIsRegister(false)
          setError("User already registered")
        }else{
        setIsRegister(true)
        setEmail("")
        setPassword("")}
      })
      .catch((err) => console.log(err))


  }

  const handleSignIn = () => {
    setIsRegister(false);
    setError('');

    fetch("/auth/login", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          
      },
      body: JSON.stringify({
          email: email,
          password: password,
      }),
  })
      .then((res) => res.json())
      .then((result) => {
       
          localStorage.setItem("token", result.token);
          localStorage.setItem("email", email);
          localStorage.setItem("currentUser", result.id);
          localStorage.setItem("message", result.message);
          console.log(localStorage)
          navigate(0)
      })

      .catch((err) => console.log(err))

  }


  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setIsRegister(false);
  };


  return (
    <div className="form-container">
    <form className='form'>
      <Snackbar open={isRegister} autoHideDuration={1500} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                Registration Successful!
                </Alert>
      </Snackbar>
      {error && <div className="error">{error}</div>}
      <br></br>
      <label className='label'> 
        Email:
        <input 
        type="email" 
        value={email} 
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Email adresinizi giriniz"
        className='form-control'
        
        />
      </label>
      <br />
      <label>
        Password:
        <input
        type="password" 
        value={password} 
        onChange={(event) => setPassword(event.target.value)}
        placeholder="Şifrenizi giriniz"
        className='form-control'
        />
      </label>

      <br />
      <button type="button" onClick={handleSignUp} className="buton btn btn-primary">Kaydol</button>
      <button type="button" onClick={handleSignIn} className="buton btn btn-primary">Giriş Yap</button>
    </form>
    </div>
  );
}

export default LoginForm;