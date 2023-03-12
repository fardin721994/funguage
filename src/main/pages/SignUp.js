import React from "react";
import { Link } from "react-router-dom";

function SignUp() {
  return (
    <section className=" bg-dark text-white   pb-5 text-center ">
      <div className="pt-5">
        <h3 className="section__header pt-5">
          The best day to join Bankist was one year ago. The second best is
          today!
        </h3>
      </div>
      {/* <button className="btn btn--show-modal" onClick={setSignUpState}>
        Open your free account today!
      </button> */}
      <Link
        to="/registration"
        className="bg-success text-dark fs-1 fw-semibold text-decoration-none rounded-pill py-2 px-4  mt-3 mb-5  d-inline-block"
      >
        Open your free account today!
      </Link>
    </section>
  );
}

export default SignUp;
