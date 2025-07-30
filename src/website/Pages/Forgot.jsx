import React, { useState } from "react";
import { cross } from "../../assets/website/index";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import OTP from "./OTP";
import "../Styles/Forgot.css";
import { postData } from "../../api/ClientFunction";
import { toast } from "react-toastify";

const Forgot = ({ onClose }) => {
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOtp = async (email) => {
    if (email) {
      const url = `/auth/otp/verify/reset`;
      const res = await postData(url, { email: email });
      if (res.status || res.success) {
        setOtpSent(true);
        toast.success(res.message);
      }
    }
  };

  const handleTimerComplete = () => {
    setOtpSent(false);
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    verificatioNXBTde: Yup.string().required("Verification code is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const initialValues = {
    email: "",
    verificatioNXBTde: "",
    password: "",
  };
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const email = values.email;
    const otp = values.verificatioNXBTde;
    const pwd = values.password;
    const data = {
      email,
      otp,
      pwd,
    };
    const url = `/auth/resetPassword`;
    const res = await postData(url, data);
    if (res.status || res.success) {
      toast.success(res.message);
      setSubmitting(false);
      resetForm();
      onClose();
    }
  };

  return (
    <div className="forgot-Container">
      <div className="forgot-part">
        <div className="forgot-cross-part">
          <img src={cross} alt="Close" onClick={onClose} />
        </div>
        <div className="forgot-content-container">
          <div className="forgot-heading">
            <h1>Forgot Password?</h1>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, values }) => (
              <Form className="forgot-form">
                <div className="forgot-form-group send-otp d-flex gap-2">
                  <Field
                    type="email"
                    name="email"
                    placeholder="Email Id"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error-message"
                  />
                  {otpSent ? (
                    <OTP onTimerComplete={handleTimerComplete} />
                  ) : (
                    <button
                      type="button"
                      className="send-otp-btn"
                      onClick={() => handleSendOtp(values?.email)}
                    >
                      Send OTP
                    </button>
                  )}
                </div>
                <div className="forgot-form-group">
                  <Field
                    type="text"
                    name="verificatioNXBTde"
                    placeholder="Verification Code"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="verificatioNXBTde"
                    component="div"
                    className="error-message"
                  />
                </div>
                <div className="forgot-form-group">
                  <Field
                    type="password"
                    name="password"
                    placeholder="New Password"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="error-message"
                  />
                </div>
                <div className="forgot-btn">
                  <button
                    type="submit"
                    className="forgot-button"
                    disabled={isSubmitting || !otpSent}
                  >
                    Send
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Forgot;
