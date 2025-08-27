import React, { useEffect, useState } from "react";
import { ManagerTopbar } from "../components/ManagerTopbar";
import { ManagerSidebar } from "../components/ManagerSidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Technology = () => {
  const navigate = useNavigate();
  const check = sessionStorage.getItem("isLoggedIn");
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState([]);
  const [editedData, setEditedData] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [newTech, setNewTech] = useState({});
  // const [loading, setLoading] = useState(false);

  if (!check) {
    navigate("/");
  }

  const GetTechnologies = async () => {
    try {
      const res = await axios.get("https://testserver.ezitech.org/admin-tech");
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const ActiveTech = async (id) => {
    try {
      const res = await axios.put(`https://testserver.ezitech.org/active-tech/${id}`);
      alert(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const FreezeTech = async (id) => {
    try {
      const res = await axios.put(`https://testserver.ezitech.org/freeze-tech/${id}`);
      alert(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const EditTech = async (id) => {
    try {
      const res = await axios.get(`https://testserver.ezitech.org/edit-tech/${id}`);
      setEditData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditInput = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  const HandleEdit = (index) => {
    setEditedData(editData[index]);
    setIsEdit(true);
  };

  const SubmitEditTech = async () => {
    try {
      const res = await axios.put(
        `https://testserver.ezitech.org/update-tech/${editedData.id}`,
        {
          editedData,
        }
      );
      alert(res.data);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setNewTech({ ...newTech, [name]: value });
  };

  const AddNewTech = async () => {
    try {
      const res = await axios.post("https://testserver.ezitech.org/add-tech", {
        newTech,
      });
      alert(res.data);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetTechnologies();
  }, [GetTechnologies]);

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
                    <h4 className="card-title">Technology</h4>

                    <div class="ag-btns d-flex flex-wrap">
                      <input
                        type="text"
                        class="ag-grid-filter form-control w-50 mr-1 mb-1 mb-sm-0"
                        id="filter-text-box"
                        placeholder="Search...."
                      />
                      <div class="btn-export">
                        <button
                          class="btn btn-primary ag-grid-export-btn"
                          data-toggle="modal"
                          data-target="#large2"
                        >
                          Add Technology
                        </button>
                      </div>
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
                                  <th>#</th>
                                  <th>Technology Name</th>

                                  <th class="cell-fit">Status</th>

                                  <th>Action</th>
                                </tr>
                              </thead>

                              <tbody>
                                {Array.isArray(data)
                                  ? data.map((rs) => (
                                      <tr>
                                        <td>
                                          <strong>{rs.tech_id}</strong>
                                        </td>
                                        <td>{rs.technology}</td>

                                        <td>
                                          {rs.status !== 0 ? (
                                            <>
                                              <button className="btn btn-success">
                                                Active
                                              </button>
                                            </>
                                          ) : (
                                            <>
                                              <button class="btn btn-danger">
                                                Freeze
                                              </button>
                                            </>
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
                                                data-target="#large1"
                                                onClick={() =>
                                                  EditTech(rs.tech_id)
                                                }
                                              >
                                                Edit
                                              </a>

                                              {rs.status === 1 ? (
                                                <a
                                                  className="dropdown-item"
                                                  href="javascript:void(0);"
                                                  type="button"
                                                  onClick={() =>
                                                    FreezeTech(rs.tech_id)
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
                                                    ActiveTech(rs.tech_id)
                                                  }
                                                >
                                                  Active
                                                </a>
                                              )}
                                            </div>
                                          </div>
                                        </td>
                                        {/* <td>12645667</td> */}
                                      </tr>
                                    ))
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

      {/* Add Tech Modal */}

      <div
        className="modal fade text-left"
        id="large2"
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
              <h4 className="modal-title" id="myModalLabel18">
                Add Technology
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
              <form className="form form-horizontal d-flex">
                <div className="row ">
                  <div className="col-12">
                    <div className="form-group row">
                      <div className="col-sm-3 col-form-label">
                        <label for="first-name">Technology</label>
                      </div>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          id="first-name"
                          className="form-control"
                          name="techName"
                          onChange={handleInput}
                          placeholder="Tech Name"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </form>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={AddNewTech}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Tech Modal */}
      <div
        className="modal fade text-left"
        id="large1"
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
              <h4 className="modal-title" id="myModalLabel18">
                Add Manager
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
              {Array.isArray(editData)
                ? editData.map((rs, index) => (
                    <>
                      <div className="card-body">
                        <div className="row">
                          <div className=" col-lg-12 col-md-12 col-12">
                            <div className="card-body" key={index}>
                              {isEdit && editedData.id === rs.id ? (
                                <>
                                  <form className="form form-horizontal d-flex">
                                    <div className="row ">
                                      <div className="col-12">
                                        <div className="form-group row">
                                          <div className="col-sm-3 col-form-label">
                                            <label for="first-name">
                                              Technology
                                            </label>
                                          </div>
                                          <div className="col-sm-9">
                                            <input
                                              type="text"
                                              id="first-name"
                                              className="form-control"
                                              name="technology"
                                              value={editedData.technology}
                                              onChange={handleEditInput}
                                              placeholder="Technology"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </form>

                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-success"
                                      onClick={SubmitEditTech}
                                    >
                                      Submit
                                    </button>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div>
                                    <table
                                      id="datatable-buttons"
                                      className="table table-striped table-bordered dt-responsive nowrap text-center"
                                      style={{
                                        borderCollapse: "collapse",
                                        borderSpacing: "0",
                                        width: "100%",
                                      }}
                                    >
                                      <thead>
                                        <tr>
                                          <th>Technology</th>
                                          <th>Action</th>
                                        </tr>
                                      </thead>

                                      <tbody>
                                        <tr>
                                          <td>
                                            <h4>{rs.technology}</h4>
                                          </td>

                                          <td>
                                            <div class="text-center">
                                              <button
                                                className="btn btn-success"
                                                onClick={() =>
                                                  HandleEdit(index)
                                                }
                                              >
                                                Edit
                                              </button>
                                            </div>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ))
                : " "}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Technology;
