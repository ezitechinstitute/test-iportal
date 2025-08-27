import React from "react";
import { ManagerTopbar } from "../components/ManagerTopbar";
import { ManagerSidebar } from "../components/ManagerSidebar";
import "./Withdraw.css";
import { Link, useNavigate } from "react-router-dom";

const Withdraw = () => {
  const navigate = useNavigate();
  const check = sessionStorage.getItem("isLoggedIn");

  if (!check) {
    navigate("/");
  }
  
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
                    <h4 class="card-title">Withdrawal Requests</h4>

                    {/* <button class="btn btn-primary btn1" >Completed</button> */}
                    <Link to="/completed-Withdraw">
                      <div class="vertical-modal-ex">
                        <button
                          type="button"
                          class="btn btn-primary btn1"
                          data-toggle="modal"
                          data-target="#exampleModalCenter"
                        >
                          Completed
                        </button>
                      </div>
                    </Link>
                  </div>
                  <div class="card-datatable">
                    <table class="dt-complex-header table table-bordered table-responsive">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Bank</th>
                          <th>Account_Number</th>
                          <th>Account_Name</th>
                          <th class="cell-fit">Description</th>
                          <th>Date</th>
                          <th>Amount</th>
                          <th>Action</th>
                        </tr>

                        <tr>
                          <td>1111</td>
                          <td>Faisal Bank</td>
                          <td>00000000000000000000000</td>
                          <td>mmmmmmaaaaatttttttt---</td>
                          <td class="cell-fit">qwertyuiqwertyqwetyqwet</td>
                          <td>12645667</td>
                          <td>12345678</td>
                          <td>asdfghj</td>
                        </tr>

                        <tr>
                          <td>1111</td>
                          <td>Faisal Bank</td>
                          <td>00000000000000000000000</td>
                          <td>mmmmmmaaaaatttttttt---</td>
                          <td class="cell-fit">qwertyuiqwertyqwetyqwet</td>
                          <td>12645667</td>
                          <td>12345678</td>
                          <td>asdfghj</td>
                        </tr>

                        <tr>
                          <td>1111</td>
                          <td>Faisal Bank</td>
                          <td>00000000000000000000000</td>
                          <td>mmmmmmaaaaatttttttt---</td>
                          <td class="cell-fit">qwertyuiqwertyqwetyqwet</td>
                          <td>12645667</td>
                          <td>12345678</td>
                          <td>asdfghj</td>
                        </tr>

                        <tr>
                          <td>1111</td>
                          <td>Faisal Bank</td>
                          <td>00000000000000000000000</td>
                          <td>mmmmmmaaaaatttttttt---</td>
                          <td class="cell-fit">qwertyuiqwertyqwetyqwet</td>
                          <td>12645667</td>
                          <td>12345678</td>
                          <td>asdfghj</td>
                        </tr>

                        <tr>
                          <td>1111</td>
                          <td>Faisal Bank</td>
                          <td>00000000000000000000000</td>
                          <td>mmmmmmaaaaatttttttt---</td>
                          <td class="cell-fit">qwertyuiqwertyqwetyqwet</td>
                          <td>12645667</td>
                          <td>12345678</td>
                          <td>asdfghj</td>
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
    </>
  );
};

export default Withdraw;
