import React, { useEffect, useState } from "react";
import { ManagerTopbar } from "../components/ManagerTopbar";
import { ManagerSidebar } from "../components/ManagerSidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Accounts = () => {
  const navigate = useNavigate();
  const check = sessionStorage.getItem("isLoggedIn");
  const [data, setData] = useState([]);
  const [credit, setCredit] = useState({});
  const [debit, setDebit] = useState({});

  const [transaction, setTransaction] = useState({});
  const [searchDate, setSearchDate] = useState({
    fromDate: "",
    toDate: "",
  });
  // const [toDate, setToDate] = useState("");

  if (!check) {
    navigate("/");
  }

  const handleSearchDate = (e) => {
    const { name, value } = e.target;
    setSearchDate({ ...searchDate, [name]: value });
  };

  console.log(searchDate);

  const GetAccountData = async () => {
    try {
      const res = await axios.get("https://testserver.ezitech.org/all-account-rec", {
        params: {
          searchDate,
        },
      });
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const GetCredit = async () => {
    try {
      const res = await axios.get("https://testserver.ezitech.org/get-credit-total");
      setCredit(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const GetDebit = async () => {
    try {
      const res = await axios.get("https://testserver.ezitech.org/get-debit-total");
      setDebit(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetAccountData();
    GetCredit();
    GetDebit();
  }, [GetAccountData, GetCredit, GetDebit, handleSearchDate]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setTransaction({ ...transaction, [name]: value });
  };

  const Submit = async () => {
    if (
      transaction.tDate !== undefined &&
      transaction.popt !== undefined &&
      transaction.amount !== undefined &&
      transaction.description !== undefined
    ) {
      try {
        const res = await axios.post("https://testserver.ezitech.org/add-balance", {
          transaction,
        });
        alert(res.data.message);
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Please Fill Empty Field First!!!");
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
          <div className="content-body"></div>

          <section id="dashboard-analytics">
            <div className="row match-height">
              <div className="col-lg-4 col-sm-6 col-12">
                <div className="card pb-2">
                  <div className="card-header flex-column align-items-center pb-0">
                    <h2 className="font-weight-bolder mt-1">
                      {credit > 0 ? credit.toLocaleString() : 0}
                    </h2>
                    <b>
                      <p className="card-text">TOTAL CREDIT</p>
                    </b>
                  </div>
                  <div id="gained-chart"></div>
                </div>
              </div>
              {/* <!-- Subscribers Chart Card ends --> */}

              {/* <!-- Subscribers Chart Card starts --> */}
              <div className="col-lg-4 col-sm-6 col-12 ">
                <div className="card pb-2">
                  <div className="card-header flex-column align-items-center pb-0">
                    <h2 className="font-weight-bolder mt-1">
                      {debit > 0 ? debit.toLocaleString() : 0}
                    </h2>
                    <b>
                      <p className="card-text">TOTAL DEBIT</p>
                    </b>
                  </div>
                  <div id="gained-chart"></div>
                </div>
              </div>
              {/* <!-- Subscribers Chart Card ends --> */}

              {/* <!-- Subscribers Chart Card starts --> */}
              <div className="col-lg-4 col-sm-6 col-12">
                <div className="card pb-2">
                  <div className="card-header flex-column align-items-center pb-0">
                    <h2 className="font-weight-bolder mt-1">
                      {credit > 0 && debit > 0
                        ? (credit + debit).toLocaleString()
                        : 0}
                    </h2>
                    <b>
                      <p className="card-text">TOTAL BALANCE</p>
                    </b>
                  </div>
                  <div id="gained-chart"></div>
                </div>
              </div>
              {/* <!-- Subscribers Chart Card ends --> */}
            </div>
          </section>

          <section id="complex-header-datatable">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header border-bottom">
                    <h2 className="card-title">Balance Sheet</h2>

                    <div className="ag-btns d-flex flex-wrap">
                      <div
                        className="btn-export"
                        style={{
                          marginRight: "20px",
                        }}
                      >
                        <div className="">
                          <div className="form-group row">
                            <div className="col-sm-3 col-form-label" id="date">
                              <label for="first-name">FROM</label>
                            </div>
                            <div className="col-sm-9">
                              <input
                                type="date"
                                id="first-name"
                                className="form-control"
                                name="fromDate"
                                placeholder="First Name"
                                onChange={handleSearchDate}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="">
                        <div className="">
                          <div className="form-group row">
                            <div className="col-sm-3 col-form-label" id="date">
                              <label for="first-name">TO</label>
                            </div>
                            <div className="col-sm-9">
                              <input
                                type="date"
                                id="first-name"
                                className="form-control"
                                name="toDate"
                                placeholder="First Name"
                                onChange={handleSearchDate}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="">
                        <div className="">
                          <div className="form-group row">
                            <div className="col-sm-3 col-form-label" id="date">
                              {/* <label for="first-name">TO</label> */}
                            </div>
                            <div className="col-sm-9">
                              <button
                                className="btn btn-primary"
                                data-toggle="modal"
                                data-target="#large"
                              >
                                <small>
                                  <strong>Add Transaction</strong>
                                </small>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="overflow-x-auto table-responsive">
                    <table className="table table-bordered text-center">
                      <thead>
                        <tr>
                          <th>DATE</th>
                          <th>DESCRIPTION</th>
                          <th>CREDIT</th>
                          <th>DEBIT</th>
                          <th>BALANCE</th>
                          <th>Action</th>
                        </tr>
                      </thead>

                      <tbody>
                        {Array.isArray(data)
                          ? data.map((rs) => {
                              const {
                                date,
                                description,
                                credit,
                                debit,
                                balance,
                              } = rs;

                              const d = new Date(date);

                              return (
                                <tr>
                                  <td>{d.toLocaleDateString("en-GB")}</td>
                                  <td>{description}</td>
                                  <td>{credit > 0 ? credit : "-"}</td>
                                  <td>{debit > 0 ? debit : "-"}</td>
                                  <td>{balance}</td>
                                  <td>
                                    <button className="btn btn-warning">
                                      Action
                                    </button>
                                  </td>
                                </tr>
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
                Add Transaction
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
                                <label for="first-name">Date</label>
                              </div>
                              <div className="col-sm-9">
                                <input
                                  type="date"
                                  className="form-control"
                                  name="tDate"
                                  onChange={handleInput}
                                  required
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="form-group row">
                              <div className="col-sm-3 col-form-label">
                                <label for="email-id">Operation</label>
                              </div>
                              <div className="col-sm-9">
                                <select
                                  name="popt"
                                  id=""
                                  className="form-control"
                                  onChange={handleInput}
                                  required
                                >
                                  <option selected disabled>
                                    --Select--
                                  </option>
                                  <option value="credit">Credit</option>
                                  <option value="debit">Debit</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="form-group row">
                              <div className="col-sm-3 col-form-label">
                                <label for="contact-info">Amount</label>
                              </div>
                              <div className="col-sm-9">
                                <input
                                  type="number"
                                  className="form-control"
                                  name="amount"
                                  placeholder="Amount"
                                  onChange={handleInput}
                                  required
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="form-group row">
                              <div className="col-sm-3 col-form-label">
                                <label for="email-id">Description</label>
                              </div>
                              <div className="col-sm-9">
                                <textarea
                                  className="form-control"
                                  name="description"
                                  id=""
                                  placeholder="Description"
                                  onChange={handleInput}
                                  required
                                ></textarea>
                              </div>
                            </div>
                          </div>
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
                onClick={Submit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Accounts;
