import React from "react";
import pic1 from "./img/digital-lazy.jpg";
import pic2 from "./img/grow-lazy.jpg";
import pic3 from "./img/card-lazy.jpg";
import "./Features.css";

function Features() {
  return (
    <section className="bg-dark-subtle text-dark py-5 " id="section--1">
      <div className="container text-center   ">
        <h2 className="fs-4 text-success">Features</h2>
        <h3 className="fs-2">
          Great features you can use to learn English in a modern way.
        </h3>
      </div>

      <div className="container ">
        {/*  */}
        <div className="row align-items-center justify-content-between">
          <div className="col-lg-5 d-none d-lg-block">
            <img
              src={pic1}
              data-src="img/digital.jpg"
              alt="Computer"
              // className="features__img lazy-img"
              className="w-100"
            />
          </div>
          <div className="col-lg-5">
            <h5>100% digital bank</h5>
            <p className="w-75">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
              alias sint quos? Accusantium a fugiat porro reiciendis saepe
              quibusdam debitis ducimus.
            </p>
          </div>
        </div>
        {/* /////////////// */}
        <div className="row align-items-center justify-content-between">
          <div className="col-lg-5">
            <h5>Watch your money grow</h5>
            <p className="w-75">
              Nesciunt quos autem dolorum voluptates cum dolores dicta fuga
              inventore ab? Nulla incidunt eius numquam sequi iste pariatur
              quibusdam!
            </p>
          </div>
          <div className="col-lg-5 d-none d-lg-block ">
            <img
              src={pic2}
              data-src="img/grow.jpg"
              alt="Computer"
              // className="features__img lazy-img"
              className="w-100"
            />
          </div>
        </div>
        {/*  */}
        <div className="row align-items-center justify-content-between">
          <div className="col-lg-5 d-none d-lg-block">
            <img
              src={pic3}
              data-src="img/digital.jpg"
              alt="Computer"
              // className="features__img lazy-img"
              className="w-100"
            />
          </div>
          <div className="col-lg-5">
            <h5>Free debit card included</h5>
            <p className="w-75">
              Quasi, fugit in cumque cupiditate reprehenderit debitis animi enim
              eveniet consequatur odit quam quos possimus assumenda dicta fuga
              inventore ab.
            </p>
          </div>
        </div>
        {/* /////////////// */}
      </div>
    </section>
  );
}

export default Features;
