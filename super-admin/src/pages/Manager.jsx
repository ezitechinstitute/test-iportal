import React, { useEffect, useState } from "react";
import { ManagerTopbar } from "../components/ManagerTopbar";
import { ManagerSidebar } from "../components/ManagerSidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Manager = () => {
  const navigate = useNavigate();
  const check = sessionStorage.getItem("isLoggedIn");

  if (!check) {
    navigate("/");
  }

  const [data, setData] = useState([]);
  const [editdata, setEditData] = useState([]);
  const [editeddata, setEditedData] = useState({});
  const [isDataEdit, setIsDataEdit] = useState(false);
  const [manager, setManager] = useState({});

  const [managerPermissions, setManagerPermissions] = useState([]);

  const [newPermission, setNewPermission] = useState([]); //Technologies

  const [permissions, setPermissions] = useState({}); // Selected

  const [manager_id, setManagerId] = useState(0);

  const handleEditInput = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editeddata, [name]: value });
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setManager({ ...manager, [name]: value });
  };

  const CreateManagr = async () => {
    const id = Math.floor(100 + Math.random() * 900);
    const eti_Id = "ETI-MANAGER-" + id;

    setManager({ ...manager, etiId: eti_Id });

    if (
      manager.name !== undefined &&
      manager.email !== undefined &&
      manager.password !== undefined &&
      manager.phone !== undefined &&
      manager.joinDate !== undefined &&
      manager.role !== undefined
    ) {
      if (manager.etiId !== undefined) {
        try {
          const res = await axios.post("https://testserver.ezitech.org/add-manager", {
            manager,
          });
          console.log(res.data);
          alert(res.data);
        } catch (error) {
          console.log(error);
        }
      } else {
        alert("Are you sure? Click Submit");
      }
    } else {
      alert("Please fill empty fields first!!!");
    }
  };

  const GetManagers = async () => {
    try {
      const res = await axios.get("https://testserver.ezitech.org/get-managers");
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const GetPermissions = async (id) => {
    setManagerId(id);
    try {
      const res = await axios.get(
        `https://testserver.ezitech.org/get-manager-permissions/${id}`
      );
      setManagerPermissions(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const GetNewPermissions = async () => {
    try {
      const res = await fetch(
        "https://testserver.ezitech.org/get-manager-new-permissions"
      );
      const data = await res.json();
      setNewPermission(data);

      const initialPermissions = [];
      data.forEach((tech) => {
        initialPermissions[tech.tech_id] = {
          selected: false,
          Remote: false,
          Onsite: false,
        };
      });
      setPermissions(initialPermissions);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTechSelect = (techId, checked) => {
    setPermissions((prevSelectedPermissions) => ({
      ...prevSelectedPermissions,
      [techId]: {
        ...prevSelectedPermissions[techId],
        selected: checked,
      },
    }));
  };

  const handleOptionChange = (techId, option, checked) => {
    setPermissions((prevSelectedPermissions) => ({
      ...prevSelectedPermissions,
      [techId]: {
        ...prevSelectedPermissions[techId],
        [option]: checked,
      },
    }));
  };

  const SubmitPermissions = async () => {
    // alert(manageId);

    // collect all techs with options
    const selectedData = Object.keys(permissions)
      .filter((techId) => permissions[techId].selected)
      .flatMap((techId) => {
        const tech = permissions[techId];
        const allowPermission = [];

        if (tech.Remote) {
          allowPermission.push({ tech_id: techId, interview_type: "Remote" });
        }

        if (tech.Onsite) {
          allowPermission.push({ tech_id: techId, interview_type: "Onsite" });
        }

        return allowPermission;
      })
      .map((p) => ({
        ...p,
        managerId: manager_id,
      }));

    try {
      const res = await axios.post(
        "https://testserver.ezitech.org/assign-permissions",
        {
          selectedData,
        }
      );
      alert(res.data.msg);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const RemovePermission = async (id) => {
    try {
      const res = await axios.delete(
        `https://testserver.ezitech.org/remove-manager-permission/${id}`
      );
      alert(res.data);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  // const View = () => {
  //   console.log(SubmitPermissions());
  // };

  const FreezeManager = async (email) => {
    try {
      const res = await axios.put(
        `https://testserver.ezitech.org/freeze-manager/${email}`
      );
      if (res.data === 1) {
        alert("Manager Freezed Successfuly");
      } else {
        alert("Something Went Wrong!!!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const ActiveManager = async (email) => {
    try {
      const res = await axios.put(
        `https://testserver.ezitech.org/active-manager/${email}`
      );
      if (res.data === 1) {
        alert("Manager Activated Successfuly");
      } else {
        alert("Something Went Wrong!!!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const EditManager = async (id) => {
    try {
      const res = await axios.get(
        `https://testserver.ezitech.org/get-single-manager/${id}`
      );
      setEditData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const HandleEdit = (index) => {
    setEditedData(editdata[index]); // Set the data to be edited
    setIsDataEdit(true);
  };

  const SubmitEdit = async () => {
    try {
      const res = await axios.put(
        `https://testserver.ezitech.org/${editeddata.manager_id}`,
        editeddata
      );
      if (res.data === 1) {
        GetManagers();
        setIsDataEdit(false);
        alert("Manager Updated Successfully");
      } else {
        alert("Something Went Wrong!!!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetNewPermissions();
  }, []);

  useEffect(() => {
    GetManagers();
  }, [GetManagers]);

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
                    <h4 className="card-title">Managers</h4>

                    <div className="ag-btns d-flex flex-wrap">
                      {/* <input
                        type="text"
                        className="ag-grid-filter form-control w-50 mr-1 mb-1 mb-sm-0"
                        id="filter-text-box"
                        placeholder="Search...."
                      /> */}
                      <div className="btn-export">
                        <div className="modal-size-lg d-inline-block">
                          {/* <!-- Button trigger modal --> */}
                          <button
                            type="button"
                            className="btn btn-primary"
                            data-toggle="modal"
                            data-target="#large"
                          >
                            Add Manager
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <section id="complex-header-datatable">
                    <div className="row">
                      <div className="col-12">
                        <div className="card">
                          <div className="card-datatable">
                            <table className="dt-complex-header table table-bordered table-responsive text-center">
                              <thead>
                                <tr>
                                  <th>ETI-ID</th>
                                  <th>Avatar</th>
                                  <th>Name</th>
                                  <th>Phone</th>
                                  <th className="cell-fit">Join Date</th>

                                  <th>Comission</th>
                                  <th>Status</th>
                                  <th>Action</th>
                                </tr>
                              </thead>

                              <tbody>
                                {Array.isArray(data)
                                  ? data.map((rs, index) => {
                                      const {
                                        manager_id,
                                        eti_id,
                                        image,
                                        name,
                                        email,
                                        contact,
                                        join_date,
                                        password,
                                        comission,
                                        status,
                                      } = rs;

                                      return (
                                        <>
                                          <tr>
                                            <td>
                                              <strong>{eti_id}</strong>
                                            </td>
                                            <td>
                                              <img
                                                className="border rounded"
                                                src={image}
                                                alt="avatar"
                                                width={50}
                                                height={50}
                                              />
                                            </td>
                                            <td>{name}</td>
                                            <td>{contact}</td>
                                            <td className="cell-fit">
                                              {join_date}
                                            </td>
                                            <td>Rs: {comission}</td>

                                            <td>
                                              {status === 1 ? (
                                                <button className="btn btn-success">
                                                  Active
                                                </button>
                                              ) : (
                                                <button className="btn btn-danger">
                                                  Freeze
                                                </button>
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
                                                      EditManager(manager_id)
                                                    }
                                                  >
                                                    Edit
                                                  </a>

                                                  <a
                                                    className="dropdown-item"
                                                    href="javascript:void(0);"
                                                    type="button"
                                                    data-toggle="modal"
                                                    data-target="#largePermissions"
                                                    onClick={() =>
                                                      GetPermissions(manager_id)
                                                    }
                                                  >
                                                    Permissions
                                                  </a>

                                                  {status === 1 ? (
                                                    <a
                                                      className="dropdown-item"
                                                      href="javascript:void(0);"
                                                      type="button"
                                                      onClick={() =>
                                                        FreezeManager(email)
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
                                                        ActiveManager(email)
                                                      }
                                                    >
                                                      Active
                                                    </a>
                                                  )}
                                                </div>
                                              </div>
                                            </td>
                                          </tr>
                                        </>
                                      );
                                    })
                                  : " "}
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
                  <div className="card-body">
                    <div className="row">
                      <div className=" col-lg-12 col-md-12 col-12">
                        <div className="card-body">
                          <form className="form form-horizontal d-flex">
                            <div className="row ">
                              <div className="col-6">
                                <div className="form-group row">
                                  <div className="col-sm-3 col-form-label">
                                    <label for="first-name">Name</label>
                                  </div>
                                  <div className="col-sm-9">
                                    <input
                                      type="text"
                                      id="first-name"
                                      className="form-control"
                                      name="name"
                                      placeholder="Name"
                                      onChange={handleInput}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col-6">
                                <div className="form-group row">
                                  <div className="col-sm-3 col-form-label">
                                    <label for="email-id">Email</label>
                                  </div>
                                  <div className="col-sm-9">
                                    <input
                                      type="email"
                                      id="email-id"
                                      className="form-control"
                                      name="email"
                                      placeholder="Email"
                                      onChange={handleInput}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col-6">
                                <div className="form-group row">
                                  <div className="col-sm-3 col-form-label">
                                    <label for="contact-info">Password</label>
                                  </div>
                                  <div className="col-sm-9">
                                    <input
                                      type="password"
                                      id="contact-info"
                                      className="form-control"
                                      name="password"
                                      placeholder="Password"
                                      onChange={handleInput}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col-6">
                                <div className="form-group row">
                                  <div className="col-sm-3 col-form-label">
                                    <label for="email-id">Phone</label>
                                  </div>
                                  <div className="col-sm-9">
                                    <input
                                      type="text"
                                      id="phone"
                                      className="form-control"
                                      name="phone"
                                      placeholder="Phone"
                                      onChange={handleInput}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col-6">
                                <div className="form-group row">
                                  <div
                                    className="col-sm-3 col-form-label"
                                    id="date"
                                  >
                                    <label for="first-name">Join Date</label>
                                  </div>
                                  <div className="col-sm-9">
                                    <input
                                      type="date"
                                      className="form-control"
                                      name="joinDate"
                                      placeholder="Join Date"
                                      onChange={handleInput}
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="col-6">
                                <div className="form-group row">
                                  <div
                                    className="col-sm-3 col-form-label"
                                    id="date"
                                  >
                                    <label for="first-name">Role</label>
                                  </div>
                                  <div className="col-sm-9">
                                    <select
                                      className="form-control"
                                      // id="basicSelect"
                                      name="role"
                                      onChange={handleInput}
                                    >
                                      <option disabled selected>
                                        --Select--
                                      </option>
                                      <option value={"Manager"}>Manager</option>
                                    </select>
                                  </div>
                                </div>
                              </div>

                              {/* <div className="col-6">
                                <div className="form-group row">
                                  <div
                                    className="col-sm-3 col-form-label"
                                    id="date"
                                  >
                                    <label for="first-name">Technology</label>
                                  </div>
                                  <div className="col-sm-9">
                                    <div className="form-group ">
                                      <select
                                        className="form-control"
                                        id="basicSelect"
                                      >
                                        <option>MERN Stack</option>
                                        <option>Blade Runner</option>
                                        <option>Thor Ragnarok</option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                              </div> */}
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-success"
                    // data-dismiss="modal"
                    onClick={CreateManagr}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Permissions */}

          <div
            className="modal fade text-left"
            id="largePermissions"
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
                  {/* <button onClick={View}>View</button> */}
                  <h4 className="modal-title" id="myModalLabel17">
                    Manager Permissions
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
                  <div className="card-body">
                    <div className="row">
                      <div className=" col-lg-12 col-md-12 col-12">
                        <div className="card-body">
                          <h4>Allowed Permissions</h4>
                          {/* <form className="form"> */}
                          <table class="table table-bordered">
                            <thead>
                              <tr>
                                <th>Technologies</th>
                                <th>Interview Type</th>
                                <th>Action</th>
                              </tr>
                            </thead>

                            <tbody>
                              {managerPermissions.map((rs) => (
                                <tr>
                                  <td>
                                    <input
                                      type="checkbox"
                                      name=""
                                      id=""
                                      value={rs.tech_id}
                                      checked
                                    />{" "}
                                    &nbsp; {rs.technology}
                                  </td>
                                  <td>
                                    <input
                                      type="checkbox"
                                      name=""
                                      id=""
                                      checked
                                    />{" "}
                                    &nbsp; {rs.interview_type}
                                  </td>

                                  <td>
                                    <button
                                      className="btn btn-danger"
                                      onClick={() =>
                                        RemovePermission(rs.manager_p_id)
                                      }
                                    >
                                      Remove
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>

                          <h4>New Permissions</h4>

                          <table className="table">
                            {/* <thead>
                                <tr>
                                  <th>Technology</th>
                                  <th>Interview Type</th>
                                </tr>
                              </thead> */}
                            <tbody>
                              {newPermission.map((tech) => (
                                <>
                                  <tr key={tech.tech_id}>
                                    <td>
                                      <label>
                                        <input
                                          type="checkbox"
                                          checked={
                                            permissions[tech.tech_id]
                                              ?.selected || false
                                          }
                                          onChange={(e) =>
                                            handleTechSelect(
                                              tech.tech_id,
                                              e.target.checked
                                            )
                                          }
                                        />{" "}
                                        {tech.technology}
                                      </label>
                                    </td>
                                    {permissions[tech.tech_id]?.selected && (
                                      // <div>
                                      <>
                                        <td>
                                          <label>
                                            <input
                                              type="checkbox"
                                              checked={
                                                permissions[tech.tech_id]
                                                  ?.Remote || false
                                              }
                                              onChange={(e) =>
                                                handleOptionChange(
                                                  tech.tech_id,
                                                  "Remote",
                                                  e.target.checked
                                                )
                                              }
                                            />{" "}
                                            Remote
                                          </label>
                                        </td>

                                        <td>
                                          <label>
                                            <input
                                              type="checkbox"
                                              checked={
                                                permissions[tech.tech_id]
                                                  ?.Onsite || false
                                              }
                                              onChange={(e) =>
                                                handleOptionChange(
                                                  tech.tech_id,
                                                  "Onsite",
                                                  e.target.checked
                                                )
                                              }
                                            />{" "}
                                            Onsite
                                          </label>
                                        </td>
                                      </>

                                      // </div>
                                    )}
                                  </tr>
                                </>
                              ))}
                            </tbody>
                          </table>
                          {/* </form> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-success"
                    // data-dismiss="modal"
                    onClick={SubmitPermissions}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>

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
                  {Array.isArray(editdata)
                    ? editdata.map((rs, index) => (
                        <>
                          <div className="card-body">
                            <div className="row">
                              <div className=" col-lg-12 col-md-12 col-12">
                                <div className="card-body" key={index}>
                                  {isDataEdit && editeddata.id === rs.id ? (
                                    <>
                                      <form className="form form-horizontal d-flex">
                                        <div className="row ">
                                          <div className="col-6">
                                            <div className="form-group row">
                                              <div className="col-sm-3 col-form-label">
                                                <label for="first-name">
                                                  Name
                                                </label>
                                              </div>
                                              <div className="col-sm-9">
                                                <input
                                                  type="text"
                                                  id="first-name"
                                                  className="form-control"
                                                  name="name"
                                                  value={editeddata.name}
                                                  onChange={handleEditInput}
                                                  placeholder="Name"
                                                />
                                              </div>
                                            </div>
                                          </div>
                                          <div className="col-6">
                                            <div className="form-group row">
                                              <div className="col-sm-3 col-form-label">
                                                <label for="email-id">
                                                  Email
                                                </label>
                                              </div>
                                              <div className="col-sm-9">
                                                <input
                                                  type="email"
                                                  id="email-id"
                                                  className="form-control"
                                                  name="email"
                                                  value={editeddata.email}
                                                  onChange={handleEditInput}
                                                  placeholder="Email"
                                                />
                                              </div>
                                            </div>
                                          </div>
                                          <div className="col-6">
                                            <div className="form-group row">
                                              <div className="col-sm-3 col-form-label">
                                                <label for="contact-info">
                                                  Password
                                                </label>
                                              </div>
                                              <div className="col-sm-9">
                                                <input
                                                  type="password"
                                                  id="contact-info"
                                                  className="form-control"
                                                  name="password"
                                                  onChange={handleEditInput}
                                                  placeholder="Password"
                                                />
                                              </div>
                                            </div>
                                          </div>
                                          <div className="col-6">
                                            <div className="form-group row">
                                              <div className="col-sm-3 col-form-label">
                                                <label for="email-id">
                                                  Phone
                                                </label>
                                              </div>
                                              <div className="col-sm-9">
                                                <input
                                                  type="text"
                                                  id="phone"
                                                  className="form-control"
                                                  name="phone"
                                                  onChange={handleEditInput}
                                                  value={editeddata.contact}
                                                  placeholder="Phone"
                                                />
                                              </div>
                                            </div>
                                          </div>
                                          <div className="col-6">
                                            <div className="form-group row">
                                              <div
                                                className="col-sm-3 col-form-label"
                                                id="date"
                                              >
                                                <label for="first-name">
                                                  Comission
                                                </label>
                                              </div>
                                              <div className="col-sm-9">
                                                <input
                                                  type="text"
                                                  id="first-name"
                                                  className="form-control"
                                                  name="comission"
                                                  value={editeddata.comission}
                                                  onChange={handleEditInput}
                                                  placeholder="Comission"
                                                />
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </form>
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
                                              <th>Email</th>
                                              <th>Action</th>
                                            </tr>
                                          </thead>

                                          <tbody>
                                            <tr>
                                              <td>
                                                <h4>{rs.email}</h4>
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

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={SubmitEdit}
                  >
                    Submit
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

export default Manager;
