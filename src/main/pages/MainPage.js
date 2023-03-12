import React from "react";
import Header from "../components/heading/Header";
import Features from "../components/features/Features";
import SignUp from "./SignUp";
import Footer from "../components/footer/Footer";
function MainPage() {
  return (
    <div className="body ">
      <Header />
      <Features />
      <SignUp />
      <Footer />
    </div>
  );
}

export default MainPage;
