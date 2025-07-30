import { useNavigate } from "react-router-dom";
import { icon, logo } from "../../assets/website/index";
import Forgot from "../Pages/Forgot";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import "../Styles/Navbar.css";
import { useEffect } from "react";

const Navbar = ({
  code,
  showRegister,
  showLogin,
  handleClose,
  handleRegisterClick,
  handleLoginClick,
  showForgot,
  handleForgotPassword,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (code) {
      handleRegisterClick();
    }
  }, [code]);

  console.log(code);

  return (
    <div className="Navbar-container">
      <div className="pre-heading">
        <img src={icon} alt="" />
        <h2>
          Sign Up Bonus for Limited Users! Join Revo Play Now and Get Exclusive
          Rewards!
        </h2>
      </div>
      <div className="navlist">
        <div className="logo" onClick={() => navigate("/")}>
          <img src={logo} alt="" />
        </div>
        <div className="btns">
          <button className="pri-btn" onClick={handleLoginClick}>
            Login
          </button>
          <button className="sec-btn" onClick={handleRegisterClick}>
            Register
          </button>
        </div>
      </div>
      {showLogin && (
        <Login
          onClose={handleClose}
          handleForgotPassword={handleForgotPassword}
        />
      )}
      {showRegister && (
        <Register
          onClose={handleClose}
          handleLoginClick={handleLoginClick}
          showLogin={showLogin}
        />
      )}
      {showForgot && <Forgot onClose={handleClose} />}
    </div>
  );
};

export default Navbar;
