import React, { useState, useEffect } from "react";
import AuthNavbar from "../Component/AuthNavbar";
import Footer from "../LandingPage/Footer";
import "../Styles/Profile.css";
import { FaCopy } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
const url = import.meta.env.VITE_CLIENT_URL;

const Profile = () => {
  const [displayPopup, setDisplayPopup] = useState(false);
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [textCopy, setTextCopy] = useState("");

  useEffect(() => {
    if (user?.code) {
      setTextCopy(`${url}?code=${user.code}`);
    }
  }, [user]);

  useEffect(() => {
    let popupTimer;
    if (displayPopup) {
      popupTimer = setTimeout(() => {
        setDisplayPopup(false);
      }, 2000);
    }
    return () => clearTimeout(popupTimer);
  }, [displayPopup]);

  const handleClick = () => {
    navigator.clipboard
      .writeText(textCopy)
      .then(() => {
        console.log("Text copied to clipboard");
        setDisplayPopup(true);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleUpdateClick = () => {
    setIsEditing(false);
  };

  return (
    <div className="profile-container">
      <AuthNavbar />
      <div className="profile-part">
        <div className="profile-heading">
          <h1>My Profile</h1>
        </div>
        <div className="head-btn">
          <h1>
            Welcome <span>{user?.name_user}</span>
          </h1>
          {/* {!isEditing && (
            <button
              className={`profile-btn ${isEditing ? "hidden" : ""}`}
              onClick={handleEditClick}
            >
              Edit
            </button>
          )}
          {isEditing && (
            <button
              className={`update-btn ${isEditing ? "visible" : ""}`}
              onClick={handleUpdateClick}
            >
              Update
            </button>
          )} */}
        </div>
        <form action="" className="profile-form">
          <div className="upper-part">
            <div className="field-part">
              <label htmlFor="first-name">Name</label>
              <input
                type="text"
                id="first-name"
                disabled={!isEditing}
                defaultValue={user?.name_user}
                className="input-field"
              />
            </div>
            <div className="field-part">
              <label htmlFor="email">Email ID</label>
              <input
                type="email"
                id="email"
                disabled={!isEditing}
                defaultValue={user?.email}
                className="input-field"
              />
            </div>
          </div>
          <div className="upper-part">
            <div className="field-part">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="number"
                id="phone"
                disabled={!isEditing}
                defaultValue={user?.phone}
                className="input-field"
              />
            </div>
            <div className="field-part">
              <label htmlFor="last-name">Referral Link</label>
              <div className="input-field-refer">
                <input
                  type="text"
                  id="last-name"
                  className="refer-input"
                  disabled={!isEditing}
                  value={textCopy}
                  onChange={(e) => setTextCopy(e.target.value)}
                />
                <icon className="copy-icon" onClick={handleClick}>
                  <FaCopy />
                </icon>
              </div>
            </div>
          </div>
        </form>
        <div className={`copy-popup ${displayPopup ? "show" : ""}`}>
          <h1>Copy Successful</h1>
          <span>
            <IoCheckmarkDoneOutline />
          </span>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
