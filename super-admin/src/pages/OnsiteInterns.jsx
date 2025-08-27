import React, { useEffect, useState } from "react";
import { ManagerTopbar } from "../components/ManagerTopbar";
import { ManagerSidebar } from "../components/ManagerSidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export const OnsiteInterns = () => {

  const navigate = useNavigate();
  const check = sessionStorage.getItem("isLoggedIn");

  if (!check) {
    navigate("/");
  }

  const [data, setData] = useState([]);
  const [singleIntern, setSingleIntern] = useState([]);

  const GetOnsiteInterns = async () => {
    try {
      const res = await axios.get("https://testserver.ezitech.org/get-manager-onsite");
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetOnsiteInterns();
  });

  const [currentPage, settCurrentPage] = useState(1);
  const recordPerPage = 15;
  const lastIndex = currentPage * recordPerPage;
  const firstIndex = lastIndex - recordPerPage;
  const records = data.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(data.length / recordPerPage);
  const numbers = [...Array(nPage + 1).keys()].slice(1);

  function prevPage() {
    if (currentPage !== firstIndex) {
      settCurrentPage(currentPage - 1);
    }
  }

  function changeCurrentPage(id) {
    settCurrentPage(id);
  }

  function nextPage() {
    if (currentPage !== nPage) {
      settCurrentPage(currentPage + 1);
    }
  }

  const GetSingleIntern = async (id) => {
    try {
      const res = await axios.post("https://testserver.ezitech.org/single-onsite", {
        id,
      });
      setSingleIntern(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ManagerTopbar />
      <ManagerSidebar />
      <div className="app-content content ">
        <div className="content-overlay"></div>
        <div className="header-navbar-shadow"></div>
        <div className="content-wrapper">
          <div className="content-header row"></div>
          <div className="content-body">
            <section id="dashboard-ecommerce">
              {/* <!-- Statistics Card --> */}
              <div className="col-12">
                <div className="card card-statistics">
                  <div className="card-header">
                    <h4 className="card-title">Oniste Interns Statistics</h4>
                    <div className="d-flex align-items-center">
                      <p className="card-text font-small-2 mr-25 mb-0">
                        Updated 1 month ago
                      </p>
                    </div>
                  </div>
                  <div className="card-body statistics-body">
                    <div className="row">
                      <div className="col-xl-3 col-sm-6 col-12 mb-2 mb-xl-0">
                        <div className="media">
                          <div className="avatar bg-light-primary mr-2">
                            <div className="avatar-content">
                              <i
                                data-feather="users"
                                className="avatar-icon"
                              ></i>
                            </div>
                          </div>
                          <div className="media-body my-auto">
                            <h4 className="font-weight-bolder mb-0">230k</h4>
                            <p className="card-text font-small-3 mb-0">
                              Interns
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-3 col-sm-6 col-12 mb-2 mb-xl-0">
                        <div className="media">
                          <div className="avatar bg-light-info mr-2">
                            <div className="avatar-content">
                              <i
                                data-feather="clipboard"
                                className="avatar-icon"
                              ></i>
                            </div>
                          </div>
                          <div className="media-body my-auto">
                            <h4 className="font-weight-bolder mb-0">8.549k</h4>
                            <p className="card-text font-small-3 mb-0">Test</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-3 col-sm-6 col-12 mb-2 mb-sm-0">
                        <div className="media">
                          <div className="avatar bg-light-danger mr-2">
                            <div className="avatar-content">
                              <i
                                data-feather="loader"
                                className="avatar-icon"
                              ></i>
                            </div>
                          </div>
                          <div className="media-body my-auto">
                            <h4 className="font-weight-bolder mb-0">1.423k</h4>
                            <p className="card-text font-small-3 mb-0">
                              Progress
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-3 col-sm-6 col-12">
                        <div className="media">
                          <div className="avatar bg-light-success mr-2">
                            <div className="avatar-content">
                              <i
                                data-feather="check-square"
                                className="avatar-icon"
                              ></i>
                            </div>
                          </div>
                          <div className="media-body my-auto">
                            <h4 className="font-weight-bolder mb-0">$9745</h4>
                            <p className="card-text font-small-3 mb-0">
                              Completed
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!--/ Statistics Card --> */}

              {/* <!-- Table Hover Animation start --> */}
              <div className="row" id="table-hover-animation">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                      <h4 className="card-title">Onsite Interns</h4>
                      {/* <!-- Button trigger modal --> */}
                      <button
                        type="button"
                        className="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop"
                      >
                        Add Intern
                      </button>
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
                                    <th>Full Name</th>
                                    <th>Email</th>
                                    <th>Contact</th>
                                    <th class="cell-fit">Technology</th>
                                    <th>Interview</th>
                                    <th>Status</th>
                                    <th>Action</th>

                                  </tr>

                                  <tr>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th class="cell-fit"></th>
                                    <th></th>
                                    <th></th>
                                    <th>

                                      <div class="dropdown">
                                        <button
                                          type="button"
                                          class="btn btn-warning dropdown-toggle hide-arrow"
                                          data-toggle="dropdown"
                                        >
                                          Action
                                        </button>
                                        <div class="dropdown-menu">
                                          <a
                                            class="dropdown-item"
                                            href="javascript:void(0);"
                                          >
                                            <i
                                              data-feather="edit"
                                              class="mr-50"
                                            ></i>
                                            <span>Edit</span>
                                          </a>
                                          <a
                                            class="dropdown-item"
                                            href="javascript:void(0);"
                                          >
                                            <i data-feather="check" class="mr-50"></i>
                                            <span>check</span>
                                          </a>

                                          <a
                                            class="dropdown-item"
                                            href="javascript:void(0);"
                                          >
                                            <i data-feather="file-text" class="mr-50"></i>
                                            <span>Print Intern Certificate</span>
                                          </a>

                                          <a
                                            class="dropdown-item"
                                            href="javascript:void(0);"
                                          >
                                            <i data-feather="file" class="mr-50"></i>
                                            <span>Print Course Certificate</span>
                                          </a>

                                  
                                        </div>
                                      </div>
                                    </th>

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
                        Intern Details
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
                    <div className="modal-body">
                      {Array.isArray(singleIntern)
                        ? singleIntern.map((res) => {
                          console.log(res);
                          const {
                            image,
                            name,
                            email,
                            phone,
                            cnic,
                            join_date,
                            birth_date,
                            university,
                            degree,
                            technology,
                            duration,
                            intern_type,
                          } = res;

                          return (
                            <>
                              <div className="row shadow rounded p-3">
                                <div className="col-sm-4"></div>
                                <div className="col-sm-4 text-center">
                                  <img
                                    src={image}
                                    alt=""
                                    width={100}
                                    height={100}
                                    style={{ borderRadius: "50px" }}
                                  />

                                  <h3 className="mt-2">{name}</h3>
                                </div>
                                <div className="col-sm-4"></div>
                              </div>

                              <div className="row mt-1 shadow rounded p-3">
                                <div className="col-sm-6">
                                  <label htmlFor="">Email: </label>
                                  <input
                                    type="text"
                                    name=""
                                    id=""
                                    value={email}
                                    readOnly
                                    className="form-control border-0"
                                  />
                                </div>

                                <div className="col-sm-6">
                                  <label htmlFor="">Phone: </label>
                                  <input
                                    type="text"
                                    name=""
                                    id=""
                                    value={phone}
                                    readOnly
                                    className="form-control border-0"
                                  />
                                </div>
                              </div>

                              {/* <h6 className="mt-5">Gender</h6> */}
                              <div className="row mt-1 shadow rounded p-3">
                                <div className="col-sm-6">
                                  <label htmlFor="">CNIC: </label>
                                  <input
                                    type="text"
                                    name=""
                                    id=""
                                    value={cnic}
                                    readOnly
                                    className="form-control border-0"
                                  />
                                </div>

                                <div className="col-sm-6">
                                  <label htmlFor="">Join Date: </label>
                                  <input
                                    type="text"
                                    name=""
                                    id=""
                                    value={join_date}
                                    readOnly
                                    className="form-control border-0"
                                  />
                                </div>
                              </div>

                              <div className="row mt-1 shadow rounded p-3">
                                <div className="col-sm-6">
                                  <label htmlFor="">Birth Date: </label>
                                  <input
                                    type="text"
                                    name=""
                                    id=""
                                    value={birth_date}
                                    readOnly
                                    className="form-control border-0"
                                  />
                                </div>

                                <div className="col-sm-6">
                                  <label htmlFor="">University: </label>
                                  <input
                                    type="text"
                                    name=""
                                    id=""
                                    value={university}
                                    readOnly
                                    className="form-control border-0"
                                  />
                                </div>
                              </div>

                              <div className="row mt-1 shadow rounded p-3">
                                <div className="col-sm-6">
                                  <label htmlFor="">Degree: </label>
                                  <input
                                    type="text"
                                    name=""
                                    id=""
                                    value={degree}
                                    readOnly
                                    className="form-control border-0"
                                  />
                                </div>

                                <div className="col-sm-6">
                                  <label htmlFor="">Technology: </label>
                                  <input
                                    type="text"
                                    name=""
                                    id=""
                                    value={technology}
                                    readOnly
                                    className="form-control border-0"
                                  />
                                </div>
                              </div>

                              <div className="row mt-1 mb-5 shadow rounded p-3">
                                <div className="col-sm-6">
                                  <label htmlFor="">Duration</label>
                                  <input
                                    type="text"
                                    name=""
                                    id=""
                                    value={duration}
                                    readOnly
                                    className="form-control border-0"
                                  />
                                </div>
                                <div className="col-sm-6">
                                  <label htmlFor="">Internship Type: </label>
                                  <input
                                    type="text"
                                    name=""
                                    id=""
                                    value={intern_type}
                                    readOnly
                                    className="form-control border-0"
                                  />
                                </div>

                                {/* <div className="col-sm-6">
                                    <label htmlFor="">To</label>
                                    <input
                                      type="text"
                                      name=""
                                      id=""
                                      value={to_address}
                                      readOnly
                                      className="form-control border-0"
                                    />
                                  </div> */}
                              </div>
                            </>
                          );
                        })
                        : " "}
                    </div>
                    {/* <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-primary"
                        data-dismiss="modal"
                      >
                        Accept
                      </button>
                    </div> */}
                  </div>
                </div>
              </div>

              {/* <!-- Table head options end --> */}

              {/* <!-- Modal to add new record --> */}
              {/* <div className="modal modal-slide-in fade" id="exampleModal">
                <div className="modal-dialog sidebar-sm">
                  <form className="add-new-record modal-content pt-0">
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      ×
                    </button>
                    <div className="modal-header mb-1">
                      <h5 className="modal-title" id="exampleModalLabel">
                        New Record
                      </h5>
                    </div>
                    <div className="modal-body flex-grow-1">
                      <div className="form-group">
                        <label
                          className="form-label"
                          for="basic-icon-default-fullname"
                        >
                          Full Name
                        </label>
                        <input
                          type="text"
                          className="form-control dt-full-name"
                          id="basic-icon-default-fullname"
                          placeholder="John Doe"
                          aria-label="John Doe"
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label" for="basic-icon-default-post">
                          Post
                        </label>
                        <input
                          type="text"
                          id="basic-icon-default-post"
                          className="form-control dt-post"
                          placeholder="Web Developer"
                          aria-label="Web Developer"
                        />
                      </div>
                      <div className="form-group">
                        <label
                          className="form-label"
                          for="basic-icon-default-email"
                        >
                          Email
                        </label>
                        <input
                          type="text"
                          id="basic-icon-default-email"
                          className="form-control dt-email"
                          placeholder="john.doe@example.com"
                          aria-label="john.doe@example.com"
                        />
                        <small className="form-text text-muted">
                          {" "}
                          You can use letters, numbers & periods{" "}
                        </small>
                      </div>
                      <div className="form-group">
                        <label className="form-label" for="basic-icon-default-date">
                          Joining Date
                        </label>
                        <input
                          type="text"
                          className="form-control dt-date"
                          id="basic-icon-default-date"
                          placeholder="MM/DD/YYYY"
                          aria-label="MM/DD/YYYY"
                        />
                      </div>
                      <div className="form-group mb-4">
                        <label
                          className="form-label"
                          for="basic-icon-default-salary"
                        >
                          Salary
                        </label>
                        <input
                          type="text"
                          id="basic-icon-default-salary"
                          className="form-control dt-salary"
                          placeholder="$12000"
                          aria-label="$12000"
                        />
                      </div>
                      <button
                        type="button"
                        className="btn btn-primary data-submit mr-1"
                      >
                        Submit
                      </button>
                      <button
                        type="reset"
                        className="btn btn-outline-secondary"
                        data-dismiss="modal"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div> */}
            </section>
          </div>
        </div>
      </div>
    </>
  );
};
