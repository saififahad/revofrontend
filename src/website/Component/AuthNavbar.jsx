import React from "react";
import "../Styles/AuthNavbar.css";
import { icon, logo } from "../../assets/website/index";
import { IoWallet, IoPersonSharp } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { useLocation, useNavigate } from "react-router-dom";

const AuthNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="Navbar-container">
      <div className="pre-heading">
        <img src={icon} alt="" />

        {location.pathname === "/Wallet" && (
          <h2>
            The balance in your deposit wallet cannot be withdrawn unless you
            use the amount to place a Stake.
          </h2>
        )}
        {location.pathname !== "/Wallet" && (
          <h2>
            Sign Up Bonus for Limited Users! Join Revo Play Now and Get
            Exclusive Rewards!
          </h2>
        )}
      </div>
      <div className="navlist">
        <div className="logo">
          <img src={logo} alt="" onClick={() => navigate("/")} />
        </div>
        <div className="btns">
          <button className="play-btn" onClick={() => navigate("/play")}>
            Play
          </button>

          <button className="wallet" onClick={() => navigate("/Wallet")}>
            <IoWallet />
          </button>
          <button className="wallet" onClick={() => navigate("/Profile")}>
            <IoPersonSharp />
          </button>
          <button className="wallet" onClick={handleLogout}>
            <CiLogout />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthNavbar;
