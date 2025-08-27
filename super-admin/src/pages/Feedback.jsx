import React from "react";
import { ManagerTopbar } from "../components/ManagerTopbar";
import { ManagerSidebar } from "../components/ManagerSidebar";
import { useNavigate } from "react-router-dom";


const Feedback = () => {
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

          <section id="dashboard-ecommerce">
            <div className="row" id="table-hover-animation">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">Feedback</h4>
                  </div>

                  <section id="complex-header-datatable">
                    <div class="row">
                      <div class="col-12">
                        <div class="card">
                          <div class="card-datatable">
                            <table class="dt-complex-header table table-bordered table-responsive">
                              <thead>
                                <tr>
                                  <th>#</th>
                                  <th>Name</th>
                                  <th class="cell-fit">Feedback</th>
                                </tr>

                                <tr>
                                  <td>1111</td>
                                  <td>Faisal Bank</td>
                                  <td>
                                    00000000000000000000000hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh
                                  </td>
                                </tr>
                                <tr>
                                  <td>1111</td>
                                  <td>Faisal Bank</td>
                                  <td>
                                    fghjkqwertyuiozfghjkl;zxcvbnm,.ertyuiopasdfghjklzxcvbnm
                                  </td>
                                </tr>

                                <tr>
                                  <td>1111</td>
                                  <td>Faisal Bank</td>
                                  <td>00000000000000000000000</td>
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
          </section>
        </div>
      </div>
    </>
  );
};

export default Feedback;
