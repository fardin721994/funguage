import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { Link } from "react-router-dom";
import pic from "./logo.png";
import "./NavBar.css";

function NavBar(props) {
  const logInstatus = props.logInstatus;
  return (
    <React.Fragment>
      {
        !logInstatus ? (
          <nav
            className="navbar navbar-expand-lg fs-5 fw-semibold "
            style={{ backgroundColor: "#282729" }}
          >
            <div className="container-fluid">
              <a className="navbar-brand" href="#">
                <img src={pic} alt="Bootstrap" width="80" />
              </a>
              <button
                className="navbar-toggler bg-warning"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse "
                id="navbarSupportedContent"
                style={{ justifyContent: "space-between" }}
              >
                {/* /////// links at the left side of the navbar */}
                <ul className="navbar-nav  mb-2 mb-lg-0  ">
                  <li className="nav-item nav__item ">
                    <Link
                      to="/"
                      className="nav-link active  "
                      aria-current="page"
                    >
                      Home
                    </Link>
                  </li>
                  <li className="nav-item nav__item">
                    <Link to="/login" className="nav-link">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item nav__item">
                    <Link to="registration" className="nav-link ">
                      Open account
                    </Link>
                  </li>
                  <li className="nav-item nav__item">
                    <Link to="/courses/all" className="nav-link ">
                      Courses
                    </Link>
                  </li>
                </ul>
                {/* /////// links at the RIGHT side of the navbar */}

                <ul className="navbar-nav  mb-2 mb-lg-0  ">
                  <li className="nav-item nav__item ">
                    <Link
                      to="/"
                      className="nav-link active  "
                      aria-current="page"
                    >
                      Home
                    </Link>
                  </li>
                  <li className="nav-item nav__item">
                    <Link to="/login" className="nav-link">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item nav__item">
                    <Link to="/registration" className="nav-link ">
                      Open account
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        ) : (
          // if is logged in : start
          <nav className="navbar navbar-expand-lg bg-body-tertiary fs-5 fw-semibold ">
            <div className="container-fluid">
              <a className="navbar-brand" href="#">
                <img src={pic} alt="Bootstrap" width="80" />
              </a>
              <button
                className="navbar-toggler bg-warning"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item nav__item">
                    <Link
                      to="/"
                      className="nav-link active me-auto"
                      aria-current="page"
                    >
                      Home
                    </Link>
                  </li>
                  <li className="nav-item nav__item">
                    <Link to="/courses/new" className="nav-link">
                      Creat a course!
                    </Link>
                  </li>
                  <li className="nav-item nav__item">
                    <Link
                      to={`/courses/user/${props.userId}`}
                      className="nav-link"
                    >
                      My Courses
                    </Link>
                  </li>
                  <li className="nav-item nav__item">
                    <button
                      className="nav-link"
                      onClick={props.logOutStatusHandler}
                    >
                      Log out
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        )
        // if is logged in : finish
      }
    </React.Fragment>
  );
}
export default NavBar;
