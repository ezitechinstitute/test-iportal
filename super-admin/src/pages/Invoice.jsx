import React, { useEffect, useState } from "react";
import { ManagerSidebar } from "../components/ManagerSidebar";
import { ManagerTopbar } from "../components/ManagerTopbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Invoice = () => {
  const navigate = useNavigate();
  const check = sessionStorage.getItem("isLoggedIn");

  if (!check) {
    navigate("/");
  }

  const [data, setData] = useState([]);
  const currentMonth = new Date().getMonth() + 1;
  const [month, setMonth] = useState(currentMonth);
  const monthList = [1, 2, 3, , 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const [total, setTotal] = useState(0);
  const [received, setReceived] = useState(0);
  const [remaining, setRemaining] = useState(0);

  console.log(month);

  const GetInvoices = async () => {
    try {
      const res = await axios.get(
        `https://testserver.ezitech.org/get-invoices/${month}`
      );
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const GetTotal = async () => {
    try {
      const res = await axios.get("https://testserver.ezitech.org/get-total-amount");
      setTotal(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const GetReceived = async () => {
    try {
      const res = await axios.get(
        "https://testserver.ezitech.org/get-received-amount"
      );
      setReceived(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const GetRemaining = async () => {
    try {
      const res = await axios.get(
        "https://testserver.ezitech.org/get-remaining-amount"
      );
      setRemaining(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetInvoices();
    GetTotal();
    GetReceived();
    GetRemaining();
  }, [GetInvoices, GetTotal, GetReceived, GetRemaining]);

  const ApproveInvoice = async (email, received) => {
    try {
      const res = await axios.put(
        `https://testserver.ezitech.org/approve-invoice/${email}`,
        { paidAmount: received }
      );
      if (res.data === 1) {
        alert("Invoice Approved Successfully");
      } else {
        alert("Something Went Wrong!!!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const DeleteInvoice = async (id) => {
    await axios
      .delete(`https://testserver.ezitech.org/delete-invoice/${id}`)
      .then((res) => {
        alert(res.data.message);
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

          {/* <!-- Subscribers Chart Card starts --> */}
          <section id="dashboard-analytics">
            <div className="row match-height">
              <div className="col-lg-4 col-sm-6 col-12">
                <div className="card pb-2">
                  <div className="card-header flex-column align-items-center pb-0">
                    <h2 className="font-weight-bolder mt-1">
                      {total > 0 ? total.toLocaleString() : 0}
                    </h2>
                    <b>
                      <p className="card-text">TOTAL AMOUNT</p>
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
                      {received > 0 ? received.toLocaleString() : 0}
                    </h2>
                    <b>
                      <p className="card-text">RECEIVED AMOUNT</p>
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
                      {remaining > 0 ? remaining.toLocaleString() : 0}
                    </h2>
                    <b>
                      <p className="card-text">REMAINING AMOUNT</p>
                    </b>
                  </div>
                  <div id="gained-chart"></div>
                </div>
              </div>
              {/* <!-- Subscribers Chart Card ends --> */}
            </div>
          </section>

          <div className="col-12 col-xl-12 col-md-12">
            <div className="card card-statistics">
              <div className="card-header">
                <h1
                  className="card-title"
                  style={{
                    lineHeight: "20px",
                    marginLeft: "-15px",
                  }}
                >
                  Invoice
                </h1>
                <div className="d-flex align-items-center">
                  <select
                    className="form-control"
                    name="month"
                    id=""
                    onChange={(e) => setMonth(e.target.value)}
                  >
                    <option value={currentMonth} selected disabled>
                      {" "}
                      Current Month {currentMonth}
                    </option>
                    {Array.isArray(monthList)
                      ? monthList.map((rs) => <option value={rs}>{rs}</option>)
                      : ""}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="card-datatable">
            <table className="dt-complex-header table table-bordered text-center">
              <thead>
                <tr>
                  <th>Invoice Id</th>
                  <th>Name</th>
                  <th>Contact</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Received</th>
                  <th>Approved</th>
                  <th>Delete</th>
                </tr>
              </thead>

              <tbody>
                {Array.isArray(data)
                  ? data.map((rs) => (
                      <>
                        <tr>
                          <td>
                            {" "}
                            <b>{rs.inv_id}</b>
                          </td>
                          <td>{rs.name}</td>
                          <td>{rs.contact}</td>
                          <td>{rs.created_at.slice(0, 10)}</td>
                          <td>{rs.total_amount}</td>
                          <td>{rs.received_amount}</td>
                          <td>
                            {rs.status !== 1 ? (
                              <button
                                className="btn btn-warning"
                                onClick={() =>
                                  ApproveInvoice(
                                    rs.intern_email,
                                    rs.received_amount
                                  )
                                }
                              >
                                Approve
                              </button>
                            ) : (
                              <span className="btn btn-success" disabled>
                                Approved
                              </span>
                            )}
                          </td>
                          <td>
                            <button
                              className="btn btn-danger"
                              onClick={() => DeleteInvoice(rs.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      </>
                    ))
                  : ""}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Invoice;
