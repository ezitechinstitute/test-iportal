import axios from "axios";
import React, { useEffect, useState } from "react";

export const ForgotPassword = () => {
  const [data, setData] = useState({});
  const [message, setMessage] = useState({
    msg: "",
    error: "",
    codeValid: null,
    codeInvalid: null,
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const SendCode = async () => {
    await axios
      .post("http://localhost:8800/verify-email", {
        email: data.email,
      })
      .then((res) => {
        setMessage({ msg: res.data.msg });
      })
      .catch((err) => {
        setMessage({ error: err.response.data.msg });
      });
  };

  useEffect(() => {
    const VerifyCode = async () => {
      await axios
        .post("http://localhost:8800/verify-code", { data })
        .then((res) => {
          setMessage({ codeValid: res.data.isVerify });
        })
        .catch((err) => {
          setMessage({ codeInvalid: "Something went wrong!!!" });
        });
    };
    VerifyCode();
  }, [data]);

  const UpdatePassword = async () => {
    await axios
      .post("http://localhost:8800/update-uni-pass", {
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        alert(res.data.msg);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div
        className="modal fade"
        id="exampleModalCenter"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalCenterTitle">
                Forgot Password
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {/* <form class="form form-horizontal"> */}
              <div class="row">
                <div class="col-12">
                  <div class="form-group row">
                    <div class="col-sm-3 col-form-label">
                      <label for="email-id">Email</label>
                    </div>
                    <div class="col-sm-9">
                      <input
                        type="email"
                        id="email"
                        class="form-control"
                        name="email"
                        placeholder="Email"
                        onChange={handleInput}
                      />
                    </div>
                    <div className="col-sm-9 offset-sm-3 mt-1">
                      <button class="btn btn-primary mr-1" onClick={SendCode}>
                        Send Code
                      </button>
                    </div>

                    <div className="col-sm-9 offset-sm-3 mt-1">
                      {message.msg ? (
                        <span style={{ color: "green" }}>{message.msg}</span>
                      ) : message.error ? (
                        <span style={{ color: "red" }}>{message.error}</span>
                      ) : (
                        " "
                      )}
                    </div>
                  </div>
                </div>
                <div class="col-12">
                  <div class="form-group row">
                    <div class="col-sm-3 col-form-label">
                      <label for="contact-info">Verification Code</label>
                    </div>
                    <div class="col-sm-9">
                      <input
                        type="number"
                        id="contact-info"
                        class="form-control"
                        name="code"
                        placeholder="Verification Code"
                        onChange={handleInput}
                      />
                    </div>
                    <div className="col-sm-9 offset-sm-3 mt-1">
                      {message.codeValid ? (
                        <span style={{ color: "green" }}>Verified</span>
                      ) : !message.codeValid ? (
                        <span style={{ color: "red" }}>Unverified!</span>
                      ) : (
                        " "
                      )}

                      {message.codeInvalid !== null ? (
                        <span style={{ color: "red" }}>
                          {message.codeInvalid}
                        </span>
                      ) : (
                        " "
                      )}
                    </div>
                  </div>
                </div>
                <div class="col-12">
                  <div class="form-group row">
                    <div class="col-sm-3 col-form-label">
                      <label for="password">New Password</label>
                    </div>
                    <div class="col-sm-9">
                      <input
                        type="password"
                        id="password"
                        class="form-control"
                        name="password"
                        placeholder="New Password"
                        onChange={handleInput}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* </form> */}
            </div>
            <div className="modal-footer">
              {message.codeValid ? (
                <button
                  type="button"
                  className="btn btn-primary"
                  data-dismiss="modal"
                  onClick={UpdatePassword}
                >
                  Update
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-primary"
                  data-dismiss="modal"
                  disabled
                >
                  Update
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
