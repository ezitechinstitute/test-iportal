import React, { useEffect, useRef, useState } from "react";
import { ManagerTopbar } from "../components/ManagerTopbar";
import { ManagerSidebar } from "../components/ManagerSidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Pagination } from "../components/Pagination";

export const InternProjects = () => {
  const navigate = useNavigate();
  // const [token, setToken] = useState(sessionStorage.getItem("token"));
  const check = sessionStorage.getItem("isLoggedIn");
  // const supid = sessionStorage.getItem("managerid");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loader, setLoader] = useState(false);
  // const supid = 11;

  // Pagination
  const [currentPage, settCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [dataLimit, setDataLimit] = useState(50);

  useEffect(() => {
    if (!check) {
      navigate("/");
    }
  });

  const GetProjects = async (page) => {
    // setLoader(true);
    await axios
      .get("https://testserver.ezitech.org/admin-int-proj", {
        params: {
          page: page,
          limit: dataLimit,
        },
        // headers: { "x-access-token": token },
      })
      .then((res) => {
        setData(res.data);
        setFilteredData(data);
        settCurrentPage(res.data.meta.page);
        setTotalPages(res.data.meta.totalPages);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // https://testserver.ezitech.org

  const MarkasCompleted = async (id) => {
    await axios
      .put(`https://testserver.ezitech.org/mark-project-complete/${id}`)
      .then((res) => {
        alert(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const filter = data.filter((item) =>
      item.pstatus.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredData(filter);
  }, [searchTerm, data]);

  const handlePageChange = (page) => {
    settCurrentPage(page);
  };

  useEffect(() => {
    // console.log(data);
    // setInterval(() => {
    GetProjects(currentPage);
    // }, 2000);
  }, [currentPage, dataLimit]);
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
                    <h4 className="card-title">Projects</h4>

                    <div class="ag-btns d-flex flex-wrap">
                      {/* <input
                        type="text"
                        class="ag-grid-filter form-control w-50 mr-1 mb-1 mb-sm-0 btn1"
                        id="filter-text-box"
                        placeholder="Search...."
                      /> */}
                      <label htmlFor="" style={{ marginTop: "8px" }}>
                        Select Rows
                      </label>
                      &nbsp;
                      <select
                        className="form-control w-25"
                        name=""
                        id=""
                        onChange={(e) => setDataLimit(e.target.value)}
                      >
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                        <option value={200}>200</option>
                        <option value={300}>300</option>
                        <option value={500}>500</option>
                      </select>
                      &nbsp; &nbsp;
                      <label htmlFor="" style={{ marginTop: "8px" }}>
                        Show By Status
                      </label>
                      &nbsp;
                      <select
                        name="pStatus"
                        id=""
                        className="ag-grid-filter form-control w-25"
                        onChange={(e) => setSearchTerm(e.target.value)}
                      >
                        <option selected disabled>
                          All
                        </option>
                        <option value="Ongoing">Ongoing</option>
                        <option value="Expired">Expired</option>
                        <option value="Completed">Completed</option>
                      </select>
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
                                  {/* <th>ETI-ID</th> */}
                                  <th>Name</th>
                                  <th>Title</th>
                                  {/* <th>Technology</th> */}
                                  <th>Start Date</th>
                                  <th>End Date</th>
                                  <th>Duration</th>
                                  <th>Days</th>
                                  <th>POINTS</th>
                                  <th>Status</th>
                                  <th>Tasks</th>
                                  <th>Action</th>
                                </tr>
                              </thead>

                              <tbody>
                                {loader ? (
                                  <>
                                    <h3>Loading...</h3>
                                  </>
                                ) : Array.isArray(filteredData) ? (
                                  filteredData.map((rs) => {
                                    const {
                                      project_id,
                                      eti_id,
                                      name,
                                      title,
                                      int_technology,
                                      start_date,
                                      end_date,
                                      duration,
                                      days,
                                      project_marks,
                                      obt_marks,
                                      pstatus,
                                      taskCount,
                                    } = rs;

                                    return (
                                      <>
                                        <tr>
                                          {/* <td>
                                            <strong>{eti_id}</strong>
                                          </td> */}
                                          <td>{name}</td>
                                          <td>{title}</td>
                                          {/* <td>{int_technology}</td> */}
                                          <td>{start_date}</td>
                                          <td>{end_date}</td>

                                          <td>{duration}</td>
                                          <td>{days}</td>
                                          <td>
                                            {obt_marks} / {project_marks}
                                          </td>

                                          <td>
                                            {pstatus === "Ongoing" ? (
                                              <>
                                                <span className="badge badge-pill badge-glow badge-primary">
                                                  {pstatus}
                                                </span>
                                              </>
                                            ) : pstatus === "Completed" ? (
                                              <>
                                                <span className="badge badge-pill badge-glow badge-success">
                                                  {pstatus}
                                                </span>
                                              </>
                                            ) : pstatus === "Expired" ? (
                                              <>
                                                <span className="badge badge-pill badge-glow badge-danger">
                                                  {pstatus}
                                                </span>
                                              </>
                                            ) : (
                                              ""
                                            )}
                                          </td>
                                          <td>{taskCount}</td>
                                          <td>
                                            <div class="btn-group">
                                              <button
                                                class="btn btn-warning dropdown-toggle"
                                                type="button"
                                                id="dropdownMenuButton5"
                                                data-toggle="dropdown"
                                                aria-haspopup="true"
                                                aria-expanded="false"
                                              >
                                                Action
                                              </button>
                                              <div
                                                class="dropdown-menu"
                                                aria-labelledby="dropdownMenuButton5"
                                              >
                                                <a
                                                  class="dropdown-item"
                                                  href="javascript:void(0);"
                                                >
                                                  Edit
                                                </a>
                                                <a
                                                  class="dropdown-item"
                                                  href="javascript:void(0);"
                                                >
                                                  Freeze
                                                </a>
                                                <a
                                                  class="dropdown-item"
                                                  href="javascript:void(0);"
                                                  type="button"
                                                  onClick={() =>
                                                    MarkasCompleted(project_id)
                                                  }
                                                >
                                                  Mark as Completed
                                                </a>
                                              </div>
                                            </div>
                                          </td>
                                        </tr>
                                      </>
                                    );
                                  })
                                ) : (
                                  ""
                                )}
                              </tbody>
                            </table>
                          </div>
                          <br />
                          {/* Pagination */}
                          <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                          />
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
    </>
  );
};
