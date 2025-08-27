import React, { useEffect, useState } from "react";
import { UniversityHeader } from "../components/UniversityHeader";
import { UniversitySidebar } from "../components/UniversitySidebar";
import { useNavigate } from "react-router-dom";
import { ManagerChartOne } from "../../components/ManagerChartOne";
import axios from "axios";

export const UniversityDashboard = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const uniName = sessionStorage.getItem("uni_name");
  const check = sessionStorage.getItem("isLoggedIn");

  const [allInterCount, setAllInternCount] = useState(0);
  const [allActiveCount, setAllActiveCount] = useState(0);
  const [allProjectsCount, setAllProjectsCount] = useState(0);
  const [allTasksCount, setAllTasksCount] = useState(0);

  const [ongoingCount, setOngoingCount] = useState(0);
  const [submittedCount, setSubmittedCount] = useState(0);
  const [compleCount, setCompleCount] = useState(0);
  const [expiredCount, setExpiredCount] = useState(0);

  useEffect(() => {
    if (!check) {
      navigate("/university-login");
    }
  });

  useEffect(() => {
    const GetAllUniIntern = async () => {
      await axios
        .get(`http://localhost:8800/count-all-uni-intern/${uniName}`)
        .then((res) => {
          setAllInternCount(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    GetAllUniIntern();

    const GetAllUniActive = async () => {
      await axios
        .get(`http://localhost:8800/count-all-uni-active/${uniName}`)
        .then((res) => {
          setAllActiveCount(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    GetAllUniActive();

    const GetAllUniProj = async () => {
      await axios
        .get(`http://localhost:8800/count-all-uni-proj/${uniName}`)
        .then((res) => {
          setAllProjectsCount(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    GetAllUniProj();

    const GetAllUniTasks = async () => {
      await axios
        .get(`http://localhost:8800/count-all-uni-tasks/${uniName}`)
        .then((res) => {
          setAllTasksCount(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    GetAllUniTasks();


  });

  const [dataOnsite, setDataOnsite] = useState({
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ], // Array of labels (e.g., months)
    datasets: [
      {
        label: "Onsite Interns",
        data: [], // Array of data points
        backgroundColor: ["#3275db"],
        borderColor: "#3275db",
      },
    ],
  });

  const [dataRemote, setDataRemote] = useState({
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ], // Array of labels (e.g., months)
    datasets: [
      {
        label: "Remote Interns",
        data: [], // Array of data points
        backgroundColor: ["#3275db"],
        borderColor: "#3275db",
      },
    ],
  });
  return (
    <>
      <UniversityHeader />
      <UniversitySidebar />

      <div className="app-content content ">
        <div className="content-overlay"></div>
        <div className="header-navbar-shadow"></div>
        <div className="content-wrapper">
          <div className="content-header row"></div>
          <div className="content-body">
            {/* <!-- Dashboard --> */}
            <section id="dashboard-ecommerce">
              <div className="card card-congratulation-medal rounded-0">
                <div className="card-body">
                  <h3 className="roboto">Dashboard Statistics</h3>
                </div>
              </div>

              <div class="col-12 col-xl-12 col-md-6">
                <div class="card card-statistics">
                  <div class="card-header">
                    <h4 class="card-title">Intern Statistics</h4>
                    <div class="d-flex align-items-center">
                      <p class="card-text font-small-2 mr-25 mb-0">
                        Updated 1 seconds ago
                      </p>
                    </div>
                  </div>
                  <div class="card-body statistics-body">
                    <div class="row">
                      <div class="col-xl-3 col-sm-6 col-12 mb-2 mb-xl-0">
                        <div class="media">
                          <div class="avatar bg-light-primary mr-2">
                            <div class="avatar-content">
                              <i data-feather="users" class="avatar-icon"></i>
                            </div>
                          </div>
                          <div class="media-body my-auto">
                            <h4 class="font-weight-bolder mb-0">
                              {allInterCount !== 0 ? allInterCount : 0}
                            </h4>
                            <p class="card-text font-small-3 mb-0">
                              Total Interns
                            </p>
                          </div>
                        </div>
                      </div>
                      <div class="col-xl-3 col-sm-6 col-12 mb-2 mb-xl-0">
                        <div class="media">
                          <div class="avatar bg-light-danger mr-2">
                            <div class="avatar-content">
                              <i data-feather="loader" class="avatar-icon"></i>
                            </div>
                          </div>
                          <div class="media-body my-auto">
                            <h4 class="font-weight-bolder mb-0">
                              {allActiveCount !== 0 ? allActiveCount : 0}
                            </h4>
                            <p class="card-text font-small-3 mb-0">
                              Active Interns
                            </p>
                          </div>
                        </div>
                      </div>
                      <div class="col-xl-3 col-sm-6 col-12 mb-2 mb-sm-0">
                        <div class="media">
                          <div class="avatar bg-light-info mr-2">
                            <div class="avatar-content">
                              <i data-feather="grid" class="avatar-icon"></i>
                            </div>
                          </div>
                          <div class="media-body my-auto">
                            <h4 class="font-weight-bolder mb-0">
                              {allProjectsCount !== 0 ? allProjectsCount : 0}
                            </h4>
                            <p class="card-text font-small-3 mb-0">
                              All Projects
                            </p>
                          </div>
                        </div>
                      </div>
                      <div class="col-xl-3 col-sm-6 col-12">
                        <div class="media">
                          <div class="avatar bg-light-success mr-2">
                            <div class="avatar-content">
                              <i
                                data-feather="check-square"
                                class="avatar-icon"
                              ></i>
                            </div>
                          </div>
                          <div class="media-body my-auto">
                            <h4 class="font-weight-bolder mb-0">
                              {allTasksCount !== 0 ? allTasksCount : 0}
                            </h4>
                            <p class="card-text font-small-3 mb-0">All Tasks</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-12 col-xl-12 col-md-6">
                <div class="card card-statistics">
                  <div class="card-header">
                    <h4 class="card-title">Project Statistics</h4>
                    <div class="d-flex align-items-center">
                      <p class="card-text font-small-2 mr-25 mb-0">
                        Updated 1 seconds ago
                      </p>
                    </div>
                  </div>
                  <div class="card-body statistics-body">
                    <div class="row">
                      <div class="col-xl-3 col-sm-6 col-12 mb-2 mb-xl-0">
                        <div class="media">
                          <div class="avatar bg-light-primary mr-2">
                            <div class="avatar-content">
                              <i data-feather="loader" class="avatar-icon"></i>
                            </div>
                          </div>
                          <div class="media-body my-auto">
                            <h4 class="font-weight-bolder mb-0">
                              {ongoingCount !== 0 ? ongoingCount : 0}
                            </h4>
                            <p class="card-text font-small-3 mb-0">Ongoing</p>
                          </div>
                        </div>
                      </div>
                      <div class="col-xl-3 col-sm-6 col-12 mb-2 mb-xl-0">
                        <div class="media">
                          <div class="avatar bg-light-info mr-2">
                            <div class="avatar-content">
                              <i data-feather="check-circle"></i>
                            </div>
                          </div>
                          <div class="media-body my-auto">
                            <h4 class="font-weight-bolder mb-0">
                              {submittedCount !== 0 ? submittedCount : 0}
                            </h4>
                            <p class="card-text font-small-3 mb-0">Submitted</p>
                          </div>
                        </div>
                      </div>
                      <div class="col-xl-3 col-sm-6 col-12 mb-2 mb-sm-0">
                        <div class="media">
                          <div class="avatar bg-light-success mr-2">
                            <div class="avatar-content">
                              <i data-feather="check-square"></i>
                            </div>
                          </div>
                          <div class="media-body my-auto">
                            <h4 class="font-weight-bolder mb-0">
                              {compleCount !== 0 ? compleCount : 0}
                            </h4>
                            <p class="card-text font-small-3 mb-0">Completed</p>
                          </div>
                        </div>
                      </div>
                      <div class="col-xl-3 col-sm-6 col-12">
                        <div class="media">
                          <div class="avatar bg-light-danger mr-2">
                            <div class="avatar-content">
                              <i data-feather="x-circle"></i>
                            </div>
                          </div>
                          <div class="media-body my-auto">
                            <h4 class="font-weight-bolder mb-0">
                              {expiredCount !== 0 ? expiredCount : 0}
                            </h4>
                            <p class="card-text font-small-3 mb-0">Expired</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* <!-- ChartJS section start --> */}
            <section id="chartjs-chart">
              <div className="row">
                {/* <!--Bar Chart Start --> */}
                <div className="col-xl-6 col-12">
                  <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-sm-center align-items-start flex-sm-row flex-column">
                      <div className="header-left">
                        <h4 className="card-title">Onsite Interns</h4>
                      </div>
                    </div>
                    <div className="card-body">
                      <ManagerChartOne chartData={dataOnsite} />
                    </div>
                  </div>
                </div>
                {/* <!-- Bar Chart End --> */}

                {/* <!--Bar Chart Start --> */}
                <div className="col-xl-6 col-12">
                  <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-sm-center align-items-start flex-sm-row flex-column">
                      <div className="header-left">
                        <h4 className="card-title">Remote Interns</h4>
                      </div>
                    </div>
                    <div className="card-body">
                      <ManagerChartOne chartData={dataRemote} />
                    </div>
                  </div>
                </div>
                {/* <!-- Bar Chart End --> */}
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};
