import React, { useState } from "react";
import { FiDollarSign } from "react-icons/fi";
import { Link, NavLink } from "react-router-dom";
// import "../../styles/ManagerStyle.css";

export const ManagerSidebar = () => {
  const [activeLink, setActive] = useState(" ");

  // const setActive = (e) => {
  //   setActive(e);
  // };
  return (
    <>
      {/* BEGIN: Main Menu */}
      <div
        className="main-menu menu-fixed menu-light menu-accordion menu-shadow"
        data-scroll-to-active="true"
      >
        <div className="navbar-header">
          <ul className="nav navbar-nav flex-row">
            <li className="nav-item mr-auto">
              <a className="navbar-brand" href="/">
                <span className="brand-logo">
                  <img src="./images/ezitech.png" alt="" />
                </span>

                <img
                  src="./images/logo.png"
                  style={{
                    width: "125px",
                    marginLeft: "10px",
                    height: "43.33px",
                  }}
                  alt="ezitech"
                />
              </a>
            </li>
            <li className="nav-item nav-toggle">
              <a
                className="nav-link modern-nav-toggle pr-0"
                data-toggle="collapse"
              >
                <i
                  className="d-block d-xl-none text-primary toggle-icon font-medium-4"
                  data-feather="x"
                ></i>
                <i
                  className="d-none d-xl-block collapse-toggle-icon font-medium-4 text-primary"
                  data-feather="disc"
                  data-ticon="disc"
                ></i>
              </a>
            </li>
          </ul>
        </div>
        <div className="shadow-bottom"></div>
        <div className="main-menu-content mt-2">
          <ul
            className="navigation navigation-main"
            id="main-menu-navigation"
            data-menu="menu-navigation"
          >
            <li className={activeLink === "dashboard" ? "active" : "undefined"}>
              <NavLink
                className="d-flex align-items-center"
                onClick={() => setActive("dashboard")}
                to="/admin-dashboard"
              >
                <i data-feather="home"></i>
                <span
                  className="menu-title text-truncate"
                  data-i18n="Dashboards"
                >
                  Dashboard
                </span>
              </NavLink>
            </li>

            <li className={activeLink === "interns" ? "active" : "undefined"}>
              <a className="d-flex align-items-center" href="#" type="button">
                <i data-feather="users"></i>
                <span className="menu-title text-truncate" data-i18n="interns">
                  All Interns
                </span>
              </a>
              <ul className="menu-content">
                <li
                  className={
                    activeLink === "interview" ? "active" : "undefined"
                  }
                >
                  <NavLink
                    className="d-flex align-items-center"
                    onClick={() => setActive("interview")}
                    to="/int-interview"
                  >
                    <i data-feather="briefcase"></i>
                    <span className="menu-item" data-i18n="List">
                      Interview
                    </span>
                  </NavLink>
                </li>
                <li
                  className={activeLink === "contact" ? "active" : "undefined"}
                >
                  <NavLink
                    className="d-flex align-items-center"
                    onClick={() => setActive("contact")}
                    to="/int-contact"
                  >
                    <i data-feather="phone"></i>
                    <span className="menu-item" data-i18n="Preview">
                      Contact
                    </span>
                  </NavLink>
                </li>
                <li className={activeLink === "test" ? "active" : "undefined"}>
                  <NavLink
                    className="d-flex align-items-center"
                    onClick={() => setActive("test")}
                    to={"/int-test"}
                  >
                    <i data-feather="activity"></i>
                    <span className="menu-item" data-i18n="Edit">
                      Test
                    </span>
                  </NavLink>
                </li>
                <li
                  className={
                    activeLink === "completed" ? "active" : "undefined"
                  }
                >
                  <NavLink
                    className="d-flex align-items-center"
                    onClick={() => setActive("completed")}
                    to={"/int-completed"}
                  >
                    <i data-feather="check-square"></i>
                    <span className="menu-item" data-i18n="Add">
                      Completed
                    </span>
                  </NavLink>
                </li>

                <li
                  className={
                    activeLink === "activeInt" ? "active" : "undefined"
                  }
                >
                  <NavLink
                    className="d-flex align-items-center"
                    onClick={() => setActive("activeInt")}
                    to={"/int-active"}
                  >
                    <i data-feather="user-check"></i>
                    <span className="menu-item" data-i18n="Add">
                      Active
                    </span>
                  </NavLink>
                </li>
              </ul>
            </li>

            <li
              className={
                activeLink === "internsAccount" ? "active" : "undefined"
              }
            >
              <NavLink
                className="d-flex align-items-center"
                onClick={() => setActive("internsAccount")}
                id={"2"}
                to="/intern-accounts"
              >
                <i data-feather="user-check"></i>
                <span className="menu-item" data-i18n="eCommerce">
                  Intern Accounts
                </span>
              </NavLink>
            </li>

            <li className={activeLink === "projects" ? "active" : "undefined"}>
              <NavLink
                className="d-flex align-items-center"
                onClick={() => setActive("remote")}
                id={"3"}
                to="/intern-projects"
              >
                <i data-feather="grid"></i>
                <span className="menu-item" data-i18n="eCommerce">
                  Interns Projects
                </span>
              </NavLink>
            </li>

            <li
              className={activeLink === "projectTasks" ? "active" : "undefined"}
            >
              <NavLink
                className="d-flex align-items-center"
                onClick={() => setActive("projectTasks")}
                id={"3"}
                to="/int-project-tasks"
              >
                <i data-feather="check-circle"></i>
                <span className="menu-item" data-i18n="eCommerce">
                  Project Tasks
                </span>
              </NavLink>
            </li>

            <li className={activeLink === "tasks" ? "active" : "undefined"}>
              <NavLink
                className="d-flex align-items-center"
                onClick={() => setActive("projects")}
                id={"3"}
                to="/intern-task"
              >
                <i data-feather="check-square"></i>
                <span className="menu-item" data-i18n="eCommerce">
                  Intern Tasks
                </span>
              </NavLink>
            </li>

            <li className={activeLink === "invoice" ? "active " : "undefined"}>
              <NavLink
                className="d-flex align-items-center"
                onClick={() => setActive("invoice")}
                to={"/invoice"}
              >
                <i data-feather="file-text"></i>
                <span className="menu-title text-truncate" data-i18n="User">
                  Invoice
                </span>
              </NavLink>
            </li>

            <li className={activeLink === "leave" ? "active" : "undefined"}>
              <NavLink
                className="d-flex align-items-center"
                onClick={() => setActive("leave")}
                id={"3"}
                to="/leave"
              >
                <i data-feather="calendar"></i>
                <span className="menu-item" data-i18n="eCommerce">
                  Leave
                </span>
              </NavLink>
            </li>

            <li className={activeLink === "accounts" ? "active " : "undefined"}>
              <NavLink
                className="d-flex align-items-center"
                onClick={() => setActive("balance")}
                to={"/accounts"}
              >
                <FiDollarSign />
                {/* <i data-feather='credit-card'></i> */}
                <span className="menu-title text-truncate" data-i18n="User">
                  Accounts
                </span>
              </NavLink>
            </li>

            <li className={activeLink === "withdraw" ? "active " : "undefined"}>
              <NavLink
                className="d-flex align-items-center"
                onClick={() => setActive("invoice")}
                to={"/withdraw"}
              >
                <i data-feather="credit-card"></i>
                <span className="menu-title text-truncate" data-i18n="User">
                  Withdraw
                </span>
              </NavLink>
            </li>

            <li className={activeLink === "manager" ? "active " : "undefined"}>
              <NavLink
                className="d-flex align-items-center"
                onClick={() => setActive("invoice")}
                to={"/manager"}
              >
                <i data-feather="user"></i>
                <span className="menu-title text-truncate" data-i18n="User">
                  Managers
                </span>
              </NavLink>
            </li>

            <li
              className={activeLink === "supervisor" ? "active " : "undefined"}
            >
              <NavLink
                className="d-flex align-items-center"
                onClick={() => setActive("invoice")}
                to={"/supervisor"}
              >
                <i data-feather="user-plus"></i>
                <span className="menu-title text-truncate" data-i18n="User">
                  Supervisor
                </span>
              </NavLink>
            </li>

            <li
              className={
                activeLink === "knowledgebase" ? "active " : "undefined"
              }
            >
              <NavLink
                className="d-flex align-items-center"
                onClick={() => setActive("invoice")}
                to={"/Knowledgebase"}
              >
                <i data-feather="globe"></i>
                <span className="menu-title text-truncate" data-i18n="User">
                  Knowledge Base
                </span>
              </NavLink>
            </li>

            <li
              className={activeLink === "technology" ? "active " : "undefined"}
            >
              <NavLink
                className="d-flex align-items-center"
                onClick={() => setActive("invoice")}
                to={"/technology"}
              >
                <i data-feather="code"></i>
                <span className="menu-title text-truncate" data-i18n="User">
                  Technology
                </span>
              </NavLink>
            </li>

            <li
              className={activeLink === "university" ? "active " : "undefined"}
            >
              <NavLink
                className="d-flex align-items-center"
                onClick={() => setActive("invoice")}
                to={"/university"}
              >
                <i data-feather="layers"></i>
                <span className="menu-title text-truncate" data-i18n="User">
                  University
                </span>
              </NavLink>
            </li>

            {/* <li className={activeLink === "affiliates" ? "active " : "undefined"}>
              <NavLink
                className="d-flex align-items-center"
                onClick={() => setActive("invoice")}
                to={"/affiliates"}
              >
                <i data-feather="user-plus"></i>
                <span className="menu-title text-truncate" data-i18n="User">
                  Affiliates
                </span>
              </NavLink>
            </li> */}
            {/* 
            <li className={activeLink === "invoice" ? "active " : "undefined"}>
              <NavLink
                className="d-flex align-items-center"
                onClick={() => setActive("invoice")}
                to={"/invoice"}
              >
                <i data-feather="file-text"></i>
                <span className="menu-title text-truncate" data-i18n="User">
                  Shop
                </span>
              </NavLink>
            </li>

            <li className={activeLink === "invoice" ? "active " : "undefined"}>
              <NavLink
                className="d-flex align-items-center"
                onClick={() => setActive("invoice")}
                to={"/invoice"}
              >
                <i data-feather="file-text"></i>
                <span className="menu-title text-truncate" data-i18n="User">
                  Purchase
                </span>
              </NavLink>
            </li> */}

            <li className={activeLink === "setting" ? "active " : "undefined"}>
              <NavLink
                className="d-flex align-items-center"
                onClick={() => setActive("invoice")}
                to={"/setting"}
              >
                <i data-feather="settings"></i>
                <span className="menu-title text-truncate" data-i18n="User">
                  Setting
                </span>
              </NavLink>
            </li>

            <li className={activeLink === "feedback" ? "active " : "undefined"}>
              <NavLink
                className="d-flex align-items-center"
                onClick={() => setActive("invoice")}
                to={"/feedback"}
              >
                <i data-feather="folder-plus"></i>
                <span className="menu-title text-truncate" data-i18n="User">
                  Feedback
                </span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
