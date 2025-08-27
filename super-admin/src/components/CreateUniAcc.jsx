import axios from "axios";
import React, { useState } from "react";

export const CreateUniAcc = ({ values }) => {
  const [uniData, setUniData] = useState({});

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUniData({ ...uniData, [name]: value });
  };

  const CreateAccount = async () => {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+<>?";
    const length = 8;
    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    const day = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear().toLocaleString();
    const id = Math.floor(1000 + Math.random() * 9000);

    let EZI_ID = "ETI-" + day + "-" + month + "-" + year.slice(3, 5) + "/" + id;

    setUniData({
      ...uniData,
      etiid: EZI_ID,
      password: password,
      name: values.name,
    });

    if (uniData.etiid !== undefined) {
      if (
        uniData.email !== undefined &&
        uniData.phone !== undefined &&
        uniData.password !== undefined
      ) {
        await axios
          .put(`https://testserver.ezitech.org/create-uni-acount/${values.id}`, {
            uniData,
          })
          .then((res) => {
            alert(res.data.msg);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        alert("Please fill empty fields first!!!");
      }
    } else {
      alert("Are you sure? Please click again on Create");
    }
  };
  return (
    <>
      <div
        className="modal fade text-left"
        id="large3"
        tabindex="-1"
        role="dialog"
        aria-labelledby="myModalLabel17"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="myModalLabel17">
                Create {values.name} Account
              </h4>
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
              <div className="card-body">
                <div className="row">
                  <div className=" col-lg-12 col-md-12 col-12">
                    <div className="card-body">
                      <form className="form form-horizontal d-flex">
                        <div className="row ">
                          <div className="col-6">
                            <div className="form-group row">
                              <div className="col-sm-3 col-form-label">
                                <label for="email-id">Email</label>
                              </div>
                              <div className="col-sm-9">
                                <input
                                  type="email"
                                  id="email-id"
                                  className="form-control"
                                  name="email"
                                  placeholder="Email"
                                  onChange={handleInput}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="form-group row">
                              <div className="col-sm-3 col-form-label">
                                <label for="contact-info">Phone</label>
                              </div>
                              <div className="col-sm-9">
                                <input
                                  type="text"
                                  id="contact-info"
                                  className="form-control"
                                  name="phone"
                                  placeholder="Phone"
                                  onChange={handleInput}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              {/* <button type="button" className="btn btn-primary" data-dismiss="modal">Add Field</button> */}
              <button
                type="button"
                className="btn btn-success"
                onClick={CreateAccount}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
