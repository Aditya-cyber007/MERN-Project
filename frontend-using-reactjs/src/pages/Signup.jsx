import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../features/Auth";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordVisibility, setPasswordVisibility] = React.useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token=useSelector(state=>state.auth.token)
  const isLogged=()=>{
    if(token){
      navigate('/')
    }
  }

  //post data to server
  const handlePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const postData = async () => {
    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        phone: phone,
        email: email,
        password: password,
      }),
    });
    const data = await res.json();
    console.log(data);
    if (res.ok) {
      console.log("Registration Successful");
      // set the token in local storage using setToken action
      dispatch(setToken(data.token));
      navigate("/");
    } else {
      window.alert("Invalid Registration");
      console.log("Invalid Registration");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postData();
    setUsername("");
    setPhone("");
    setEmail("");
    setPassword("");
  };
  useEffect(() => {
    isLogged()
  }
  , [])

  return (
    <div
      className="card p-4 w-50"
      style={{ marginLeft: "25%", marginTop: "4%" }}
    >
      <div className="card-body">
        <h1 className="text-center mb-5">SignUp</h1>

        <form className="row g-3 needs-validation">
          <div className="col-md-6">
            <label htmlFor="validationCustom01" className="form-label">
              User Name
            </label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              id="validationCustom01"
              required
            />
            <div className="valid-feedback">Looks good!</div>
          </div>

          <div className="col-md-4">
            <label htmlFor="validationCustomUsername" className="form-label">
              Phone Number
            </label>
            <div className="input-group has-validation">
              <input
                type="number"
                className="form-control"
                id="validationCustomUsername01"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                aria-describedby="inputGroupPrepend"
                required
              />
              <div className="invalid-feedback">Please choose a username.</div>
            </div>
          </div>
          <div className="col-md-6">
            <label htmlFor="validationCustomUsername" className="form-label">
              Email
            </label>
            <div className="input-group has-validation">
              <input
                type="text"
                className="form-control"
                id="validationCustomUsername02"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                aria-describedby="inputGroupPrepend"
                required
              />
              <span className="input-group-text" id="inputGroupPrepend">
                @
              </span>
              <div className="invalid-feedback">Please choose a username.</div>
            </div>
          </div>
          <div className="col-md-6">
            <label htmlFor="validationCustomUsername" className="form-label">
              Password
            </label>
            <div className="input-group has-validation">
              <input
                type={passwordVisibility ? "text" : "password"}
                className="form-control"
                id="validationCustomUsername03"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                aria-describedby="inputGroupPrepend"
                required
              />
              <span
                className="input-group-text"
                id="inputGroupPrepend"
                onClick={handlePasswordVisibility}
              >
                {passwordVisibility ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-eye-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-eye-slash-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588M5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
                    <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z" />
                  </svg>
                )}
              </span>
              <div className="invalid-feedback">Please choose a password.</div>
            </div>
          </div>
          <div className="col-12"></div>
          <div className="col-12">
            <button
              className="btn btn-primary"
              onClick={handleSubmit}
              type="submit"
            >
              Submit form
            </button>
            <NavLink to="/login" className="nav-link mt-3">
              Already have an account?
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
