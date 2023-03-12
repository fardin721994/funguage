import React from "react";
import pic from "./hero.png";
import { Link } from "react-router-dom";
import "./HeaderTitle.css";
function HeaderTitle() {
  return (
    <div
      className="container text-center mt-1 mb-5 py-5 "
      // style={{ marginBottom: 7rem; }}
    >
      <div className="row align-items-center">
        <div className="col-lg-6 mt-5">
          <h1>
            When
            <span className="highlight1"> learning </span>
            gets
            <br />
            <span className="highlight2">fun!</span>
          </h1>
          <h4>A simpler learning experience for a simpler life.</h4>
          <Link
            to="/tour"
            className="bg-warning text-dark fs-1 fw-semibold text-decoration-none rounded-pill py-2 px-4  mt-5 mb-5 d-inline-block  "
          >
            Take a tour for free
          </Link>
        </div>
        <div className="col-lg-6  ">
          <img
            src={pic}
            className="img-fluid mt-5"
            alt="Minimalist bank items"
          />
        </div>
      </div>
    </div>

    //   <div className="header__title">
    // <h1>
    //   When
    //   <span className="highlight"> learning </span>
    //   gets
    //   <br />
    //   <span className="highlight">fun!</span>
    // </h1>
    // <h4>A simpler learning experience for a simpler life.</h4>
    //     {/* <button className="btn btn--tour" >
    //       Take a tour for free{" "}
    //     </button> */}
    //     {/* <button className="btn--text btn--scroll-to">
    //       Learn more &DownArrow;
    //     </button> */}
    // <Link to="/tour" className="btn btn--tour">
    //   Take a tour for free{" "}
    // </Link>
    // <img src={pic} className="header__img" alt="Minimalist bank items" />
    //   </div>
  );
}

export default HeaderTitle;
