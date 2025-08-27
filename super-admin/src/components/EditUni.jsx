import axios from "axios";
import React, { useEffect, useState } from "react";

export const EditUni = ({ values }) => {
  const [edit, setEdit] = useState({});
  const [allow, setAllow] = useState(false);

  useEffect(() => {
    if (values) {
      setEdit(values);
    }
  }, [values]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEdit((prev) => ({ ...prev, [name]: value }));
  };

  const UpdateSubmit = async () => {
    await axios
      .put(`https://testserver.ezitech.org/update-uni/${values.id}`, { edit })
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
        className="modal fade text-left"
        id="large2"
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
                Edit University
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
                      <form className="form form-horizontal">
                        {/* <div className="row "> */}
                        <div className="col-12">
                          <div className="form-group row">
                            <div className="col-sm-3 col-form-label">
                              <label for="email-id">Name</label>
                            </div>
                            <div className="col-sm-9">
                              <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={edit.name}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-group row">
                            <div className="col-sm-3 col-form-label">
                              <label for="contact-info">Email</label>
                            </div>
                            <div className="col-sm-9">
                              <input
                                type="email"
                                id="contact-info"
                                className="form-control"
                                name="email"
                                value={edit.email}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="col-12">
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
                                value={edit.phone}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="col-12">
                          <div className="form-group row">
                            <div className="col-sm-3 col-form-label">
                              <label for="contact-info">Password</label>
                            </div>
                            {allow ? (
                              <div className="col-sm-9">
                                <input
                                  type="text"
                                  id="contact-info"
                                  className="form-control"
                                  name="newPassword"
                                  placeholder="New Password"
                                  onChange={handleChange}
                                />
                              </div>
                            ) : (
                              <div className="col-sm-3">
                                <button
                                  className="btn btn-primary"
                                  onClick={() => {
                                    setAllow(true);
                                  }}
                                >
                                  Edit Password
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                        {/* </div> */}
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
                onClick={UpdateSubmit}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
