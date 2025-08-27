import React, { useEffect, useState } from "react";
import { ManagerTopbar } from "../components/ManagerTopbar";
import { ManagerSidebar } from "../components/ManagerSidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Leave = () => {
  const navigate = useNavigate();
  const check = sessionStorage.getItem("isLoggedIn");
  const [leaves, setLeaves] = useState([]);

  if (!check) {
    navigate("/");
  }

  const GetEmployeesLeaves = async (req, res) => {
    await axios
      .get("https://testserver.ezitech.org/get-employee-leaves")
      .then((res) => {
        setLeaves(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const ApproveLeave = async (id) => {
    await axios
      .put(`https://testserver.ezitech.org/approve-leave/${id}`)
      .then((res) => {
        alert(res.data.msg);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const RejectLeave = async (id) => {
    await axios
      .put(`https://testserver.ezitech.org/reject-leave/${id}`)
      .then((res) => {
        alert(res.data.msg);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    GetEmployeesLeaves();
  }, [GetEmployeesLeaves]);

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
              <div className="row" id="table-hover-animation">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                      <h4 className="card-title">Leaves</h4>

                      <div class="ag-btns d-flex flex-wrap">
                        <input
                          type="text"
                          class="ag-grid-filter form-control w-100 mr-1 mb-1 mb-sm-0"
                          id="filter-text-box"
                          placeholder="Search...."
                        />
                      </div>
                    </div>

                    <section id="complex-header-datatable">
                      <div class="row">
                        <div class="col-12">
                          <div class="card">
                            <div class="card-datatable">
                              <table class="dt-complex-header table table-bordered table-responsive text-center">
                                <thead>
                                  <tr>
                                    <th>ETI_ID</th>
                                    <th>NAME</th>
                                    <th>FROM</th>
                                    <th>TO</th>
                                    <th>REASON</th>
                                    <th>DAYS</th>
                                    <th>STATUS</th>
                                    <th>Action</th>
                                  </tr>
                                </thead>

                                <tbody>
                                  {Array.isArray(leaves)
                                    ? leaves.map((rs) => {
                                        const {
                                          id,
                                          etiid,
                                          name,
                                          fromdate,
                                          todate,
                                          reason,
                                          days,
                                          status,
                                        } = rs;

                                        const fdate = new Date(
                                          fromdate
                                        ).toLocaleDateString("en-PK");
                                        const tdate = new Date(
                                          todate
                                        ).toLocaleDateString("en-PK");

                                        return (
                                          <>
                                            <tr>
                                              <td>
                                                <strong>{etiid}</strong>
                                              </td>
                                              <td>{name}</td>
                                              <td>{fdate}</td>
                                              <td>{tdate}</td>
                                              <td>{reason}</td>
                                              <td>{days}</td>
                                              <td>
                                                {status === null ? (
                                                  <>
                                                    <span className="badge badge-pill badge-glow badge-primary">
                                                      Pending
                                                    </span>
                                                  </>
                                                ) : status === 1 ? (
                                                  <>
                                                    <span className="badge badge-pill badge-glow badge-success">
                                                      Approved
                                                    </span>
                                                  </>
                                                ) : status === 0 ? (
                                                  <>
                                                    <span className="badge badge-pill badge-glow badge-danger">
                                                      Rejected
                                                    </span>
                                                  </>
                                                ) : (
                                                  ""
                                                )}
                                              </td>
                                              <td>
                                                <div className="dropdown">
                                                  <button
                                                    type="button"
                                                    className="btn btn-warning dropdown-toggle"
                                                    data-toggle="dropdown"
                                                  >
                                                    Action
                                                    {/* <i data-feather="more-vertical"></i> */}
                                                  </button>
                                                  <div>
                                                    <ul className="dropdown-menu">
                                                      <li>
                                                        <a
                                                          className="dropdown-item"
                                                          href="#"
                                                          type="button"
                                                          onClick={() =>
                                                            ApproveLeave(id)
                                                          }
                                                        >
                                                          Approve
                                                        </a>
                                                      </li>

                                                      <li>
                                                        <a
                                                          className="dropdown-item"
                                                          href="#"
                                                          type="button"
                                                          onClick={() =>
                                                            RejectLeave(id)
                                                          }
                                                        >
                                                          Reject
                                                        </a>
                                                      </li>
                                                    </ul>
                                                  </div>
                                                </div>
                                              </td>
                                            </tr>
                                          </>
                                        );
                                      })
                                    : ""}
                                </tbody>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Leave;
