import React from "react";
import { useHistory } from "react-router-dom";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import Input from "./Input";
import ErrorModal from "../../../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../../../shared/hooks/http-hook";
import "./auth.css";

function LoginForm(props) {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string().required("Required"),
  });
  const history = useHistory();
  const onSubmit = async (values) => {
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
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
          return (
            <Form className="authform">
              <Input type="email" label="Email" name="email" />
              <Input type="password" label="Password" name="password" />
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

export default LoginForm;
