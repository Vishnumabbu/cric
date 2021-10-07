import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import { useHistory } from "react-router-dom";

import "./LoginPage.css";
import { loginUser, logoutUser } from "../../../Actions/actions";
import { Button } from 'antd';

function LoginPage(props) {
  const store = useSelector((state) => state);

  console.log(store);

  let history = useHistory();

  const dispatch = useDispatch();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email fomat").required("*Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("*Password is required"),
  });

  const onSubmit = (values, submitProps) => {
    console.log("Form data", values);
    // submitProps.resetForm()

    dispatch(loginUser(values)).then((res) => {
      if (res.payload.data.loginSuccess === true) {
        console.log(res);
        history.push("/");
      } else {
        alert("Check your email or password again");
      }
    });
  };

  return (
    <div className="App-header">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
          return (
            <Form className="">
              <h3 style={{ color: "Black" }}>Login</h3>
              <div className="form-control row">
                <label style={{ color: "white" }} htmlFor="email">
                  email
                </label>
                <br />
                <Field type="email" id="email" name="email"></Field>
                <ErrorMessage name="email">
                  {(error) => (
                    <div style={{ color: "red", fontSize: "12px" }}>
                      {error}
                    </div>
                  )}
                </ErrorMessage>
              </div>

              <div className="form-control row">
                <label style={{ color: "white" }} htmlFor="password">
                  password
                </label>
                <br />
                <Field type="password" id="password " name="password"></Field>
                <ErrorMessage name="password">
                  {(error) => (
                    <div style={{ color: "red", fontSize: "12px" }}>
                      {error}
                    </div>
                  )}
                </ErrorMessage>
              </div>

              <div className="form-control row">
                <button type="submit" disabled={!formik.isValid}>
                  Login
                </button>
                {/* <Button type="submit" disabled={!formik.isValid}>Login</Button> */}
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default LoginPage;