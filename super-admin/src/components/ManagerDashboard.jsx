import React, { useEffect, useState } from "react";
import { DataSet1 } from "../data/manager-data/Data";
import { ManagerChartOne } from "./ManagerChartOne";
import { FiRefreshCw } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Link } from "react-router-dom";
import { Pie, Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title
);


export const ManagerDashboard = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const check = sessionStorage.getItem("isLoggedIn");
  const [interviewCount, setInterviewCount] = useState(0);
  const [contactCount, setContactCount] = useState(0);
  const [testCount, setTestCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);

  const [allInterCount, setAllInternCount] = useState(0);
  const [allActiveCount, setAllActiveCount] = useState(0);
  const [allProjectsCount, setAllProjectsCount] = useState(0);
  const [allTasksCount, setAllTasksCount] = useState(0);

  const [ongoingCount, setOngoingCount] = useState(0);
  const [submittedCount, setSubmittedCount] = useState(0);
  const [compleCount, setCompleCount] = useState(0);
  const [expiredCount, setExpiredCount] = useState(0);


   // New states for enhanced dashboard
  const [managerActivities, setManagerActivities] = useState([]);
  const [supervisorActivities, setSupervisorActivities] = useState([]);
  const [studentTracking, setStudentTracking] = useState([]);
  const [inactivityAlerts, setInactivityAlerts] = useState([]);


    // New states for charts
  const [statusData, setStatusData] = useState(null);
  const [techData, setTechData] = useState(null);
  const [financeData, setFinanceData] = useState(null);
  const [intakeData, setIntakeData] = useState(null);

  const [revenueData, setRevenueData] = useState(null);
  const [funnelData, setFunnelData] = useState(null);
  const [retentionData, setRetentionData] = useState(null);
  const [complaintsData, setComplaintsData] = useState(null);
  const [managerPerfData, setManagerPerfData] = useState(null);
  const [attendanceHeatmap, setAttendanceHeatmap] = useState(null);
  const [uniData, setUniData] = useState(null);

  const [mailFilters, setMailFilters] = useState({
    technology: "",
    category: "",
    location: "",
  });
  const [mailSubject, setMailSubject] = useState("");
  const [mailMessage, setMailMessage] = useState("");
  const [mailStatus, setMailStatus] = useState("");




  if (!check) {
    navigate("/");
  }

  // const [userData, SetUserData] = useState({
  //   labels: DataSet1.map((rs) => rs.Years),
  //   datasets: [
  //     {
  //       label: "This Year Interns",
  //       data: DataSet1.map((rs) => rs.Visitors),
  //       backgroundColor: ["#3275db"],
  //       borderColor: "#3275db",
  //     },
  //   ],
  // });


  

  const handleSendBulkMail = async (e) => {
    e.preventDefault();
    setMailStatus("Sending...");
    try {
      const res = await axios.post("https://testserver.ezitech.org/admin/send-bulk-mail", {
        subject: mailSubject,
        message: mailMessage,
        filters: mailFilters,
      });
      setMailStatus(`Sent to ${res.data.sent} students.`);
    } catch (err) {
      setMailStatus("Error sending emails.");
    }
  };

  useEffect(() => {
    // Fetch Manager Activities
  axios
    .get("https://testserver.ezitech.org/dashboard/manager-activities")
    .then((res) => setManagerActivities(res.data))
    .catch((err) => setManagerActivities([]));

  // Fetch Supervisor Activities
  axios
    .get("https://testserver.ezitech.org/dashboard/supervisor-activities")
    .then((res) => setSupervisorActivities(res.data))
    .catch((err) => setSupervisorActivities([]));


  // Fetch Student Tracking
  axios
    .get("https://testserver.ezitech.org/dashboard/student-tracking")
    .then((res) => setStudentTracking(res.data))
    .catch((err) => setStudentTracking([]));

  // Fetch Inactivity Alerts
  axios
    .get("https://testserver.ezitech.org/dashboard/inactivity-alerts")
    .then((res) => setInactivityAlerts(res.data))
    .catch((err) => setInactivityAlerts([]));
  }, []);



  // Fetch Intern Status Distribution
  useEffect(() => {
    axios.get("https://testserver.ezitech.org/dashboard/intern-status-distribution").then((res) => {
      const labels = res.data.map((row) => row.status);
      const data = res.data.map((row) => row.count);
      setStatusData({
        labels,
        datasets: [
          {
            label: "Interns",
            data,
            backgroundColor: [
              "#36A2EB", "#FF6384", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"
            ],
          },
        ],
      });
    });
  }, []);

  // Fetch Intern Technology Breakdown
  useEffect(() => {
    axios.get("https://testserver.ezitech.org/dashboard/intern-technology-breakdown").then((res) => {
      const labels = res.data.map((row) => row.technology);
      const data = res.data.map((row) => row.count);
      setTechData({
        labels,
        datasets: [
          {
            label: "Interns",
            data,
            backgroundColor: "#3275db",
          },
        ],
      });
    });
  }, []);

  // Fetch Financial Overview
  useEffect(() => {
    axios.get("https://testserver.ezitech.org/dashboard/financial-overview").then((res) => {
      setFinanceData({
        labels: ["Received", "Pending", "Remaining"],
        datasets: [
          {
            label: "Amount (PKR)",
            data: [res.data.received, res.data.pending, res.data.remaining],
            backgroundColor: ["#28a745", "#ffc107", "#dc3545"],
          },
        ],
      });
    });
  }, []);

  // Fetch Intern Intake Over Time
  useEffect(() => {
    axios.get("https://testserver.ezitech.org/dashboard/intern-intake-over-time").then((res) => {
      setIntakeData({
        labels: res.data.map((row) => row.month),
        datasets: [
          {
            label: "New Interns",
            data: res.data.map((row) => row.count),
            fill: false,
            borderColor: "#3275db",
            backgroundColor: "#3275db",
            tension: 0.3,
          },
        ],
      });
    });
  }, []);




   // Revenue & Payment Trends
  useEffect(() => {
    axios.get("https://testserver.ezitech.org/dashboard/revenue-trends").then(res => {
      setRevenueData({
        labels: res.data.map(r => r.month),
        datasets: [
          {
            label: "Received",
            data: res.data.map(r => r.received),
            borderColor: "#28a745",
            backgroundColor: "#28a74533",
            fill: true,
          },
          {
            label: "Pending",
            data: res.data.map(r => r.pending),
            borderColor: "#ffc107",
            backgroundColor: "#ffc10733",
            fill: true,
          },
          {
            label: "Outstanding",
            data: res.data.map(r => r.remaining),
            borderColor: "#dc3545",
            backgroundColor: "#dc354533",
            fill: true,
          },
        ],
      });
    });
  }, []);

  // Intern Conversion Funnel
  // useEffect(() => {
  //   axios.get("https://testserver.ezitech.org/dashboard/intern-funnel").then(res => {
  //     setFunnelData({
  //       labels: res.data.map(r => r.status),
  //       datasets: [
  //         {
  //           label: "Interns",
  //           data: res.data.map(r => r.count),
  //           backgroundColor: [
  //             "#36A2EB", "#FF6384", "#FFCE56", "#4BC0C0", "#9966FF"
  //           ],
  //         },
  //       ],
  //     });
  //   });
  // }, []);

  // Retention Rate
  // useEffect(() => {
  //   axios.get("https://testserver.ezitech.org/dashboard/retention-rate").then(res => {
  //     setRetentionData({
  //       labels: res.data.map(r => r.month),
  //       datasets: [
  //         {
  //           label: "Retention (%)",
  //           data: res.data.map(r => r.retention),
  //           backgroundColor: "#3275db",
  //           borderColor: "#3275db",
  //           fill: false,
  //         },
  //       ],
  //     });
  //   });
  // }, []);

  // Complaints & Feedback
  useEffect(() => {
    axios.get("https://testserver.ezitech.org/dashboard/complaints-feedback").then(res => {
      setComplaintsData({
        labels: Object.keys(res.data),
        datasets: [
          {
            label: "Complaints",
            data: Object.values(res.data),
            backgroundColor: ["#ffc107", "#28a745", "#dc3545"],
          },
        ],
      });
    });
  }, []);

  // Manager/Department Performance
  useEffect(() => {
    axios.get("https://testserver.ezitech.org/dashboard/manager-performance").then(res => {
      setManagerPerfData({
        labels: res.data.map(r => r.manager_name),
        datasets: [
          {
            label: "Total Tasks",
            data: res.data.map(r => r.total_tasks),
            backgroundColor: "#36A2EB",
          },
          {
            label: "Completed Tasks",
            data: res.data.map(r => r.completed_tasks),
            backgroundColor: "#28a745",
          },
          {
            label: "Projects Supervised",
            data: res.data.map(r => r.projects_supervised),
            backgroundColor: "#FFCE56",
          },
          {
            label: "Complaints",
            data: res.data.map(r => r.complaints),
            backgroundColor: "#dc3545",
          },
        ],
      });
    });
  }, []);

  // Attendance Heatmap (as stacked bar)
  useEffect(() => {
    axios.get("https://testserver.ezitech.org/dashboard/attendance-heatmap").then(res => {
      setAttendanceHeatmap({
        labels: res.data.map(r => r.date),
        datasets: [
          {
            label: "Present",
            data: res.data.map(r => r.present),
            backgroundColor: "#28a745",
          },
          {
            label: "Absent",
            data: res.data.map(r => r.absent),
            backgroundColor: "#dc3545",
          },
        ],
      });
    });
  }, []);

  // Interns by University
  useEffect(() => {
    axios.get("https://testserver.ezitech.org/dashboard/interns-by-university").then(res => {
      setUniData({
        labels: res.data.map(r => r.university),
        datasets: [
          {
            label: "Interns",
            data: res.data.map(r => r.count),
            backgroundColor: "#3275db",
          },
        ],
      });
    });
  }, []);





  useEffect(() => {
    const InterviewCount = async () => {
      await axios
        .get("https://testserver.ezitech.org/admin-interview-count")
        .then((res) => {
          setInterviewCount(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    InterviewCount();

    const ContactCount = async () => {
      await axios
        .get("https://testserver.ezitech.org/admin-contact-count")
        .then((res) => {
          setContactCount(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    ContactCount();

    const TestCount = async () => {
      await axios
        .get("https://testserver.ezitech.org/admin-test-count")
        .then((res) => {
          setTestCount(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    TestCount();

    const TestCompletedCount = async () => {
      await axios
        .get("https://testserver.ezitech.org/admin-completed-count")
        .then((res) => {
          setCompletedCount(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    TestCompletedCount();

    // Interns Api
    const AllInternCount = async () => {
      await axios
        .get("https://testserver.ezitech.org/admin-all-intern-count")
        .then((res) => {
          setAllInternCount(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    AllInternCount();

    const AllActiveCount = async () => {
      await axios
        .get("https://testserver.ezitech.org/admin-all-active-count")
        .then((res) => {
          setAllActiveCount(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    AllActiveCount();

    const AllProjectsCount = async () => {
      await axios
        .get("https://testserver.ezitech.org/admin-all-projects-count")
        .then((res) => {
          setAllProjectsCount(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    AllProjectsCount();

    const AllTasksCount = async () => {
      await axios
        .get("https://testserver.ezitech.org/admin-all-tasks-count")
        .then((res) => {
          setAllTasksCount(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    AllTasksCount();

    // Projects
    const OngoingCount = async () => {
      await axios
        .get("https://testserver.ezitech.org/count-ongoing")
        .then((res) => {
          setOngoingCount(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    OngoingCount();

    const SubmittedCount = async () => {
      await axios
        .get("https://testserver.ezitech.org/count-submitted")
        .then((res) => {
          setSubmittedCount(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    SubmittedCount();

    const CompletedCount = async () => {
      await axios
        .get("https://testserver.ezitech.org/count-completed")
        .then((res) => {
          setCompleCount(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    CompletedCount();

    const ExpiredCount = async () => {
      await axios
        .get("https://testserver.ezitech.org/count-expired")
        .then((res) => {
          setExpiredCount(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    ExpiredCount();
  }, [2000]);

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

  const GetOnsiteStatics = async () => {
    try {
      const res = await axios.get("https://testserver.ezitech.org/get-statics", {
        headers: { "x-access-token": token },
      });
      const data = res.data;

      setDataOnsite({
        ...dataOnsite,

        datasets: [
          {
            ...dataOnsite.datasets[0],
            data: data.onsite,
          },
        ],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const GetRemoteStatics = async () => {
    try {
      const res = await axios.get("https://testserver.ezitech.org/get-statics", {
        headers: { "x-access-token": token },
      });
      const data = res.data;

      setDataRemote({
        ...dataRemote,

        datasets: [
          {
            ...dataRemote.datasets[0],
            data: data.remote,
          },
        ],
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetOnsiteStatics();
    GetRemoteStatics();
  }, [2000]);

  return (
  <>
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
            <div className="row match-height">
              {/* Manager Statistics */}
              <div className="col-12 col-xl-12 col-md-6">
                <div className="card card-statistics">
                  <div className="card-header">
                    <h4 className="card-title">Manager Statistics</h4>
                    <div className="d-flex align-items-center">
                      <p className="card-text font-small-2 mr-25 mb-0">
                        Updated 1 seconds ago
                      </p>
                    </div>
                  </div>
                  <div className="card-body statistics-body">
                    <div className="row">
                      <div className="col-xl-3 col-sm-6 col-12 mb-2 mb-xl-0">
                        <div className="media">
                          <div className="avatar bg-light-primary mr-2">
                            <div className="avatar-content">
                              <i data-feather="briefcase" className="avatar-icon"></i>
                            </div>
                          </div>
                          <div className="media-body my-auto">
                            <h4 className="font-weight-bolder mb-0">
                              {interviewCount !== 0 ? interviewCount : 0}
                            </h4>
                            <p className="card-text font-small-3 mb-0">Interview</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-3 col-sm-6 col-12 mb-2 mb-xl-0">
                        <div className="media">
                          <div className="avatar bg-light-danger mr-2">
                            <div className="avatar-content">
                              <i data-feather="phone" className="avatar-icon"></i>
                            </div>
                          </div>
                          <div className="media-body my-auto">
                            <h4 className="font-weight-bolder mb-0">
                              {contactCount !== 0 ? contactCount : 0}
                            </h4>
                            <p className="card-text font-small-3 mb-0">Contact</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-3 col-sm-6 col-12 mb-2 mb-sm-0">
                        <div className="media">
                          <div className="avatar bg-light-info mr-2">
                            <div className="avatar-content">
                              <i data-feather="clipboard" className="avatar-icon"></i>
                            </div>
                          </div>
                          <div className="media-body my-auto">
                            <h4 className="font-weight-bolder mb-0">
                              {testCount !== 0 ? testCount : 0}
                            </h4>
                            <p className="card-text font-small-3 mb-0">Test</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-3 col-sm-6 col-12">
                        <div className="media">
                          <div className="avatar bg-light-success mr-2">
                            <div className="avatar-content">
                              <i data-feather="check-square" className="avatar-icon"></i>
                            </div>
                          </div>
                          <div className="media-body my-auto">
                            <h4 className="font-weight-bolder mb-0">
                              {completedCount !== 0 ? completedCount : 0}
                            </h4>
                            <p className="card-text font-small-3 mb-0">Test Completed</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Intern Statistics */}
              <div className="col-12 col-xl-12 col-md-6">
                <div className="card card-statistics">
                  <div className="card-header">
                    <h4 className="card-title">Intern Statistics</h4>
                    <div className="d-flex align-items-center">
                      <p className="card-text font-small-2 mr-25 mb-0">
                        Updated 1 seconds ago
                      </p>
                    </div>
                  </div>
                  <div className="card-body statistics-body">
                    <div className="row">
                      <div className="col-xl-3 col-sm-6 col-12 mb-2 mb-xl-0">
                        <div className="media">
                          <div className="avatar bg-light-primary mr-2">
                            <div className="avatar-content">
                              <i data-feather="users" className="avatar-icon"></i>
                            </div>
                          </div>
                          <div className="media-body my-auto">
                            <h4 className="font-weight-bolder mb-0">
                              {allInterCount !== 0 ? allInterCount : 0}
                            </h4>
                            <p className="card-text font-small-3 mb-0">Total Interns</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-3 col-sm-6 col-12 mb-2 mb-xl-0">
                        <div className="media">
                          <div className="avatar bg-light-danger mr-2">
                            <div className="avatar-content">
                              <i data-feather="loader" className="avatar-icon"></i>
                            </div>
                          </div>
                          <div className="media-body my-auto">
                            <h4 className="font-weight-bolder mb-0">
                              {allActiveCount !== 0 ? allActiveCount : 0}
                            </h4>
                            <p className="card-text font-small-3 mb-0">Active Interns</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-3 col-sm-6 col-12 mb-2 mb-sm-0">
                        <div className="media">
                          <div className="avatar bg-light-info mr-2">
                            <div className="avatar-content">
                              <i data-feather="grid" className="avatar-icon"></i>
                            </div>
                          </div>
                          <div className="media-body my-auto">
                            <h4 className="font-weight-bolder mb-0">
                              {allProjectsCount !== 0 ? allProjectsCount : 0}
                            </h4>
                            <p className="card-text font-small-3 mb-0">All Projects</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-3 col-sm-6 col-12">
                        <div className="media">
                          <div className="avatar bg-light-success mr-2">
                            <div className="avatar-content">
                              <i data-feather="check-square" className="avatar-icon"></i>
                            </div>
                          </div>
                          <div className="media-body my-auto">
                            <h4 className="font-weight-bolder mb-0">
                              {allTasksCount !== 0 ? allTasksCount : 0}
                            </h4>
                            <p className="card-text font-small-3 mb-0">All Tasks</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Statistics */}
              <div className="col-12 col-xl-12 col-md-6">
                <div className="card card-statistics">
                  <div className="card-header">
                    <h4 className="card-title">Project Statistics</h4>
                    <div className="d-flex align-items-center">
                      <p className="card-text font-small-2 mr-25 mb-0">
                        Updated 1 seconds ago
                      </p>
                    </div>
                  </div>
                  <div className="card-body statistics-body">
                    <div className="row">
                      <div className="col-xl-3 col-sm-6 col-12 mb-2 mb-xl-0">
                        <div className="media">
                          <div className="avatar bg-light-primary mr-2">
                            <div className="avatar-content">
                              <i data-feather="loader" className="avatar-icon"></i>
                            </div>
                          </div>
                          <div className="media-body my-auto">
                            <h4 className="font-weight-bolder mb-0">
                              {ongoingCount !== 0 ? ongoingCount : 0}
                            </h4>
                            <p className="card-text font-small-3 mb-0">Ongoing</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-3 col-sm-6 col-12 mb-2 mb-xl-0">
                        <div className="media">
                          <div className="avatar bg-light-info mr-2">
                            <div className="avatar-content">
                              <i data-feather="check-circle"></i>
                            </div>
                          </div>
                          <div className="media-body my-auto">
                            <h4 className="font-weight-bolder mb-0">
                              {submittedCount !== 0 ? submittedCount : 0}
                            </h4>
                            <p className="card-text font-small-3 mb-0">Submitted</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-3 col-sm-6 col-12 mb-2 mb-sm-0">
                        <div className="media">
                          <div className="avatar bg-light-success mr-2">
                            <div className="avatar-content">
                              <i data-feather="check-square"></i>
                            </div>
                          </div>
                          <div className="media-body my-auto">
                            <h4 className="font-weight-bolder mb-0">
                              {compleCount !== 0 ? compleCount : 0}
                            </h4>
                            <p className="card-text font-small-3 mb-0">Completed</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-3 col-sm-6 col-12">
                        <div className="media">
                          <div className="avatar bg-light-danger mr-2">
                            <div className="avatar-content">
                              <i data-feather="x-circle"></i>
                            </div>
                          </div>
                          <div className="media-body my-auto">
                            <h4 className="font-weight-bolder mb-0">
                              {expiredCount !== 0 ? expiredCount : 0}
                            </h4>
                            <p className="card-text font-small-3 mb-0">Expired</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Enhanced Dashboard Section */}
      <section id="dashboard-enhanced">
        <div className="row match-height">
          {/* Manager Activities */}
          {/* <div className="col-xl-4 col-md-6 col-12">
            <div className="card h-100">
              <div className="card-header pb-0">
                <h4 className="card-title mb-0">Manager Activities</h4>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th>Manager</th>
                        <th>Interviews</th>
                        <th>Contacts</th>
                        <th>Tests</th>
                      </tr>
                    </thead>
                    <tbody>
                      {managerActivities.length > 0 ? (
                        managerActivities.map((m) => (
                          <tr key={m.manager_id}>
                            <td>{m.manager_name}</td>
                            <td>{m.interviews}</td>
                            <td>{m.contacts}</td>
                            <td>{m.tests}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="text-center text-muted">
                            No data found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div> */}


          {/* Manager Activities Table */}
          <div className="col-xl-12 col-12">
            <div className="card h-100">
              <div className="card-header pb-0">
                <h4 className="card-title mb-0">Manager Activities</h4>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-striped table-hover align-middle">
                    <thead>
                      <tr>
                        <th>Manager</th>
                        <th>Interviews</th>
                        <th>Contacts</th>
                        <th>Tests</th>
                        <th>Total Tasks</th>
                        <th>Completed Tasks</th>
                        <th>Projects Supervised</th>
                        <th>Complaints</th>
                        <th>Technologies Assigned</th>
                      </tr>
                    </thead>
                    <tbody>
                      {managerActivities.length > 0 ? (
                        managerActivities.map((m) => (
                          <tr key={m.manager_id}>
                            <td>{m.manager_name}</td>
                            <td>{m.interviews ?? 0}</td>
                            <td>{m.contacts ?? 0}</td>
                            <td>{m.tests ?? 0}</td>
                            <td>{m.total_tasks_assigned ?? 0}</td>
                            <td>{m.completed_tasks ?? 0}</td>
                            <td>{m.projects_supervised ?? 0}</td>
                            <td>{m.total_complaints ?? 0}</td>
                            <td>{m.technologies_assigned ? m.technologies_assigned : <span className="text-muted">N/A</span>}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={9} className="text-center text-muted">No data found.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Supervisor Activities Table */}
          <div className="col-xl-12 col-12 mt-3">
            <div className="card h-100">
              <div className="card-header pb-0">
                <h4 className="card-title mb-0">Supervisor Activities</h4>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-striped table-hover align-middle">
                    <thead>
                      <tr>
                        <th>Supervisor</th>
                        <th>Interviews</th>
                        <th>Contacts</th>
                        <th>Tests</th>
                        <th>Total Tasks</th>
                        <th>Completed Tasks</th>
                        <th>Projects Supervised</th>
                        <th>Complaints</th>
                        <th>Technologies Assigned</th>
                      </tr>
                    </thead>
                    <tbody>
                      {supervisorActivities.length > 0 ? (
                        supervisorActivities.map((s) => (
                          <tr key={s.supervisor_id}>
                            <td>{s.supervisor_name}</td>
                            <td>{s.interviews ?? 0}</td>
                            <td>{s.contacts ?? 0}</td>
                            <td>{s.tests ?? 0}</td>
                            <td>{s.total_tasks_assigned ?? 0}</td>
                            <td>{s.completed_tasks ?? 0}</td>
                            <td>{s.projects_supervised ?? 0}</td>
                            <td>{s.total_complaints ?? 0}</td>
                            <td>{s.technologies_assigned ? s.technologies_assigned : <span className="text-muted">N/A</span>}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={9} className="text-center text-muted">No data found.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>



          {/* Student Tracking
          <div className="col-xl-4 col-md-6 col-12">
            <div className="card h-100">
              <div className="card-header pb-0">
                <h4 className="card-title mb-0">Student Tracking</h4>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th>Intern</th>
                        <th>Tasks</th>
                        <th>Completed</th>
                        <th>Supervisors</th>
                      </tr>
                    </thead>
                    <tbody>
                      {studentTracking.length > 0 ? (
                        studentTracking.map((s) => (
                          <tr key={s.intern_eti_id}>
                            <td>{s.intern_name}</td>
                            <td>{s.total_tasks}</td>
                            <td>{s.completed_tasks}</td>
                            <td>{s.supervisors}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="text-center text-muted">
                            No data found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div> */}

          {/* Inactivity Alerts */}
          <div className="col-xl-12 col-12">
            <div className="card h-100">
              <div className="card-header pb-0">
                <h4 className="card-title mb-0">Inactivity Alerts</h4>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th>Intern</th>
                        <th>Type</th>
                        <th>City</th>
                        <th>Country</th>
                        <th>Phone</th>
                        <th>Days Inactive</th>
                        <th>Last Present</th>
                        <th>Absents (30d)</th>
                        <th>Leaves (30d)</th>
                        <th>Managers</th>
                        {/* <th>Action</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {inactivityAlerts.length > 0 ? (
                        inactivityAlerts.map((a) => (
                          <tr key={a.intern_id}>
                            <td>
                              <span className="text-danger">{a.intern_name}</span>
                            </td>
                            <td>{a.intern_type}</td>
                            <td>{a.city}</td>
                            <td>{a.country}</td>
                            <td>{a.phone}</td>
                            <td>{a.days_inactive ?? "N/A"}</td>
                            <td>
                              {a.last_present_date
                                ? new Date(a.last_present_date).toLocaleDateString()
                                : "Never"}
                            </td>
                            <td>{a.absents_30d}</td>
                            <td>{a.leaves_30d}</td>
                            <td>{a.responsible_managers}</td>
                            {/* <td>
                              <Link
                                className="btn btn-sm btn-primary"
                                to={`/active-interns?eti_id=${a.intern_id}&name=${encodeURIComponent(a.intern_name)}`}
                              >
                                View Report
                              </Link> 
                            </td> */}
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={13} className="text-center text-success">
                            No inactivity alerts.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

          {/* ChartJS section start */}
          <section id="chartjs-chart">
            <div className="row">
              {/* Bar Chart Start */}
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
              {/* Bar Chart End */}

              {/* Bar Chart Start */}
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
              {/* Bar Chart End */}
            </div>
          </section>

          

          
          {/* --- New Dashboard Charts Section --- */}
          <section id="dashboard-charts">
            <div className="row">
              {/* Intern Status Distribution */}
              <div className="col-xl-6 col-md-6 col-12 mb-4">
                <div className="card h-100">
                  <div className="card-header pb-0">
                    <h4 className="card-title mb-0">Intern Status Distribution</h4>
                  </div>
                  <div className="card-body">
                    {statusData ? (
                      <Pie data={statusData} />
                    ) : (
                      <div>Loading...</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Intern Technology Breakdown */}
              <div className="col-xl-6 col-md-6 col-12 mb-4">
                <div className="card h-100">
                  <div className="card-header pb-0">
                    <h4 className="card-title mb-0">Technology Breakdown</h4>
                  </div>
                  <div className="card-body">
                    {techData ? (
                      <Bar data={techData} options={{ indexAxis: "y" }} />
                    ) : (
                      <div>Loading...</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Financial Overview */}
              <div className="col-xl-6 col-md-6 col-12 mb-4">
                <div className="card h-100">
                  <div className="card-header pb-0">
                    <h4 className="card-title mb-0">Financial Overview</h4>
                  </div>
                  <div className="card-body">
                    {financeData ? (
                      <Bar data={financeData} />
                    ) : (
                      <div>Loading...</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Intern Intake Over Time */}
              <div className="col-xl-6 col-md-6 col-12 mb-4">
                <div className="card h-100">
                  <div className="card-header pb-0">
                    <h4 className="card-title mb-0">Intern Intake Over Time</h4>
                  </div>
                  <div className="card-body">
                    {intakeData ? (
                      <Line data={intakeData} />
                    ) : (
                      <div>Loading...</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>




          {/* --- New Dashboard Charts Section --- */}
          <section id="dashboard-charts">
            <div className="row">
              {/* Revenue & Payment Trends */}
              <div className="col-xl-6 col-md-12 mb-4">
                <div className="card h-100">
                  <div className="card-header pb-0">
                    <h4 className="card-title mb-0">Revenue & Payment Trends</h4>
                  </div>
                  <div className="card-body">
                    {revenueData ? (
                      <Line data={revenueData} />
                    ) : (
                      <div>Loading...</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Intern Conversion Funnel */}
              {/* <div className="col-xl-6 col-md-12 mb-4">
                <div className="card h-100">
                  <div className="card-header pb-0">
                    <h4 className="card-title mb-0">Intern Conversion Funnel</h4>
                  </div>
                  <div className="card-body">
                    {funnelData ? (
                      <Bar data={funnelData} />
                    ) : (
                      <div>Loading...</div>
                    )}
                  </div>
                </div>
              </div> */}

              {/* Retention Rate */}
              {/* <div className="col-xl-6 col-md-12 mb-4">
                <div className="card h-100">
                  <div className="card-header pb-0">
                    <h4 className="card-title mb-0">Intern Retention Rate</h4>
                  </div>
                  <div className="card-body">
                    {retentionData ? (
                      <Line data={retentionData} />
                    ) : (
                      <div>Loading...</div>
                    )}
                  </div>
                </div>
              </div> */}

              {/* Complaints & Feedback */}
              <div className="col-xl-6 col-md-12 mb-4">
                <div className="card h-100">
                  <div className="card-header pb-0">
                    <h4 className="card-title mb-0">Complaints & Feedback</h4>
                  </div>
                  <div className="card-body">
                    {complaintsData ? (
                      <Pie data={complaintsData} />
                    ) : (
                      <div>Loading...</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Manager/Department Performance */}
              <div className="col-xl-12 col-md-12 mb-4">
                <div className="card h-100">
                  <div className="card-header pb-0">
                    <h4 className="card-title mb-0">Manager/Department Performance</h4>
                  </div>
                  <div className="card-body">
                    {managerPerfData ? (
                      <Bar data={managerPerfData} options={{ indexAxis: "y", grouped: true }} />
                    ) : (
                      <div>Loading...</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Attendance Heatmap (Stacked Bar) */}
              <div className="col-xl-12 col-md-12 mb-4">
                <div className="card h-100">
                  <div className="card-header pb-0">
                    <h4 className="card-title mb-0">Intern Attendance (Last 30 Days)</h4>
                  </div>
                  <div className="card-body">
                    {attendanceHeatmap ? (
                      <Bar data={attendanceHeatmap} options={{ stacked: true }} />
                    ) : (
                      <div>Loading...</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Interns by University */}
              <div className="col-xl-12 col-md-12 mb-4">
                <div className="card h-100">
                  <div className="card-header pb-0">
                    <h4 className="card-title mb-0">Interns by University</h4>
                  </div>
                  <div className="card-body">
                    {uniData ? (
                      <Bar data={uniData} options={{ indexAxis: "y" }} />
                    ) : (
                      <div>Loading...</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>





          {/* Messages */}
          <section id="chartjs-chart">
            <div className="row">
              
                <div className="col-xl-6 col-12">
                  <div className="card">
                    <div className="card-header">
                      <h4 className="card-title">Send Bulk Email to Students</h4>
                    </div>
                    <div className="card-body">
                      <form onSubmit={handleSendBulkMail}>
                        <div className="row">
                          <div className="col-12 mb-2">
                            <label>Subject</label>
                            <input
                              type="text"
                              className="form-control"
                              value={mailSubject}
                              onChange={(e) => setMailSubject(e.target.value)}
                              required
                            />
                          </div>
                          <div className="col-12 mb-2">
                            <label>Message</label>
                            <textarea
                              className="form-control"
                              rows="4"
                              value={mailMessage}
                              onChange={(e) => setMailMessage(e.target.value)}
                              required
                            ></textarea>
                          </div>
                          <div className="col-6 mb-2">
                            <label>Technology</label>
                            <select
                              className="form-control"
                              value={mailFilters.technology}
                              onChange={(e) =>
                                setMailFilters({ ...mailFilters, technology: e.target.value })
                              }
                            >
                              <option value="">All</option>
                              <option value="Web Development">Web Development</option>
                              <option value="MERN Stack">MERN Stack</option>
                              <option value="PHP Development">PHP Development</option>
                              <option value="Python">Python</option>
                              <option value="SEO">SEO</option>
                              <option value="Android Development">Android Development</option>
                              <option value="Graphic Design">Graphic Design</option>
                            </select>
                          </div>
                          <div className="col-6 mb-2">
                            <label>Category</label>
                            <select
                              className="form-control"
                              value={mailFilters.category}
                              onChange={(e) =>
                                setMailFilters({ ...mailFilters, category: e.target.value })
                              }
                            >
                              <option value="">All</option>
                              <option value="Test">Test</option>
                              <option value="Ongoing">Ongoing</option>
                              <option value="Completed">Completed</option>
                              <option value="Homebase">Homebase</option>
                              <option value="Selective">Selective</option>
                            </select>
                          </div>
                          <div className="col-6 mb-2">
                            <label>Location</label>
                            <select
                              className="form-control"
                              value={mailFilters.location}
                              onChange={(e) =>
                                setMailFilters({ ...mailFilters, location: e.target.value })
                              }
                            >
                              <option value="">All</option>
                              <option value="Pakistan">Pakistan</option>
                              <option value="International">International</option>
                            </select>
                          </div>
                        </div>
                        <button className="btn btn-success mt-3" type="submit">
                          Send Email
                        </button>
                        {mailStatus && <div className="mt-2">{mailStatus}</div>}
                      </form>
                    </div>
                  </div>
                </div>

              {/* Absentees Table Start */}
              <div className="col-xl-6 col-12">
                <div className="card">
                  <div className="card-header d-flex justify-content-between align-items-sm-center align-items-start flex-sm-row flex-column">
                    <div className="header-left">
                      <h4 className="card-title">Absentees</h4>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive" style={{ overflowY: "auto" }}>
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Present</th>
                            <th>Absent</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* Example static rows, replace with dynamic data as needed */}
                          <tr>
                            <td>
                              <span className="font-weight-bold">Angular Project</span>
                            </td>
                            <td>0/0</td>
                            <td>0/0</td>
                            <td>
                              <div className="dropdown">
                                <button
                                  type="button"
                                  className="btn btn-warning dropdown-toggle hide-arrow"
                                  data-toggle="dropdown"
                                >
                                  Action
                                </button>
                                <div className="dropdown-menu">
                                  <a className="dropdown-item" href="javascript:void(0);">
                                    <i data-feather="check-square" className="mr-50"></i>
                                    <span>Complete</span>
                                  </a>
                                  <a className="dropdown-item" href="javascript:void(0);">
                                    <i data-feather="x" className="mr-50"></i>
                                    <span>Incomplete</span>
                                  </a>
                                </div>
                              </div>
                            </td>
                          </tr>
                          {/* ...repeat or map for more rows... */}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              {/* Absentees Table End */}
            </div>
          </section>
          
        </div>
      </div>
    </div>
  </>
);







};
