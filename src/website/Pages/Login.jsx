import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { cross } from "../../assets/website/index";
import "../Styles/Login.css";
import { postData } from "../../api/ClientFunction";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { validateEmail } from "./../../api/ClientFunction";

const Login = ({ onClose, handleForgotPassword, handleRegisterClick }) => {
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    const data = {
      email: values.email,
      password: values.password,
    };
    if (!validateEmail(data.email)) {
      return toast.warning("Invalid email, Please Enter Valid Email");
    }
    const res = await postData("/auth/login", data);
    if (res.status || res.success) {
      localStorage.setItem("token", res.token);
      toast.success(res.message);
      setTimeout(() => {
        navigate("/");
        onClose();
      }, 1000);
      resetForm();
    }
  };

  return (
    <div className="login-Container">
      <div className="child-part">
        <div className="cross-part">
          <img src={cross} alt="" onClick={onClose} />
        </div>
        <div className="content-container">
          <div className="login-part">
            <h3>Welcome</h3>
            <h1>Login to Revo Play</h1>
            <Formik
              initialValues={{ email: "", password: "", rememberMe: false }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form className="login-form">
                <div className="form-group">
                  <Field
                    type="email"
                    name="email"
                    placeholder="Email ID"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error-message"
                  />
                </div>

                <div className="form-group">
                  <Field
                    type="password"
                    name="password"
                    placeholder="Your Password"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="error-message"
                  />
                </div>

                <div className="form-options">
                  {/* <div className="remember-me">
                    <Field type="checkbox" name="rememberMe" />
                    <label htmlFor="rememberMe">Remember Me</label>
                  </div> */}
                  {/* <div className="register-now">
                    Do not have an account?{" "}
                    <span onClick={handleRegisterClick} className="text-green">
                      Register Now
                    </span>
                  </div> */}
                  {/* <div
                    onClick={handleForgotPassword}
                    className="forgot-password"
                  >
                    Forgot Password?
                  </div> */}
                </div>
                <div className="login-btns">
                  <button type="submit" className="login-button">
                    Login
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
