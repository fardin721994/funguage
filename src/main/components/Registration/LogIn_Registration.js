import React, { useState } from "react";
import "./LogIn_Registration.css";
import { Login } from "./Login";
import { Register } from "./Register";

function LogIn_Registration() {
  const [currentForm, setCurrentForm] = useState("login");

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };
  const registerHandler = (enteredUserData) => {
    const userData = { ...enteredUserData };
    console.log(userData);
  };
  return (
    <div className="LogIn_Registration">
      {currentForm === "login" ? (
        <Login onFormSwitch={toggleForm} />
      ) : (
        <Register onFormSwitch={toggleForm} onRegister={registerHandler} />
      )}
    </div>
  );
}

export default LogIn_Registration;
