import axios from "axios";
import React, { useState } from "react";

export const AddUniversity = () => {
  const [values, setValues] = useState({});

  const handleInput = (e) => {
    const { name, value } = e.target;

    setValues({ ...values, [name]: value });
  };

  const AddUniversity = async () => {
    if (values.uniName !== undefined) {
      await axios
        .post("https://testserver.ezitech.org/add-uni", { values })
        .then((res) => {
          alert(res.data.msg);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Please fill empty field first!!!");
    }
  };
  return (
    <>
      <div
        className="modal fade text-left"
        id="large1"
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
                Add University
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
                          <div className="col-12">
                            <div className="form-group row">
                              <div className="col-sm-2 col-form-label">
                                <label for="email-id">Name</label>
                              </div>
                              <div className="col-sm-10">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="uniName"
                                  placeholder="Enter University Name"
                                  onChange={handleInput}
                                />
                              </div>
                            </div>
                          </div>
                          {/* <div className="col-6">
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
                          </div> */}
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
                onClick={AddUniversity}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
