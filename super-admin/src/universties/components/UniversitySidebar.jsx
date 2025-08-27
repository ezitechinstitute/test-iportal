import React, { useState } from "react";
import { FiDollarSign } from "react-icons/fi";
import { Link, NavLink } from "react-router-dom";

export const UniversitySidebar = () => {
  const [activeLink, setActive] = useState("");
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
                to="/university-dashboard"
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

            <li className={activeLink === "Interns" ? "active " : "undefined"}>
              <NavLink
                className="d-flex align-items-center"
                onClick={() => setActive("Interns")}
                to={"/university-interns"}
              >
                <i data-feather="users"></i>
                <span className="menu-title text-truncate" data-i18n="User">
                  Interns
                </span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
