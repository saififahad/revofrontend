import { useState } from "react";
import { icon, logo } from "../../assets/website/index";
import { IoWallet, IoPersonSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../styles/HeaderBottom.css";
import { useSettingContext } from "../../context/SettingContext";

import { VscUnmute, VscMute } from "react-icons/vsc";
const HeaderBottom = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  const { user } = useAuth();
  const { dispatch } = useSettingContext();
  const [sound, setSound] = useState(true);
  const handleSound = () => {
    dispatch({ type: "sound", payload: !sound });
    setSound(!sound);
  };

  return (
    <div className="Navbar-container-aviator">
      <div className="logo"></div>{" "}
      {/* <div className="pre-heading">
        <img src={icon} alt="" />
        <h2>Sign Up Bonus for Limited Users! Join OnBid Now and Get Exclusive Rewards!</h2>
      </div> */}
      <div className="navlist-aviator">
        <div className="logo-aviator">
          <img src={logo} alt="" onClick={() => navigate("/")} />
        </div>
        <div className="btns-aviator">
          <button
            className="wallet-aviator"
            onClick={() => navigate("/Wallet")}
          >
            <IoWallet />
          </button>
          <button
            className="wallet-aviator"
            onClick={() => navigate("/Profile")}
          >
            <IoPersonSharp />
          </button>
          <button className="wallet-aviator" onClick={handleSound}>
            {sound ? <VscUnmute /> : <VscMute />}
          </button>
          <h1
            className="money-wallet"
            style={{
              color: "#00FF00", // Bright green
              fontWeight: "bold",
              fontSize: "1.5em",
              margin: "10px 0",
              textShadow: "1px 1px 2px black", // Adding a slight shadow for better readability
              display: "flex",
              alignItems: "center",
            }}
          >
            <span
              style={{
                backgroundColor: "#333",
                borderRadius: "5px",
                padding: "2px 8px",
                marginRight: "10px",
                color: "#FFF",
                fontSize: "0.8em",
              }}
            >
              EW
            </span>
            {user?.money}$
          </h1>
          <h1
            className="money-wallet"
            style={{
              color: "#1E90FF", // Dodger blue
              fontWeight: "normal",
              fontSize: "1.5em",
              margin: "10px 0",
              textShadow: "1px 1px 2px black", // Adding a slight shadow for better readability
              display: "flex",
              alignItems: "center",
            }}
          >
            <span
              style={{
                backgroundColor: "#333",
                borderRadius: "5px",
                padding: "2px 8px",
                marginRight: "10px",
                color: "#FFF",
                fontSize: "0.8em",
              }}
            >
              DW
            </span>
            {user?.deposit}$
          </h1>
        </div>
      </div>
    </div>
  );
};

export default HeaderBottom;
