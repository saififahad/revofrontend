import { useEffect, useState } from "react";
import { cross } from "../../assets/website/index";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import OTP from "./OTP";
import "../Styles/Register.css";
import { postData } from "../../api/ClientFunction";
import { toast } from "react-toastify";
import { validateEmail } from "./../../api/ClientFunction";
import Login from "./Login";
import { useLocation } from "react-router-dom";
// Validation schema using Yup
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
// // Validation schema using Yup
const validationSchema = Yup.object().shape({
  Name: Yup.string()
    .matches(/^[a-zA-Z0-9 ]*$/, "Name must be alphanumeric")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  number: Yup.string().required("Phone number is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required"),
  // otp: Yup.string().required("OTP is required"),
  referral: Yup.string(), // Optional field, no validation
  acceptRisk: Yup.boolean().oneOf(
    [true],
    "You must accept this condition to continue"
  ),
});

const Register = ({ onClose, showLogin = false, handleLoginClick = null }) => {
  let query = useQuery();
  // const [code, setCode] = useState("");
  // useEffect(() => {
  //   setCode(query.get("code"));
  // }, []);
  const [code, setCode] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const referralCode = query.get("code") || "";
    setCode(referralCode);
    setReady(true);
  }, []);

  // const initialValues = {
  //   Name: "",
  //   email: "",
  //   number: "",
  //   password: "",
  // otp: "",
  //   referral: "",
  // };

  // const [otpSent, setOtpSent] = useState(false);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    // if (!code) {
    //   return toast.warning("Referral Code Is Required");
    // }
    const data = {
      // otp: values.otp,
      pwd: values.password,
      invitecode: values.referral,
      email: values.email,
      phone: values.number,
      name: values.Name,
      acceptRisk: values.acceptRisk,
    };
    // console.log(data);
    const res = await postData("/auth/register", data);
    if (res.status || res.success) {
      setSubmitting(false);
      resetForm();
      toast.success("Registration Successful! Please log in.");
      onClose();
    }
  };

  // const handleSendOtp = async (email) => {
  //   if (!validateEmail(email)) {
  //     return toast.warning("Invalid email, Please Enter Valid Email");
  //   }
  //   if (email) {
  //     const url = `/auth/otp/verify`;
  //     const res = await postData(url, { email: email });
  //     if (res.status || res.success) {
  //       toast.success(res.message);
  //       setOtpSent(true);
  //     }
  //   }
  // };

  // const handleTimerComplete = () => {
  //   setOtpSent(false);
  // };

  if (!ready) return null; // or a loader

  return (
    <Formik
      initialValues={{
        Name: "",
        email: "",
        number: "",
        password: "",
        referral: code,
        acceptRisk: false,
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, values }) => (
        <div className="Register-container">
          <div className="register-child">
            <div className="register-cross-part">
              <img src={cross} alt="Close" onClick={onClose} />
            </div>
            <div className="register-content">
              <div className="register-form-part">
                <h3>Join The Waitlist</h3>
                <h1>Sign Up & Join The Waitlist</h1>
                <Form className="register-form-fields">
                  <div className="register-form-group">
                    <Field
                      type="text"
                      name="Name"
                      placeholder="Your Name"
                      className="register-form-control"
                    />
                    <ErrorMessage
                      name="Name"
                      component="div"
                      className="error-message"
                    />
                  </div>
                  <div className="register-form-group send-otp">
                    <Field
                      type="email"
                      name="email"
                      placeholder="Your Email address"
                      className="register-form-control"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="error-message"
                    />
                    {/* {otpSent ? (
                      <OTP onTimerComplete={handleTimerComplete} />
                    ) : (
                      <button
                        type="button"
                        className="send-otp-btn"
                        onClick={() => handleSendOtp(values?.email)}
                      >
                        Send OTP
                      </button>
                    )} */}
                  </div>
                  <div className="register-form-group">
                    <Field
                      type="number"
                      name="number"
                      placeholder="Your Phone Number"
                      className="register-form-control no-spinner"
                    />
                    <ErrorMessage
                      name="number"
                      component="div"
                      className="error-message"
                    />
                  </div>
                  <div className="register-form-group">
                    <Field
                      type="password"
                      name="password"
                      placeholder="Password"
                      className="register-form-control"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="error-message"
                    />
                  </div>
                  {/* <div className="register-form-group otp-group">
                    <Field
                      type="text"
                      name="otp"
                      placeholder="OTP"
                      className="register-form-control otp-field"
                    />
                    <ErrorMessage
                      name="otp"
                      component="div"
                      className="error-message"
                    />
                  </div> */}
                  <div className="register-form-group">
                    <Field
                      // type="text"
                      // name="referral"
                      // value={code}
                      // onChange={(e) => {
                      //   setCode(e.target.value);
                      // }}
                      // placeholder="Enter Referral Code"
                      // className="register-form-control"
                      type="text"
                      name="referral"
                      placeholder="Enter Referral Code"
                      className="register-form-control"
                    />
                  </div>
                  <div className="register-form-group checkbox-group">
                    <label className="checkbox-container">
                      <Field
                        type="checkbox"
                        name="acceptRisk"
                        className="styled-checkbox"
                      />
                      <span className="custom-checkmark"></span>
                      <span className="checkbox-text">
                        I understand that if I forget my password, I will
                        permanently lose access to my account. No OTPs or
                        recovery options are available.
                      </span>
                    </label>
                    <ErrorMessage
                      name="acceptRisk"
                      component="div"
                      className="error-message"
                    />
                  </div>

                  <div
                    className="login forgot-password"
                    onClick={handleLoginClick}
                  >
                    <div className="already-have-account">
                      Already a user? <span>Sign In</span>
                    </div>
                  </div>
                  {showLogin && <Login onClose={onClose} />}
                  <div className="register-button">
                    <button
                      type="submit"
                      className="register-btn"
                      disabled={isSubmitting}
                    >
                      Submit
                    </button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default Register;
