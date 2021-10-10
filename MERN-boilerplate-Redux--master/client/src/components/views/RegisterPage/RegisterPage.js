import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
// import Button from "@mui/material/Button";

import "./RegisterPage.css";

import { registerUser } from "../../../Actions/actions";

function RegisterPage(props) {
  let history = useHistory();

  const dispatch = useDispatch();

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("*Required"),
    email: Yup.string().email("Invalid email fomat").required("*Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("*Password is required"),
  });

  const onSubmit = (values, submitProps) => {
    // console.log('Form data', values)
    // submitProps.resetForm()

    dispatch(registerUser(values))
      .then((res) => {
        console.log(res);
        if (res.payload.data.registerSuccess === true) {
          console.log(res);
          history.push("/");
        } else {
          alert("user with this mail id is already registered");
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div style={{ width: '75%', margin: '0rem auto',marginTop:"160px",marginBottom:30}}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
          return (
            <Form className="container">
              <h3>Register</h3>

              <div className="form-control row">
                <label style={{ color: "white" }} htmlFor="name">
                  {/* Name */}
                </label>
                <br />
                <Field placeholder="name" type="name" id="name" name="name"></Field>
                <ErrorMessage name="name">
                  {(error) => (
                    <div style={{ color: "red", fontSize: "12px" }}>
                      {error}
                    </div>
                  )}
                </ErrorMessage>
              </div>

              <div className="form-control row">
                <label style={{ color: "white" }} htmlFor="email">
                  {/* email */}
                </label>
                <br />
                <Field placeholder="email" type="email" id="email" name="email"></Field>
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
                  {/* password */}
                </label>
                <br />
                <Field placeholder="password" type="password" id="password " name="password"></Field>
                <ErrorMessage name="password">
                  {(error) => (
                    <div style={{ color: "red", fontSize: "12px" }}>
                      {error}
                    </div>
                  )}
                </ErrorMessage>
              </div>

              <div className="form-control row">
                <button style={{marginTop:'20px',marginTop:'20px',backgroundColor:'#FF5733',color:'white',borderRadius:'5px'}} type="submit" disabled={!formik.isValid}>
                  Register
                </button>
                {/* <Button>Primary</Button> */}
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default RegisterPage;
