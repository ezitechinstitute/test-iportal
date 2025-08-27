import React, { useEffect, useState } from "react";
import { ManagerTopbar } from "../components/ManagerTopbar";
import { ManagerSidebar } from "../components/ManagerSidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CreateUniAcc } from "../components/CreateUniAcc";
import { AddUniversity } from "../components/AddUniversity";
import { EditUni } from "../components/EditUni";

const University = () => {
  const navigate = useNavigate();
  const check = sessionStorage.getItem("isLoggedIn");
  const [data, setData] = useState([]);
  const [uniAcc, setUniAcc] = useState({});
  const [uniData, setUniData] = useState({});

  if (!check) {
    navigate("/");
  }

  useEffect(() => {
    const GetUniData = async () => {
      await axios
        .get("https://testserver.ezitech.org/admin-get-uni")
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    GetUniData();
  });

  const ActiveUni = async (id) => {
    await axios
      .put(`https://testserver.ezitech.org/active-uni/${id}`)
      .then((res) => {
        alert(res.data.msg);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const FreezeUni = async (id) => {
    await axios
      .put(`https://testserver.ezitech.org/freeze-uni/${id}`)
      .then((res) => {
        alert(res.data.msg);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const DeactivateAccount = async (id) => {
    await axios
      .put(`https://testserver.ezitech.org/deactivate-uni-acc/${id}`)
      .then((res) => {
        alert(res.data.msg);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const ActivateAccount = async (id) => {
    await axios
      .put(`https://testserver.ezitech.org/activate-uni-acc/${id}`)
      .then((res) => {
        alert(res.data.msg);
      })
      .catch((err) => {
        console.log(err);
      });
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
          <div className="content-body"></div>

          <section id="dashboard-ecommerce">
            <div className="row" id="table-hover-animation">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">Universities</h4>

                    <div class="ag-btns d-flex flex-wrap">
                      <input
                        type="text"
                        class="ag-grid-filter form-control w-50 mr-1 mb-1 mb-sm-0"
                        id="filter-text-box"
                        placeholder="Search...."
                      />
                      <div class="btn-export">
                        <div class="modal-size-lg d-inline-block">
                          {/* <!-- Button trigger modal --> */}
                          <button
                            type="button"
                            class="btn btn-primary"
                            data-toggle="modal"
                            data-target="#large1"
                          >
                            Add University
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
                                  <th>ETI-ID</th>
                                  <th>NAME</th>
                                  <th>EMAIL</th>
                                  <th>PHONE</th>
                                  <th class="cell-fit">INTERNS</th>
                                  <th>STATUS</th>
                                  <th>ACCOUNT</th>
                                  <th>Action</th>
                                </tr>
                              </thead>

                              <tbody>
                                {data.map((rs) => {
                                  const {
                                    uni_id,
                                    uti,
                                    uni_name,
                                    uni_email,
                                    uni_password,
                                    uni_phone,
                                    uni_status,
                                    account_status,
                                    uniInterns,
                                  } = rs;

                                  return (
                                    <>
                                      <tr>
                                        <td>
                                          <strong>{uti}</strong>
                                        </td>
                                        <td>{uni_name}</td>
                                        <td>{uni_email}</td>
                                        <td>{uni_phone}</td>
                                        <td class="cell-fit">{uniInterns}</td>
                                        <td>
                                          {uni_status !== 0 ? (
                                            <span className="badge badge-pill badge-glow badge-success">
                                              Active
                                            </span>
                                          ) : (
                                            <span className="badge badge-pill badge-glow badge-danger">
                                              Freeze
                                            </span>
                                          )}
                                        </td>
                                        <td>
                                          {account_status !== null ? (
                                            <span className="badge badge-pill badge-glow badge-success">
                                              Activate
                                            </span>
                                          ) : (
                                            <span className="badge badge-pill badge-glow badge-danger">
                                              Deactivate
                                            </span>
                                          )}
                                        </td>
                                        <td>
                                          <div className="btn-group">
                                            <button
                                              className="btn btn-warning dropdown-toggle"
                                              type="button"
                                              id="dropdownMenuButton5"
                                              data-toggle="dropdown"
                                              aria-haspopup="true"
                                              aria-expanded="false"
                                            >
                                              Action
                                            </button>
                                            <div
                                              className="dropdown-menu"
                                              aria-labelledby="dropdownMenuButton5"
                                            >
                                              <a
                                                className="dropdown-item"
                                                href="javascript:void(0);"
                                                type="button"
                                                data-toggle="modal"
                                                data-target="#large2"
                                                onClick={() =>
                                                  setUniData({
                                                    id: uni_id,
                                                    name: uni_name,
                                                    email: uni_email,
                                                    phone: uni_phone,
                                                    password: uni_password,
                                                  })
                                                }
                                              >
                                                Edit
                                              </a>

                                              {uni_status === 1 ? (
                                                <a
                                                  className="dropdown-item"
                                                  href="javascript:void(0);"
                                                  type="button"
                                                  onClick={() =>
                                                    FreezeUni(uni_id)
                                                  }
                                                >
                                                  Freeze
                                                </a>
                                              ) : (
                                                <a
                                                  className="dropdown-item"
                                                  href="javascript:void(0);"
                                                  type="button"
                                                  onClick={() =>
                                                    ActiveUni(uni_id)
                                                  }
                                                >
                                                  Active
                                                </a>
                                              )}

                                              {account_status === 1 ? (
                                                <a
                                                  className="dropdown-item"
                                                  href="javascript:void(0);"
                                                  type="button"
                                                  onClick={() =>
                                                    DeactivateAccount(uni_id)
                                                  }
                                                >
                                                  Deactivate Account
                                                </a>
                                              ) : account_status === 0 ? (
                                                <a
                                                  className="dropdown-item"
                                                  href="javascript:void(0);"
                                                  type="button"
                                                  onClick={() =>
                                                    ActivateAccount(uni_id)
                                                  }
                                                >
                                                  Activate Account
                                                </a>
                                              ) : (
                                                <a
                                                  className="dropdown-item"
                                                  href="javascript:void(0);"
                                                  type="button"
                                                  data-toggle="modal"
                                                  data-target="#large3"
                                                  onClick={() =>
                                                    setUniAcc({
                                                      id: uni_id,
                                                      name: uni_name,
                                                    })
                                                  }
                                                >
                                                  Create Account
                                                </a>
                                              )}
                                            </div>
                                          </div>
                                        </td>
                                      </tr>
                                    </>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                  <AddUniversity />
                  <EditUni values={uniData} />
                  <CreateUniAcc values={uniAcc} />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default University;
