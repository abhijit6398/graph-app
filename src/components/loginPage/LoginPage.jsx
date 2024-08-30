import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./loginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("This Value is required."),
      password: Yup.string().min(6, "Password must be at least 6 characters").required("This Value is required."),
    }),
    onSubmit: (values) => {
      navigate("/main");
    },
  });

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={formik.handleSubmit} className="login-form">
        <div className="input-field">
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            className={`login-input ${formik.touched.email && formik.errors.email ? 'input-error' : ''}`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          <div className="error-message">
            {formik.touched.email && formik.errors.email ? formik.errors.email : " "}
          </div>
        </div>
        <div className="input-field">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className={`login-input ${formik.touched.password && formik.errors.password ? 'input-error' : ''}`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          <div className="error-message">
            {formik.touched.password && formik.errors.password ? formik.errors.password : " "}
          </div>
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
