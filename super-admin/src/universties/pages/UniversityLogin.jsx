import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ForgotPassword } from "../components/ForgotPassword";

export const UniversityLogin = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState({});

  const handleInput = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };
  // https://testserver.ezitech.org
  const Login = () => {
    if (value.email !== undefined && value.password !== undefined) {
      axios.post("https://testserver.ezitech.org/uni-auth", { value }).then((res) => {
        if (res.data.isLoggedIn === true) {
          sessionStorage.setItem("uni_id", res.data.uni[0].uti);
          sessionStorage.setItem("uni_name", res.data.uni[0].uni_name);
          sessionStorage.setItem("uni_email", res.data.uni[0].uni_email);
          sessionStorage.setItem("token", res.data.token);

          sessionStorage.setItem("isLoggedIn", true);
          alert("Login Successfully");
          navigate("/university-dashboard");
        } else {
          alert("Invalid User!!!"); 
        }
      });
    } else {
      alert("Please empty fields first!!!");
    }
  };

  return (
    <>
      <div className="auth-wrapper auth-v2">
        <div className="auth-inner row m-0">
          {/* <!-- Brand logo--> */}
          <a className="brand-logo" href="javascript:void(0);">
            {/* <div className="brand-logo"> */}
            <img src="./images/logo.png" alt="" width={150} />
            {/* </div> */}
          </a>
          {/* <!-- /Brand logo--> */}
          {/* <!-- Left Text--> */}
          <div className="d-none d-lg-flex col-lg-8 align-items-center p-5">
            <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
              <img
                className="img-fluid"
                src="../../../app-assets/images/pages/login-v2.svg"
                alt="Login V2"
              />
            </div>
          </div>
          {/* <!-- /Left Text--> */}
          {/* <!-- Login--> */}
          <div className="d-flex col-lg-4 align-items-center auth-bg px-2 p-lg-5">
            <div className="col-12 col-sm-8 col-md-6 col-lg-12 px-xl-2 mx-auto">
              <h4 className="card-title mb-1">
                Welcome to Ezitech IPORTAL! 👋
              </h4>
              <p className="card-text mb-2">
                Please sign-in to your account and start the adventure
              </p>
              {/* <form className="auth-login-form mt-2" onSubmit={Login}> */}
              <div className="form-group">
                <label className="form-label" for="login-email">
                  Email
                </label>
                <input
                  className="form-control"
                  id="login-email"
                  type="text"
                  name="email"
                  onChange={handleInput}
                  placeholder="ezitech@example.com"
                  aria-describedby="login-email"
                  autofocus=""
                  tabindex="1"
                  required
                />
              </div>
              <div className="form-group">
                <div className="d-flex justify-content-between">
                  <label for="login-password">Password</label>
                  <a
                    href=""
                    data-toggle="modal"
                    data-target="#exampleModalCenter"
                  >
                    <small>Forgot Password?</small>
                  </a>
                </div>
                <div className="input-group input-group-merge form-password-toggle">
                  <input
                    className="form-control form-control-merge"
                    id="login-password"
                    type="password"
                    name="password"
                    onChange={handleInput}
                    placeholder="············"
                    aria-describedby="login-password"
                    tabindex="2"
                    required
                  />
                  <div className="input-group-append">
                    <span className="input-group-text cursor-pointer">
                      <i data-feather="eye"></i>
                    </span>
                  </div>
                </div>
              </div>
              {/* <div className="form-group">
                <label className="form-label" for="login-email">
                  Login As
                </label>
                <select
                  name="loginAs"
                  className="form-control"
                  id=""
                  onChange={handleInput}
                >
                  <option selected disabled>
                    {" "}
                    --Select--{" "}
                  </option>
                  <option value="Manager">Manager</option>
                  <option value="Instructor">Instructor</option>
                </select>
              </div> */}
              <div className="form-group">
                <div className="custom-control custom-checkbox">
                  <input
                    className="custom-control-input"
                    id="remember-me"
                    type="checkbox"
                    tabindex="3"
                  />
                  <label className="custom-control-label" for="remember-me">
                    {" "}
                    Remember Me
                  </label>
                </div>
              </div>
              <button
                className="btn btn-primary btn-block"
                tabindex="4"
                onClick={Login}
              >
                Login
              </button>
              {/* </form> */}

              <div className="divider my-2">
                <div className="divider-text">or</div>
              </div>
              <div className="auth-footer-btn d-flex justify-content-center">
                <a className="btn btn-facebook" href="javascript:void(0)">
                  <i data-feather="facebook"></i>
                </a>
                <a className="btn btn-twitter white" href="javascript:void(0)">
                  <i data-feather="twitter"></i>
                </a>
                <a className="btn btn-google" href="javascript:void(0)">
                  <i data-feather="mail"></i>
                </a>
                <a className="btn btn-github" href="javascript:void(0)">
                  <i data-feather="github"></i>
                </a>
              </div>
            </div>
          </div>
          {/* <!-- /Login--> */}
        </div>
      </div>

      {/* <!-- Modal --> */}
      <ForgotPassword />
      {/* </div>
          </div>
        </div> */}
      {/* <!-- END: Content--> */}
    </>
  );
};
