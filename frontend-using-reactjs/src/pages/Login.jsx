import React, { useEffect } from "react";
import { useState } from "react";
import { NavLink,  } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { setToken } from "../features/Auth";





const Login = () => {
  const navigate = useNavigate();
  const token = useSelector(state => state.auth.token)
  const isLogged = () => {
    if (token) {
      navigate('/')
    }
  }

  const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [passwordVisibility, setPasswordVisibility] = useState(false);

const handlePasswordVisibility = () => {
  setPasswordVisibility(!passwordVisibility);
};
const dispatch = useDispatch();


const handleLogin = async (e) => {
  e.preventDefault();
  const res = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
  const data = await res.json();
  console.log(data);
  if (res.ok ) {
    console.log("Login Successful");
    dispatch(setToken(data.token));
    navigate("/");
  } else {
    window.alert("Invalid Login");
    console.log("Invalid Login");
  }
}

useEffect(() => {
  isLogged()
}
, [])



  return (
    <>
      <div className="card p-4" style={{ marginLeft: "30%",marginTop:"5%",width:'40%' }}>
        <div className="card-body">
        <h1 className="text-center mb-5">Login</h1>
        <form className="row g-3 needs-validation" autoComplete="off">
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              autoComplete="off"
              
            />
            
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input
              type={passwordVisibility ? "text" : "password"}
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              autoComplete="off"

            />
           
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
              onClick={handlePasswordVisibility}
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Show Password
            </label>
          </div>
          <button type="submit" className="btn btn-primary mt-3" onClick={handleLogin}>
          Submit
          </button>
          <NavLink to="/signup" className="nav-link">
            Don't have an account? Signup
          </NavLink>
          </form>
          </div>
          </div>
          </>
          );
};

export default Login;
