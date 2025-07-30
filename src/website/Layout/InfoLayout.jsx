import { Outlet } from "react-router-dom";
import Navbar from "../LandingPage/Navbar";
import Footer from "../LandingPage/Footer";
import { useState } from "react";
import AuthNavbar from "../Component/AuthNavbar";

const InfoLayout = (props) => {
  const [check, setCheck] = useState(localStorage.getItem("token"));
  console.log(check);
  return (
    <div>
      {check ? (
        <AuthNavbar />
      ) : (
        <Navbar
          showRegister={props.showRegister}
          showLogin={props.showLogin}
          handleClose={props.handleClose}
          handleRegisterClick={props.handleRegisterClick}
          handleLoginClick={props.handleLoginClick}
          handleForgotPassword={props.handleForgotPassword}
          showForgot={props.showForgot}
        />
      )}
      <Outlet />
      <Footer />
    </div>
  );
};

export default InfoLayout;
