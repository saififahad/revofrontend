import React from "react";
import { cross } from "../../assets/website/index"; // Correct path to the image
import "./Styles/Register.css";

const RegisterDone = () => {
  return (
    <div className="Register-container">
      <div className="register-child">
        <div className="cross-part">
          <img src={cross} alt="Close" />
        </div>
        <div className="register-content">
          <div className="login-part">
            <h3>Join The Waitlist</h3>
            <h1>Sign Up & Join The Waitlist</h1>
            <h4 className="registerDone-content">
              You have successfully joined the waitlist, you’ll be notified when
              it’s live...
            </h4>
            <div className="register-button">
              <button type="submit" className="register-btn">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterDone;
