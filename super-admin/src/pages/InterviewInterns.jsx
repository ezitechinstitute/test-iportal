import React, { useEffect, useState } from "react";
import { ManagerTopbar } from "../components/ManagerTopbar";
import { ManagerSidebar } from "../components/ManagerSidebar";
import "./Intern.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { EditIntern } from "../components/EditIntern";
import { Pagination } from "../components/Pagination";

const InterviewIntern = () => {
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
      .get("https://testserver.ezitech.org/get-interview-intern", {
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
                    <h2 className="card-title">Interview Interns</h2>

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
                    <table className="dt-complex-header table table-bordered table-responsive text-center">
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
                                    <td>
                                      <span className="badge badge-pill badge-glow badge-info">
                                        {status}
                                      </span>
                                    </td>
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
        </div>
      </div>
    </>
  );
};

export default InterviewIntern;
