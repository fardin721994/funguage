import React from "react";
import pic from "./icon.png";

function Footer() {
  return (
    <footer className=" bg-dark text-white py-4">
      <ul className=" list-group list-group-horizontal bg-dark justify-content-evenly">
        <li className="list-group-item-dark  " style={{ listStyle: "none" }}>
          <a className="text-decoration-none text-white " href="#">
            About
          </a>
        </li>
        <li className="list-group-item-dark " style={{ listStyle: "none" }}>
          <a className="text-decoration-none text-white" href="#">
            Pricing
          </a>
        </li>
        <li className="list-group-item-dark " style={{ listStyle: "none" }}>
          <a className="text-decoration-none text-white" href="#">
            Terms of Use
          </a>
        </li>
        <li className="list-group-item-dark " style={{ listStyle: "none" }}>
          <a className="text-decoration-none text-white" href="#">
            Privacy Policy
          </a>
        </li>
        <li className="list-group-item-dark " style={{ listStyle: "none" }}>
          <a className="text-decoration-none text-white" href="#">
            Careers
          </a>
        </li>
        <li className="list-group-item-dark " style={{ listStyle: "none" }}>
          <a className="text-decoration-none text-white" href="#">
            Blog
          </a>
        </li>
        <li className="list-group-item-dark " style={{ listStyle: "none" }}>
          <a className="text-decoration-none text-white" href="#">
            Contact Us
          </a>
        </li>
      </ul>
      <img src={pic} alt="Logo" className=" d-block mx-auto py-5" />
      <p className="text-center">
        &copy; Copyright by
        <a
          className="text-decoration-none text-white twitter-link"
          target="_blank"
          href="https://twitter.com/jonasschmedtman"
        >
          Jonas Schmedtmann
        </a>
        . Use for learning or your portfolio. Don't use to teach. Don't claim as
        your own product.
      </p>
    </footer>
  );
}

export default Footer;
