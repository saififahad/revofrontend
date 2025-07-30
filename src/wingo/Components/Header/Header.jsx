import React, { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import "../../styles/main.css";
import { FaAngleLeft } from "react-icons/fa6";
import { IoMdVolumeOff } from "react-icons/io";
import { IoVolumeHigh, IoWallet } from "react-icons/io5";
import logo from "./logoc.png";
import { useNavigate } from "react-router-dom";
import { useSettingContext } from "../../../context/SettingContext";

const Header = () => {
  const { state, dispatch } = useSettingContext();
  const [isVolumeOn, setIsVolumeOn] = useState(state.sound);
  const navigate = useNavigate();
  const user = useAuth();

  useEffect(() => {
    setIsVolumeOn(state.sound);
  }, [state.sound]);

  const handleVolumeToggle = () => {
    setIsVolumeOn((prevVolume) => {
      const newVolume = !prevVolume;
      dispatch({ type: "sound", payload: newVolume });
      return newVolume;
    });
  };

  const handleWalletClick = () => {
    dispatch({ type: "sound", payload: false });
    navigate("/Wallet");
  };

  return (
    <div
      className="header"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
      }}
    >
      <div className="logoC">
        <img
          src={logo}
          alt="logo"
          onClick={() => navigate("/")}
          style={{
            width: "100px", // Adjust the logo size as needed
            cursor: "pointer",
          }}
        />
      </div>
      <div
        className="balance-section"
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: "6px",
          flexDirection: "column", // Stack vertically on mobile
        }}
      >
        <div
          onClick={handleWalletClick}
          className="balance"
          style={{
            color: "#00FF00", // Bright green
            fontWeight: "bold",
            fontSize: "1.2em", // Decreased font size
            textShadow: "1px 1px 2px black", // Adding a slight shadow for better readability
            textAlign: "center", // Center text on mobile
            cursor: "pointer", // Make it clear it's clickable
          }}
        >
          EW{user?.user?.money}$
        </div>
      </div>

      <div
        className="balance-section"
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: "6px",
          flexDirection: "column", // Stack vertically on mobile
        }}
      >
        <div
          onClick={handleWalletClick}
          className="balance"
          style={{
            color: "#1E90FF", // Dodger blue
            fontWeight: "bold",
            fontSize: "1.2em", // Decreased font size
            textShadow: "1px 1px 2px black", // Adding a slight shadow for better readability
            textAlign: "center", // Center text on mobile
            cursor: "pointer", // Make it clear it's clickable
          }}
        >
          DW{user?.user?.deposit}$
        </div>
      </div>

      <div
        className="menu"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "40px", // Adjust size as needed
          height: "40px",
          borderRadius: "50%",
          backgroundColor: "#444", // Dark background for the menu button
        }}
      >
        {isVolumeOn ? (
          <IoVolumeHigh
            size={16}
            onClick={handleVolumeToggle}
            style={{ color: "#fff" }} // White color for the icon
          />
        ) : (
          <IoMdVolumeOff
            size={16}
            onClick={handleVolumeToggle}
            style={{ color: "#fff" }} // White color for the icon
          />
        )}
      </div>
    </div>
  );
};

export default Header;
