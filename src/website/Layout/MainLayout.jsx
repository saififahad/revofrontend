import Navbar from "../LandingPage/Navbar";
import Banner from "../LandingPage/Banner";
import Cards from "../LandingPage/Cards";
import Advertisments from "../LandingPage/Advertisments";
import Footer from "../LandingPage/Footer";
import { useSearchParams } from "react-router-dom";
import "../Styles/MainLayout.css";

const MainLayout = (props) => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  return (
    <div className="header-layout">
      <Navbar
        code={code ? true : false}
        showRegister={props.showRegister}
        showLogin={props.showLogin}
        handleClose={props.handleClose}
        handleRegisterClick={props.handleRegisterClick}
        handleLoginClick={props.handleLoginClick}
        handleForgotPassword={props.handleForgotPassword}
        showForgot={props.showForgot}
      />
      <Banner
        showRegister={props.showRegister}
        showLogin={props.showLogin}
        handleClose={props.handleClose}
        handleRegisterClick={props.handleRegisterClick}
        handleLoginClick={props.handleLoginClick}
        handleForgotPassword={props.handleForgotPassword}
        showForgot={props.showForgot}
      />
      <Cards />
      <Advertisments />
      <Footer />
    </div>
  );
};

export default MainLayout;
