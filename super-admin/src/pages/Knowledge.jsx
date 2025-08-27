import React from "react";
import { ManagerTopbar } from "../components/ManagerTopbar";
import { ManagerSidebar } from "../components/ManagerSidebar";
import { useNavigate } from "react-router-dom";

const Knowledge = () => {
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

          <section id="dashboard-ecommerce">
            <div className="row" id="table-hover-animation">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">KB Information</h4>

                    <div class="ag-btns d-flex flex-wrap">
                      <div class="btn-export">
                        <div class="modal-size-lg d-inline-block">
                          {/* <!-- Button trigger modal --> */}
                          <button
                            type="button"
                            class="btn btn-primary"
                            data-toggle="modal"
                            data-target="#large"
                          >
                            Add kB's
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <section id="complex-header-datatable">
                    <div class="row">
                      <div class="col-12">
                        <div class="card">
                          <div class="card-datatable">
                            <table class="dt-complex-header table table-bordered table-responsive">
                              <thead>
                                <tr>
                                  <th>#</th>
                                  <th>Title</th>

                                  <th class="cell-fit">Action</th>
                                </tr>

                                <tr>
                                  <td>1</td>
                                  <td>Internship Tests (Mendatory)</td>
                                  <td class="cell-fit">
                                    <div className="d-flex ">
                                      <button
                                        class="btn btn-info mr-1"
                                        style={{
                                          padding: "5px 15px",
                                        }}
                                      >
                                        <i data-feather="eye"></i>
                                      </button>
                                      <button
                                        class="btn btn-secondary mr-1"
                                        style={{
                                          padding: "5px 15px",
                                        }}
                                      >
                                        <i data-feather="edit"></i>
                                      </button>

                                      <button
                                        class="btn btn-danger"
                                        style={{
                                          padding: "5px 15px",
                                        }}
                                      >
                                        <i data-feather="x-circle"></i>
                                      </button>
                                    </div>
                                  </td>
                                </tr>

                                <tr>
                                  <td>2</td>
                                  <td>Internship Aggrement</td>
                                  <td class="cell-fit">
                                    <div className="d-flex ">
                                      <button
                                        class="btn btn-info mr-1"
                                        style={{
                                          padding: "5px 15px",
                                        }}
                                      >
                                        <i data-feather="eye"></i>
                                      </button>
                                      <button
                                        class="btn btn-secondary mr-1"
                                        style={{
                                          padding: "5px 15px",
                                        }}
                                      >
                                        <i data-feather="edit"></i>
                                      </button>

                                      <button
                                        class="btn btn-danger"
                                        style={{
                                          padding: "5px 15px",
                                        }}
                                      >
                                        <i data-feather="x-circle"></i>
                                      </button>
                                    </div>
                                  </td>
                                </tr>

                                <tr>
                                  <td>3</td>
                                  <td>Code of Conduct For Interns</td>
                                  <td class="cell-fit">
                                    <div className="d-flex ">
                                      <button
                                        class="btn btn-info mr-1"
                                        style={{
                                          padding: "5px 15px",
                                        }}
                                      >
                                        <i data-feather="eye"></i>
                                      </button>
                                      <button
                                        class="btn btn-secondary mr-1"
                                        style={{
                                          padding: "5px 15px",
                                        }}
                                      >
                                        <i data-feather="edit"></i>
                                      </button>

                                      <button
                                        class="btn btn-danger"
                                        style={{
                                          padding: "5px 15px",
                                        }}
                                      >
                                        <i data-feather="x-circle"></i>
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>4</td>
                                  <td>Project Subbmission Criteria</td>
                                  <td class="cell-fit">
                                    <div className="d-flex ">
                                      <button
                                        class="btn btn-info mr-1"
                                        style={{
                                          padding: "5px 15px",
                                        }}
                                      >
                                        <i data-feather="eye"></i>
                                      </button>
                                      <button
                                        class="btn btn-secondary mr-1"
                                        style={{
                                          padding: "5px 15px",
                                        }}
                                      >
                                        <i data-feather="edit"></i>
                                      </button>

                                      <button
                                        class="btn btn-danger"
                                        style={{
                                          padding: "5px 15px",
                                        }}
                                      >
                                        <i data-feather="x-circle"></i>
                                      </button>
                                    </div>
                                  </td>
                                </tr>

                                <tr>
                                  <td>5</td>
                                  <td>Policies of Eziline For Interns</td>
                                  <td class="cell-fit">
                                    <div className="d-flex ">
                                      <button
                                        class="btn btn-info mr-1"
                                        style={{
                                          padding: "5px 15px",
                                        }}
                                      >
                                        <i data-feather="eye"></i>
                                      </button>
                                      <button
                                        class="btn btn-secondary mr-1"
                                        style={{
                                          padding: "5px 15px",
                                        }}
                                      >
                                        <i data-feather="edit"></i>
                                      </button>

                                      <button
                                        class="btn btn-danger"
                                        style={{
                                          padding: "5px 15px",
                                        }}
                                      >
                                        <i data-feather="x-circle"></i>
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              </thead>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </section>

          <div
            class="modal fade text-left"
            id="large"
            tabindex="-1"
            role="dialog"
            aria-labelledby="myModalLabel17"
            aria-hidden="true"
          >
            <div
              class="modal-dialog modal-dialog-centered modal-lg"
              role="document"
            >
              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title" id="myModalLabel17">
                    Add knowledge Base
                  </h4>
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <div class="card-body">
                    <div class="row">
                      <div class=" col-lg-12 col-md-12 col-12">
                        <div class="card-body">
                          <form class="form form-horizontal">
                            <div class="row ">
                              {/* <div class="form-group">
                                                <label for="defaultInput">Default</label>
                                                <input id="defaultInput" class="form-control" type="text" placeholder="Normal Input" />
                                            </div> */}
                              <div class="col-12">
                                <div class="form-group row">
                                  <div class="col-sm-3 col-form-label">
                                    <label for="email-id">Title</label>
                                  </div>
                                  <div class="col-sm-9">
                                    <input
                                      type="email"
                                      id="email-id"
                                      class="form-control"
                                      name="email-id"
                                      placeholder="Title"
                                    />
                                  </div>
                                </div>
                              </div>

                              <div class="col-12">
                                <div class="form-group row">
                                  <div class="col-sm-3 col-form-label">
                                    <label for="email-id">Image</label>
                                  </div>
                                  <div class="col-lg-9 col-md-12">
                                    <div class="form-group">
                                      <div class="custom-file">
                                        <input
                                          type="file"
                                          class="custom-file-input"
                                          id="customFile"
                                        />
                                        <label
                                          class="custom-file-label"
                                          for="customFile"
                                        >
                                          Choose file
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div class="col-12">
                                <div class="form-group row">
                                  <div class="col-sm-3 col-form-label">
                                    <label for="email-id">Description</label>
                                  </div>
                                  <div class="col-lg-9 col-md-12">
                                    <div class="form-group">
                                      <div class="custom-file">
                                        <textarea
                                          class="form-control"
                                          id="exampleFormControlTextarea1"
                                          rows="3"
                                          placeholder="Textarea"
                                        ></textarea>
                                      </div>
                                    </div>
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
                    class="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    close
                  </button>
                  <button
                    type="button"
                    class="btn btn-success"
                    data-dismiss="modal"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Knowledge;
