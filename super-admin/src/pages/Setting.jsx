import React from "react";
import { ManagerTopbar } from "../components/ManagerTopbar";
import { ManagerSidebar } from "../components/ManagerSidebar";
import { useNavigate } from "react-router-dom";

const Setting = () => {
  const navigate = useNavigate();
  const check = sessionStorage.getItem("isLoggedIn");

  if (!check) {
    navigate("/");
  }
  return (
    <>
      <ManagerTopbar />
      <ManagerSidebar />
      <div className="app-content content ">
        <div className="content-overlay"></div>
        <div className="header-navbar-shadow"></div>
        <div className="content-wrapper">
          <div className="content-header row"></div>
          <div className="content-body"></div>

          {/* <div class="modal fade text-left" id="large" tabindex="-1" role="dialog" aria-labelledby="myModalLabel17" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
              <div class="modal-content"> */}
          <div class="card">
            <div class="modal-header">
              <h4 class="modal-title" id="myModalLabel17">
                Settings
              </h4>
            </div>
            <div class="modal-body">
              <div class="card-body">
                <div class="row">
                  <div class=" col-lg-12 col-md-12 col-12">
                    <div class="card-body">
                      <form class="form form-horizontal d-flex">
                        <div class="row ">
                          <div class="col-6">
                            <div class="form-group row">
                              <div class="col-sm-3 col-form-label">
                                <label for="first-name">Name</label>
                              </div>
                              <div class="col-sm-9">
                                <input
                                  type="text"
                                  id="first-name"
                                  class="form-control"
                                  name="fname"
                                  placeholder="First Name"
                                />
                              </div>
                            </div>
                          </div>
                          <div class="col-6">
                            <div class="form-group row">
                              <div class="col-sm-3 col-form-label">
                                <label for="email-id">Email</label>
                              </div>
                              <div class="col-sm-9">
                                <input
                                  type="email"
                                  id="email-id"
                                  class="form-control"
                                  name="email-id"
                                  placeholder="Email"
                                />
                              </div>
                            </div>
                          </div>
                          <div class="col-6">
                            <div class="form-group row">
                              <div class="col-sm-3 col-form-label">
                                <label for="email-id">Token</label>
                              </div>
                              <div class="col-sm-9">
                                <input
                                  type="email"
                                  id="token"
                                  class="form-control"
                                  name="token"
                                  placeholder="token"
                                />
                              </div>
                            </div>
                          </div>
                          <div class="col-6">
                            <div class="form-group row">
                              <div class="col-sm-3 col-form-label">
                                <label for="email-id">Instance ID</label>
                              </div>
                              <div class="col-sm-9">
                                <input
                                  type="id"
                                  id="email-id"
                                  class="form-control"
                                  name="id"
                                  placeholder="id"
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

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-primary"
                data-dismiss="modal"
              >
                Save Changing
              </button>
              {/* <button type="button" class="btn btn-primary" data-dismiss="modal">submit</button> */}
            </div>
          </div>
        </div>
        {/* </div>
</div>
</div> */}
      </div>
    </>
  );
};

export default Setting;
