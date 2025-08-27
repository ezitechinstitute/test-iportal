import React from "react";
import { useNavigate } from "react-router-dom";

export const ManagerTopbar = () => {
  const navigate = useNavigate();
  const username = sessionStorage.getItem("username");
  const role = sessionStorage.getItem("role");

  const LoggedOut = () => {
    sessionStorage.clear();
    alert("Loggedout Successfully");
    navigate("/");
  };

  return (
    <>
      {/* BEGIN: Header */}
      <nav className="header-navbar navbar navbar-expand-lg align-items-center floating-nav navbar-light navbar-shadow">
        <div className="navbar-container d-flex content">
          <div className="bookmark-wrapper d-flex align-items-center">
            <ul className="nav navbar-nav d-xl-none">
              <li className="nav-item">
                <a className="nav-link menu-toggle" href="javascript:void(0);">
                  <i className="ficon" data-feather="menu"></i>
                </a>
              </li>
            </ul>
          </div>
          <ul className="nav navbar-nav align-items-center ml-auto">
            <li className="nav-item dropdown dropdown-notification mr-25">
              <a
                className="nav-link"
                href="javascript:void(0);"
                data-toggle="dropdown"
              >
                <i className="ficon" data-feather="bell"></i>
                <span className="badge badge-pill badge-danger badge-up">
                  5
                </span>
              </a>
            </li>

            <li className="nav-item dropdown dropdown-user">
              <a
                className="nav-link dropdown-toggle dropdown-user-link"
                id="dropdown-user"
                href="javascript:void(0);"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <div className="user-nav d-sm-flex d-none">
                  <span className="user-name font-weight-bolder">
                    {username}
                  </span>
                  <span className="user-status">{role}</span>
                </div>
                <span className="avatar">
                  <img
                    className="round"
                    src="./app-assets/images/portrait/small/avatar-s-11.jpg"
                    alt="avatar"
                    height="40"
                    width="40"
                  />
                  <span className="avatar-status-online"></span>
                </span>
              </a>
              <div
                className="dropdown-menu dropdown-menu-right"
                aria-labelledby="dropdown-user"
              >
                <a className="dropdown-item" href="#">
                  <i className="mr-50" data-feather="user"></i> Profile
                </a>
                {/* <a className="dropdown-item" href="app-email.html">
                  <i className="mr-50" data-feather="mail"></i> Inbox
                </a>
                <a className="dropdown-item" href="app-todo.html">
                  <i className="mr-50" data-feather="check-square"></i> Task
                </a>
                <a className="dropdown-item" href="app-chat.html">
                  <i className="mr-50" data-feather="message-square"></i> Chats
                </a> */}
                {/* <div className="dropdown-divider"></div> */}
                <a className="dropdown-item" href="#">
                  <i data-feather="code"></i> Technology
                </a>
                {/* <a className="dropdown-item" href="page-pricing.html">
                  <i className="mr-50" data-feather="credit-card"></i> Pricing
                </a>
                <a className="dropdown-item" href="page-faq.html">
                  <i className="mr-50" data-feather="help-circle"></i> FAQ
                </a> */}
                <a
                  className="dropdown-item"
                  type="button"
                  href="#"
                  onClick={LoggedOut}
                >
                  <i className="mr-50" data-feather="power"></i> Logout
                </a>
              </div>
            </li>
          </ul>
        </div>
      </nav>
      {/* <ul className="main-search-list-defaultlist d-none">
        <li className="d-flex align-items-center">
          <a href="javascript:void(0);">
            <h6 className="section-label mt-75 mb-0">Files</h6>
          </a>
        </li>
        <li className="auto-suggestion">
          <a
            className="d-flex align-items-center justify-content-between w-100"
            href="app-file-manager.html"
          >
            <div className="d-flex">
              <div className="mr-75">
                <img
                  src="./app-assets/images/icons/xls.png"
                  alt="png"
                  height="32"
                />
              </div>
              <div className="search-data">
                <p className="search-data-title mb-0">Two new item submitted</p>
                <small className="text-muted">Marketing Manager</small>
              </div>
            </div>
            <small className="search-data-size mr-50 text-muted">
              &apos;17kb
            </small>
          </a>
        </li>
        <li className="auto-suggestion">
          <a
            className="d-flex align-items-center justify-content-between w-100"
            href="app-file-manager.html"
          >
            <div className="d-flex">
              <div className="mr-75">
                <img
                  src="./app-assets/images/icons/jpg.png"
                  alt="png"
                  height="32"
                />
              </div>
              <div className="search-data">
                <p className="search-data-title mb-0">52 JPG file Generated</p>
                <small className="text-muted">FontEnd Developer</small>
              </div>
            </div>
            <small className="search-data-size mr-50 text-muted">
              &apos;11kb
            </small>
          </a>
        </li>
        <li className="auto-suggestion">
          <a
            className="d-flex align-items-center justify-content-between w-100"
            href="app-file-manager.html"
          >
            <div className="d-flex">
              <div className="mr-75">
                <img
                  src="./app-assets/images/icons/pdf.png"
                  alt="png"
                  height="32"
                />
              </div>
              <div className="search-data">
                <p className="search-data-title mb-0">25 PDF File Uploaded</p>
                <small className="text-muted">Digital Marketing Manager</small>
              </div>
            </div>
            <small className="search-data-size mr-50 text-muted">
              &apos;150kb
            </small>
          </a>
        </li>
        <li className="auto-suggestion">
          <a
            className="d-flex align-items-center justify-content-between w-100"
            href="app-file-manager.html"
          >
            <div className="d-flex">
              <div className="mr-75">
                <img
                  src="./app-assets/images/icons/doc.png"
                  alt="png"
                  height="32"
                />
              </div>
              <div className="search-data">
                <p className="search-data-title mb-0">Anna_Strong.doc</p>
                <small className="text-muted">Web Designer</small>
              </div>
            </div>
            <small className="search-data-size mr-50 text-muted">
              &apos;256kb
            </small>
          </a>
        </li>
        <li className="d-flex align-items-center">
          <a href="javascript:void(0);">
            <h6 className="section-label mt-75 mb-0">Members</h6>
          </a>
        </li>
        <li className="auto-suggestion">
          <a
            className="d-flex align-items-center justify-content-between py-50 w-100"
            href="app-user-view.html"
          >
            <div className="d-flex align-items-center">
              <div className="avatar mr-75">
                <img
                  src="./app-assets/images/portrait/small/avatar-s-8.jpg"
                  alt="png"
                  height="32"
                />
              </div>
              <div className="search-data">
                <p className="search-data-title mb-0">John Doe</p>
                <small className="text-muted">UI designer</small>
              </div>
            </div>
          </a>
        </li>
        <li className="auto-suggestion">
          <a
            className="d-flex align-items-center justify-content-between py-50 w-100"
            href="app-user-view.html"
          >
            <div className="d-flex align-items-center">
              <div className="avatar mr-75">
                <img
                  src="./app-assets/images/portrait/small/avatar-s-1.jpg"
                  alt="png"
                  height="32"
                />
              </div>
              <div className="search-data">
                <p className="search-data-title mb-0">Michal Clark</p>
                <small className="text-muted">FontEnd Developer</small>
              </div>
            </div>
          </a>
        </li>
        <li className="auto-suggestion">
          <a
            className="d-flex align-items-center justify-content-between py-50 w-100"
            href="app-user-view.html"
          >
            <div className="d-flex align-items-center">
              <div className="avatar mr-75">
                <img
                  src="./app-assets/images/portrait/small/avatar-s-14.jpg"
                  alt="png"
                  height="32"
                />
              </div>
              <div className="search-data">
                <p className="search-data-title mb-0">Milena Gibson</p>
                <small className="text-muted">Digital Marketing Manager</small>
              </div>
            </div>
          </a>
        </li>
        <li className="auto-suggestion">
          <a
            className="d-flex align-items-center justify-content-between py-50 w-100"
            href="app-user-view.html"
          >
            <div className="d-flex align-items-center">
              <div className="avatar mr-75">
                <img
                  src="./app-assets/images/portrait/small/avatar-s-6.jpg"
                  alt="png"
                  height="32"
                />
              </div>
              <div className="search-data">
                <p className="search-data-title mb-0">Anna Strong</p>
                <small className="text-muted">Web Designer</small>
              </div>
            </div>
          </a>
        </li>
      </ul> */}
      <ul className="main-search-list-defaultlist-other-list d-none">
        <li className="auto-suggestion justify-content-between">
          <a className="d-flex align-items-center justify-content-between w-100 py-50">
            <div className="d-flex justify-content-start">
              <span className="mr-75" data-feather="alert-circle"></span>
              <span>No results found.</span>
            </div>
          </a>
        </li>
      </ul>
      {/* End Header */}
    </>
  );
};
