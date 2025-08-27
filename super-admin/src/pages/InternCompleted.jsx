import React, { useEffect, useRef, useState } from "react";
import { ManagerTopbar } from "../components/ManagerTopbar";
// import ReactDOM from 'react-dom';
import { ManagerSidebar } from "../components/ManagerSidebar";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
// import { Editor, EditorState } from "draft-js";
// import "draft-js/dist/Draft.css";

export const InternCompleted = () => {

  const navigate = useNavigate();
  const check = sessionStorage.getItem("isLoggedIn");

  if (!check) {
    navigate("/");
  }

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selected, setSelected] = useState(false);
  const [data, setData] = useState([]);
  const [values, setValues] = useState({});

  const handleQuery = async (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.length > 2) {
      fetchSuggestions(value);
    } else {
      setSuggestions([]);
    }
  };

  const fetchSuggestions = async (queryFinal) => {
    try {
      const res = await axios.post("https://testserver.ezitech.org/get-emails", {
        queryFinal,
      });
      //   const data = await res.json();
      setSuggestions(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const selectEmail = (e) => {
    setQuery(e);
    setValues({ ...values, email: e });
    setSelected(true);
  };

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

  const handleInput = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const SubmitProject = (e) => {
    e.preventDefault();

    if (
      values.title !== undefined &&
      values.startDate !== undefined &&
      values.endDate !== undefined &&
      values.supervisor &&
      values.email !== undefined &&
      values.technology !== undefined
    ) {
      axios
        .post("https://testserver.ezitech.org/assign-project", { values })
        .then((res) => {
          if (res.data === 1) {
            alert("Project Assigned Successfuly");
            window.location.reload();
          } else {
            alert("Something Went Wrong!!!");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Please fill empty field first!!!");
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
              <div className="row" id="table-hover-animation">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                      <h4 className="card-title">Test Completed</h4>
                      {/* <!-- Button trigger modal --> */}
                      <button
                        type="button"
                        className="btn btn-primary"
                        data-toggle="modal"
                        data-target="#large"
                      >
                        Assign Project
                      </button>
                    </div>

                    <section id="complex-header-datatable">
                      <div class="row">
                        <div class="col-12">
                          <div class="card">
                            {/* <div class="card-header border-bottom">
                                    <h4 class="card-title">Onsite Interns</h4>
                                </div> */}
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
                                              data-feather="check-square"
                                              class="mr-50"
                                            ></i>
                                            <span>Assign Portal</span>
                                          </a>
                                          <a
                                            class="dropdown-item"
                                            href="javascript:void(0);"
                                          >
                                            <i data-feather="users" class="mr-50"></i>
                                            <span>Onsite</span>
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

              {/* <!-- Modal --> */}
              <div
                className="modal fade text-left"
                id="large"
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
                        Assign Project
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
                      <div className="row">
                        <div className="col-12">
                          <form className="form" onSubmit={SubmitProject}>
                            <div className="row">
                              <div className="col-md-6 col-12">
                                <div className="form-group">
                                  <label for="first-name-column">
                                    Project Title
                                  </label>
                                  <input
                                    onChange={handleInput}
                                    type="text"
                                    id="first-name-column"
                                    className="form-control"
                                    placeholder="Project Title"
                                    name="title"
                                  />
                                </div>
                              </div>
                              <div className="col-md-6 col-12">
                                <div className="form-group">
                                  <label for="last-name-column">
                                    Project URL
                                  </label>
                                  <input
                                    onChange={handleInput}
                                    type="text"
                                    id="last-name-column"
                                    className="form-control"
                                    placeholder="Project URL"
                                    name="url"
                                  />
                                </div>
                              </div>
                              <div className="col-md-6 col-12">
                                <div className="form-group">
                                  <label for="city-column">Start Date</label>
                                  <input
                                    onChange={handleInput}
                                    type="date"
                                    id="city-column"
                                    className="form-control"
                                    // placeholder="City"
                                    name="startDate"
                                  />
                                </div>
                              </div>
                              <div className="col-md-6 col-12">
                                <div className="form-group">
                                  <label for="city-column">End Date</label>
                                  <input
                                    onChange={handleInput}
                                    type="date"
                                    id="city-column"
                                    className="form-control"
                                    // placeholder="City"
                                    name="endDate"
                                  />
                                </div>
                              </div>
                              <div className="col-md-6 col-12">
                                <div className="form-group">
                                  <label for="company-column">Supervisor</label>
                                  <input
                                    onChange={handleInput}
                                    type="text"
                                    id="company-column"
                                    className="form-control"
                                    name="supervisor"
                                    placeholder="Supervisor"
                                  />
                                </div>
                              </div>
                              <div className="col-md-6 col-12">
                                <div className="form-group">
                                  <label for="email-id-column">Email</label>
                                  <input
                                    type="text"
                                    id="email-id-column"
                                    value={query}
                                    onChange={handleQuery}
                                    className="form-control"
                                    name="email"
                                    placeholder="Email"
                                  />

                                  <ul style={{ listStyle: "none" }}>
                                    {!selected
                                      ? suggestions.map((email, index) => (
                                        <li
                                          className="border shadow rounded p-1"
                                          key={index}
                                          onClick={() =>
                                            selectEmail(email.email)
                                          }
                                          style={{ cursor: "pointer" }}
                                        >
                                          {email.email}
                                        </li>
                                      ))
                                      : " "}
                                  </ul>
                                </div>
                              </div>

                              <div className="col-md-6 col-12">
                                <div className="form-group">
                                  <label for="email-id-column">
                                    Technology
                                  </label>
                                  <input
                                    type="text"
                                    id="email-id-column"
                                    onChange={handleInput}
                                    className="form-control"
                                    name="technology"
                                    placeholder="Technology"
                                  />
                                </div>
                              </div>

                              <div className="col-md-6 col-12">
                                <div className="form-group">
                                  <label for="email-id-column">
                                    Description
                                  </label>
                                  <textarea
                                    onChange={handleInput}
                                    name="description"
                                    className="form-control"
                                    id=""
                                    placeholder="Description"
                                  ></textarea>
                                  {/* <div onClick={focusEditor}>
                                <Editor
                                  ref={editor}
                                  editorState={editorState}
                                  onChange={(editorState) =>
                                    setEditorState(editorState)
                                  }
                                /> */}
                                  {/* </div> */}
                                </div>
                              </div>
                              <div className="col-12">
                                <button
                                  type="submit"
                                  className="btn btn-primary mr-1"
                                >
                                  Submit
                                </button>
                                <button
                                  type="reset"
                                  className="btn btn-outline-secondary"
                                >
                                  Reset
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
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

