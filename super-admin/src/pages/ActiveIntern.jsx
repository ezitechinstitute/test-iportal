import React, { useEffect, useState } from "react";
import { ManagerTopbar } from "../components/ManagerTopbar";
import { ManagerSidebar } from "../components/ManagerSidebar";
import "./Intern.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { EditIntern } from "../components/EditIntern";
import { Pagination } from "../components/Pagination";

import { useLocation } from "react-router-dom";



const ActiveIntern = () => {
  const navigate = useNavigate();
  const check = sessionStorage.getItem("isLoggedIn");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusTerm, setStatusTerm] = useState("");
  // Pagination
  const [currentPage, settCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [dataLimit, setDataLimit] = useState(200);

  const [internData, setInternData] = useState({
    email: null,
    technology: null,
    status: null,
  });

  const [reportData, setReportData] = useState([]);
  const [reportName, setReportName] = useState("");
  const [staticInfo, setStaticInfo] = useState({});
  const [projectSummary, setProjectSummary] = useState({});
  const [leaves, setLeaves] = useState({});
  const [complaints, setComplaints] = useState({});
  const [amount, setAmount] = useState({});

  const location = useLocation();

  useEffect(() => {
  const params = new URLSearchParams(location.search);
  const eti_id = params.get("eti_id");
  const name = params.get("name");
  if (eti_id && name) {
    fetchReport(eti_id, name);
    // Open the modal programmatically
    setTimeout(() => {
      const modal = window.bootstrap
        ? window.bootstrap.Modal.getOrCreateInstance(document.getElementById("reportModal"))
        : null;
      if (modal) modal.show();
      else document.getElementById("reportModal")?.classList.add("show", "d-block");
    }, 300);
  }
}, [location.search]);




  const fetchReport = async (eti_id, name) => {
  try {
    const res = await axios.get(`https://testserver.ezitech.org/get-intern-full-report/${eti_id}`);
    setReportData(res.data.weekly); // weekly breakdown
    setReportName(name);
    setStaticInfo(res.data.info); 
    setProjectSummary(res.data.projects); 
    setLeaves(res.data.leaves); 
    setComplaints(res.data.complaints); 
    setAmount(res.data.amount);
  } catch (err) {
    console.error(err);
  }
};




  if (!check) {
    navigate("/");
  }

  const RemoveInt = async (id) => {
    await axios
      .put(`https://testserver.ezitech.org/rem-int/${id}`)
      .then((res) => {
        alert(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const GetData = async (page) => {
    setLoading(true);
    await axios
      .get("https://testserver.ezitech.org/get-active-intern", { //temporary change to localhost instead of https://testserver.ezitech.org/get-active-intern
        params: {
          page: page,
          limit: dataLimit,
        },
      })
      .then((res) => {
        setData(res.data.data);
        setFilteredData(res.data.data);
        settCurrentPage(res.data.meta.page);
        setTotalPages(res.data.meta.totalPages);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePageChange = (page) => {
    settCurrentPage(page);
  };

  useEffect(() => {
    const filter = data.filter((item) =>
      item.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filter);
  }, [searchTerm, data]);

  useEffect(() => {
    const filter = data.filter((item) =>
      item.status.toLowerCase().includes(statusTerm.toLowerCase())
    );
    setFilteredData(filter);
  }, [statusTerm, data]);

  useEffect(() => {
    GetData(currentPage);
  }, [currentPage]);

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
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header border-bottom">
                    <h2 className="card-title">Active Interns</h2>

                    <div className="ag-btns d-flex flex-wrap">
                      <div>
                        <select
                          name="byStatus"
                          id=""
                          className="form-control"
                          onChange={(e) => setStatusTerm(e.target.value)}
                        >
                          <option selected disabled>
                            --Select--
                          </option>
                          <option value="Interview">Interview</option>
                          <option value="Contact">Contact</option>
                          <option value="Test">Test</option>
                          <option value="Completed">Completed</option>
                          <option value="Active">Active</option>
                          <option value="Removed">Removed</option>
                        </select>
                      </div>
                      <div className="mx-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search..."
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="card-datatable">
                    <table className="dt-complex-header table table-bordered table-responsive text-center ">
                      <thead>
                        <tr>
                          {/* <th>ETI-ID</th> */}
                          <th>#</th>
                          <th>AVATAR</th>
                          <th>NAME</th>
                          <th>EMAIL</th>
                          <th>CITY</th>
                          <th>DURATION</th>
                          <th>JOIN</th>
                          <th>TECH</th>
                          <th>STATUS</th>
                          <th>ALLOW</th>
                          <th>Action</th>
                        </tr>
                      </thead>

                      <tbody>
                        {Array.isArray(filteredData)
                          ? filteredData.map((rs) => {
                              const {
                                id,
                                eti_id,
                                image,
                                name,
                                email,
                                city,
                                duration,
                                join_date,
                                technology,
                                status,
                                intern_type,
                              } = rs;

                              return (
                                <>
                                  <tr>
                                    <td>
                                      <strong>{id}</strong>
                                    </td>
                                    <td>
                                      <img
                                        src={image}
                                        alt="avatar"
                                        width={50}
                                        height={50}
                                      />
                                    </td>
                                    <td>{name}</td>
                                    <td>{email}</td>
                                    <td>{city}</td>
                                    <td>{duration}</td>
                                    <td>{join_date}</td>
                                    <td>{technology}</td>
                                    <td> <span className="badge badge-pill badge-glow badge-success">
                                        {status}
                                      </span></td>
                                    <td>{intern_type}</td>

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
                                                data-target="#default1"
                                                onClick={() =>
                                                  setInternData({
                                                    id: id,
                                                    email: email,
                                                    technology: technology,
                                                    status: status,
                                                  })
                                                }
                                              >
                                                Edit
                                              </a>
                                            </li>
                                            <li>
                                              <a
                                                className="dropdown-item"
                                                href="#"
                                                type="button"
                                                onClick={() => RemoveInt(id)}
                                              >
                                                Remove
                                              </a>
                                            </li>

                                            <li>
                                              <a
                                                className="dropdown-item"
                                                href="#"
                                                data-toggle="modal"
                                                data-target="#reportModal"
                                                onClick={() => fetchReport(eti_id, name)}
                                              >
                                                View Report
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

          {/* Edit Inter */}
          <EditIntern data={internData} />


          {/* Intern Report Modal */}
          <div
            className="modal fade"
            id="reportModal"
            tabIndex="-1"
            aria-labelledby="reportModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-xl modal-dialog-centered">
              {/* modal-content here */}
              <div className="modal-content" style={{ fontSize: '1.3em' }}>
                {/* Modal Header */}
                <div className="modal-header bg-gradient-primary text-white">
                  <div>
                    <h4 className="modal-title mb-0">
                      <i className="ti ti-user-check me-2"></i>
                      Internship Progress Report – <strong>{reportName}</strong>
                    </h4>
                    <small className="text-white-50">Last updated: {new Date().toLocaleString()}</small>
                  </div>
                  <button type="button" className="btn-close btn-close-white" data-dismiss="modal" aria-label="Close">X</button>
                </div>

                {/* Modal Body */}
                <div className="modal-body style={{ fontSize: '20px' }}">
                  <div className="row g-3">
                    {/* Profile Card */}
                    <div className="col-lg-4 col-md-6">
                      <div className="card shadow-sm border-0 h-100">
                        <div className="card-body">
                          <div className="d-flex align-items-center mb-3">
                            <img
                              src={staticInfo.image}
                              alt="avatar"
                              className="rounded-circle border"
                              width={60}
                              height={60}
                              style={{ objectFit: "cover" }}
                            />
                            <div className="ms-3">
                              <h5 className="mb-0">{staticInfo.name}</h5>
                              <span className="badge bg-info">{staticInfo.technology}</span>
                            </div>
                          </div>
                          <ul className="list-unstyled small mb-0">
                            <li><i className="ti ti-mail me-1"></i> <strong>Email:</strong> {staticInfo.email}</li>
                            <li><i className="ti ti-calendar me-1"></i> <strong>Join Date:</strong> {staticInfo.join_date}</li>
                            <li><i className="ti ti-clock me-1"></i> <strong>Duration:</strong> {staticInfo.duration}</li>
                            <li><i className="ti ti-user me-1"></i> <strong>Type:</strong> {staticInfo.intern_type}</li>
                            <li><i className="ti ti-flag me-1"></i> <strong>Country:</strong> {staticInfo.country}</li>
                            <li><i className="ti ti-building me-1"></i> <strong>University:</strong> {staticInfo.university}</li>
                            <li><i className="ti ti-phone me-1"></i> <strong>Contact:</strong> {staticInfo.phone}</li>
                            <li><i className="ti ti-id me-1"></i> <strong>CNIC:</strong> {staticInfo.cnic}</li>
                            <li><i className="ti ti-gender-bigender me-1"></i> <strong>Gender:</strong> {staticInfo.gender}</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Project Summary Card */}
                    <div className="col-lg-4 col-md-6">
                      <div className="card shadow-sm border-0 h-100">
                        <div className="card-body">
                          <h6 className="card-title text-primary mb-3">
                            <i className="ti ti-folder-check me-2"></i>Project Summary
                          </h6>
                          <ul className="list-unstyled small mb-0">
                            <li><strong>Total Projects:</strong> {projectSummary.total_projects}</li>
                            <li><strong>Ongoing:</strong> <span className="badge bg-warning">{projectSummary.ongoing}</span></li>
                            <li><strong>Completed:</strong> <span className="badge bg-success">{projectSummary.completed}</span></li>
                            <li>
                              <strong>Titles:</strong>
                              <div style={{ maxHeight: 60, overflowY: "auto" }}>
                                {projectSummary.project_titles
                                  ? projectSummary.project_titles.split(",").map((title, idx) => (
                                      <div key={idx} className="text-truncate">{title.trim()}</div>
                                    ))
                                  : <span className="text-muted">N/A</span>}
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Other Info Card */}
                    <div className="col-lg-4 col-md-12">
                      <div className="card shadow-sm border-0 h-100">
                        <div className="card-body">
                          <h6 className="card-title text-secondary mb-3">
                            <i className="ti ti-info-circle me-2"></i>Other Info
                          </h6>
                          <ul className="list-unstyled small mb-0">
                            <li><strong>Total Leaves:</strong> <span className="badge bg-info">{leaves.total_leaves}</span></li>
                            <li><strong>Total Complaints:</strong> <span className="badge bg-danger">{complaints.total_complaints}</span></li>
                            <li><strong>Remaining Amount:</strong> <span className="badge bg-dark">{amount.remaining_amount}</span></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Overall Summary */}
                  <div className="card bg-light p-4 my-4 border-0 shadow-sm">
                    <h6 className="text-dark mb-3">
                      <i className="ti ti-chart-bar me-2"></i>Overall Summary
                    </h6>
                    <div className="row">
                      <div className="col-md-3 col-6 mb-2">
                        <strong>Total Weeks Active:</strong>
                        <div>{reportData.length}</div>
                      </div>
                      <div className="col-md-3 col-6 mb-2">
                        <strong>Total Attendance:</strong>
                        <div>{reportData.reduce((acc, row) => acc + row.attendance_days, 0)} day(s)</div>
                      </div>
                      <div className="col-md-3 col-6 mb-2">
                        <strong>Total General Tasks:</strong>
                        <div>{reportData.reduce((acc, row) => acc + row.total_tasks, 0)}</div>
                      </div>
                      <div className="col-md-3 col-6 mb-2">
                        <strong>Total Project Tasks:</strong>
                        <div>{reportData.reduce((acc, row) => acc + row.total_project_tasks, 0)}</div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <p className="mb-1"><strong>General Task Completion Rate:</strong></p>
                      <div className="progress" style={{ height: "20px" }}>
                        <div
                          className="progress-bar bg-success"
                          role="progressbar"
                          style={{
                            width:
                              reportData.length > 0
                                ? `${Math.round(
                                    (reportData.reduce((acc, row) => acc + row.completed_tasks, 0) /
                                      (reportData.reduce((acc, row) => acc + row.total_tasks, 1))) * 100
                                  )}%`
                                : "0%",
                          }}
                        >
                          {Math.round(
                            (reportData.reduce((acc, row) => acc + row.completed_tasks, 0) /
                              (reportData.reduce((acc, row) => acc + row.total_tasks, 1))) * 100
                          )}% Complete
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Weekly Breakdown */}
                  <div className="mb-2">
                    <h6 className="mb-3 text-primary">
                      <i className="ti ti-calendar-stats me-2"></i>Weekly Breakdown
                    </h6>
                    <div className="row g-3">
                      {reportData.length > 0 ? (
                        reportData.map((row, i) => {
                          const weekStart = new Date(row.week_start).toDateString();
                          const weekEnd = new Date(row.week_end).toDateString();
                          const taskProgress = row.total_tasks
                            ? Math.round((row.completed_tasks / row.total_tasks) * 100)
                            : 0;
                          const projectProgress = row.total_project_tasks
                            ? Math.round((row.completed_project_tasks / row.total_project_tasks) * 100)
                            : 0;

                          return (
                            <div key={i} className="col-lg-6">
                              <div className="card border-0 shadow-sm mb-2">
                                <div className="card-body">
                                  <h6 className="text-primary mb-2">
                                    🗓️ Week {i + 1}: <span className="text-dark">{weekStart} to {weekEnd}</span>
                                  </h6>
                                  <div className="row">
                                    <div className="col-4">
                                      <div className="small text-muted">Attendance</div>
                                      <div className="fw-bold">{row.attendance_days} day(s)</div>
                                      {row.attendance_days >= 5 ? (
                                        <span className="badge bg-success">Excellent</span>
                                      ) : row.attendance_days >= 3 ? (
                                        <span className="badge bg-warning">Average</span>
                                      ) : (
                                        <span className="badge bg-danger">Poor</span>
                                      )}
                                    </div>
                                    <div className="col-4">
                                      <div className="small text-muted">General Tasks</div>
                                      <div className="fw-bold">{row.completed_tasks} / {row.total_tasks}</div>
                                      <div className="progress" style={{ height: "8px" }}>
                                        <div
                                          className="progress-bar bg-info"
                                          style={{ width: `${taskProgress}%` }}
                                        ></div>
                                      </div>
                                      <small>{taskProgress}%</small>
                                    </div>
                                    <div className="col-4">
                                      <div className="small text-muted">Project Tasks</div>
                                      <div className="fw-bold">{row.completed_project_tasks} / {row.total_project_tasks}</div>
                                      <div className="progress" style={{ height: "8px" }}>
                                        <div
                                          className="progress-bar bg-warning"
                                          style={{ width: `${projectProgress}%` }}
                                        ></div>
                                      </div>
                                      <small>{projectProgress}%</small>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div className="col-12">
                          <div className="alert alert-warning">No report data available for this intern.</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>









        </div>
      </div>
    </>
  );
};

export default ActiveIntern;
