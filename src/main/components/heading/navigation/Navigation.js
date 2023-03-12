import React, { useState } from "react";
import pic from "./logo.png";
import { Link } from "react-router-dom";

function Navigation(props) {
  const logInstatus = props.logInstatus;
  return (
    <React.Fragment>
      {
        !logInstatus ? (
          <nav className="nav">
            <img
              src={pic}
              alt="Bankist logo"
              className="nav__logo"
              id="logo"
              designer="Jonas"
              data-version-number="3.0"
            />
            <ul className="nav__links">
              <li className="nav__item">
                {/* <a className="nav__link" href="#section--2">
            Operations
          </a> */}
                <Link to="/login" className="nav__link">
                  Login
                </Link>
              </li>
              <li className="nav__item">
                {/* <a className="nav__link" href="#section--3">
            Testimonials
          </a> */}
                <Link to="/" className="nav__link ">
                  Main page
                </Link>
              </li>
              <li className="nav__item open_account">
                {/* <a className="nav__link nav__link--btn btn--show-modal " href="#">
            Open account
          </a> */}
                <Link
                  to="registration"
                  className="nav__link nav__link--btn btn--show-modal"
                >
                  Open account
                </Link>
              </li>
            </ul>
          </nav>
        ) : (
          // if is logged in : start
          <nav className="nav">
            <img
              src={pic}
              alt="Bankist logo"
              className="nav__logo"
              id="logo"
              designer="Jonas"
              data-version-number="3.0"
            />
            <ul className="nav__links">
              <li className="nav__item">
                {/* <a className="nav__link" href="#section--1">
      Features
    </a> */}
                <Link to="/courses/new" className="nav__link">
                  Creat a course!
                </Link>
              </li>
              <li className="nav__item">
                <Link
                  to={`/courses/user/${props.userId}`}
                  className="nav__link"
                >
                  My Courses
                </Link>
              </li>
              <li className="nav__item nav__link">Welcome</li>
              <li className="nav__item">
                {/* <a className="nav__link" href="#section--3">
      Testimonials
    </a> */}
                <Link to="/" className="nav__link ">
                  Main page
                </Link>
              </li>
              <li className="nav__item">
                {/* <a className="nav__link" href="#section--1">
            Features
          </a> */}
                <button
                  className="nav__link"
                  onClick={props.logOutStatusHandler}
                >
                  Log out{" "}
                </button>
              </li>
            </ul>
          </nav>
        )
        // if is logged in : finish
      }
    </React.Fragment>
  );
}

export default Navigation;
