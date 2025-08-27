import React, { useEffect, useState } from "react";
import { ManagerSidebar } from "../components/ManagerSidebar";
import { ManagerTopbar } from "../components/ManagerTopbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { EditInternAccount } from "../components/EditInternAccount";

export const InternAccounts = () => {
  const navigate = useNavigate();
  const check = sessionStorage.getItem("isLoggedIn");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [internData, setInternData] = useState({
    email: null,
    technology: null,
    status: null,
  });

  if (!check) {
    navigate("/");
  }

  const GetData = async () => {
    setLoading(true);
    await axios
      .get("https://testserver.ezitech.org/intern-accounts")
      .then((res) => {
        setData(res.data);
        setFilteredData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const filter = data.filter((item) =>
      item.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filter);
  }, [searchTerm, data]);

  useEffect(() => {
    GetData();
  }, [data]);

  //   const DeleteAccount = async (id) => {
  //     await axios
  //       .delete(`http://localhost:8800/del-int-account/${id}`)
  //       .then((res) => {
  //         alert(res.data.message);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   };

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

          <section id="complex-header-datatable">
            <div class="row">
              <div class="col-12">
                <div class="card">
                  <div class="card-header border-bottom">
                    <h2 class="card-title">Intern Accounts</h2>

                    <div class="ag-btns d-flex flex-wrap">
                      <div
                        class="btn-export"
                        style={{
                          marginRight: "20px",
                        }}
                      >
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search..."
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div class="card-datatable">
                    <table class="dt-complex-header table table-bordered table-responsive text-center">
                      <thead>
                        <tr>
                          {/* <th>ETI-ID</th> */}
                          <th>ETI-ID</th>
                          <th>NAME</th>
                          <th>EMAIL</th>
                          <th>PASSWORD</th>
                          <th>TECH</th>
                          <th>STATUS</th>
                          <th>Action</th>
                        </tr>
                      </thead>

                      <tbody>
                        {Array.isArray(filteredData)
                          ? filteredData.map((rs) => {
                              const {
                                int_id,
                                eti_id,
                                name,
                                email,
                                int_technology,
                                int_status,
                              } = rs;

                              return (
                                <>
                                  <tr>
                                    <td>
                                      <strong>{eti_id}</strong>
                                    </td>
                                    <td>{name}</td>
                                    <td>{email}</td>
                                    <td>**********</td>
                                    <td>{int_technology}</td>
                                    <td>
                                      {int_status === "Active" ? (
                                        <>
                                          <span className="badge badge-pill badge-glow badge-success">
                                            {int_status}
                                          </span>
                                        </>
                                      ) : int_status === "Freeze" ? (
                                        <>
                                          <span className="badge badge-pill badge-glow badge-danger">
                                            {int_status}
                                          </span>
                                        </>
                                      ) : int_status === "Test" ? (
                                        <>
                                          <span className="badge badge-pill badge-glow badge-info">
                                            {int_status}
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
                                        </button>
                                        <div>
                                          <ul className="dropdown-menu">
                                            <li>
                                              <a
                                                className="dropdown-item"
                                                href="#"
                                                type="button"
                                                data-toggle="modal"
                                                data-target="#defaultAccount"
                                                onClick={() =>
                                                  setInternData({
                                                    id: int_id,
                                                    email: email,
                                                    technology: int_technology,
                                                    status: int_status,
                                                  })
                                                }
                                              >
                                                Edit
                                              </a>
                                            </li>
                                            {/* <li>
                                              <a
                                                className="dropdown-item"
                                                href="#"
                                                type="button"
                                                onClick={() =>
                                                  DeleteAccount(int_id)
                                                }
                                              >
                                                Delete
                                              </a>
                                            </li> */}
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

          {/* Edit Inter */}
          <EditInternAccount data={internData} />
        </div>
      </div>
    </>
  );
};
