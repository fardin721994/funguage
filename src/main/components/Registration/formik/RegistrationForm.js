import React from "react";
import { useHistory } from "react-router-dom";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import Input from "./Input";
// import Navigation from "../../heading/navigation/Navigation";

import Card from "../../../../shared/components/UIElements/Card";
import Button from "../../../../shared/components/FormElements/Button";
import ErrorModal from "../../../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../../../shared/hooks/http-hook";
// import ImageUpload from "../../../../shared/components/FormElements/ImageUpload";
import "./auth.css";

function RegistrationForm(props) {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string().required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), ""], "Passwords must match")
      .required("Required"),
  });

  const history = useHistory();

  const onRegitrationSubmitHandler = async (values) => {
    try {
      const signUpResponseData = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/users/signup",
        "POST",
        JSON.stringify({
          name: values.username,
          email: values.email,
          password: values.password,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      console.log("successfully signed up");
    } catch (err) {}

    // logging in after signing up : start
    try {
      const logInResponseData = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/users/login",
        "POST",
        JSON.stringify({
          email: values.email,
          password: values.password,
        }),

        {
          "Content-Type": "application/json",
        }
      );
      props.logInStatusHandler(logInResponseData.user.id);
      console.log("successfully logged in");
      history.push("/");
    } catch (err) {}

    // logging in after signing up : finish
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onRegitrationSubmitHandler}
      >
        {(formik) => {
          return (
            <Form className="authform">
              <Input type="username" label="UserName" name="username" />
              <Input type="email" label="Email" name="email" />
              <Input type="password" label="Password" name="password" />
              <Input
                type="password"
                label="Confirm Password"
                name="confirmPassword"
              />
              {/* <ImageUpload center id="image" /> */}

              <button type="submit" disabled={!formik.isValid}>
                Submit
              </button>
            </Form>
          );
        }}
      </Formik>
    </React.Fragment>
  );
}

export default RegistrationForm;
