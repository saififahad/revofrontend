import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSettingContext } from "../../context/SettingContext";
import { PiMoneyFill, PiSignOutBold } from "react-icons/pi";
import { IoMenuSharp } from "react-icons/io5";
import { IoMdVolumeMute } from "react-icons/io";
import { MdFlightTakeoff } from "react-icons/md";
import "../styles/Sidebar.css";

export default function Sidebar() {
  const { dispatch } = useSettingContext();
  const [sound, setSound] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSound = () => {
    dispatch({ type: "sound", payload: !sound });
    setSound(!sound);
  };

  const logout = () => {
    setIsLogin(null);
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiry");
    setUser(null);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  return (
    <div className="header-right d-flex align-items-center">
      <div className="btn-group position-relative">
        <button
          type="button"
          className="btn btn-transparent dropdown-toggle p-0 d-flex align-items-center justify-content-center caret-none"
          aria-expanded={dropdownOpen}
          onClick={toggleDropdown}
        >
          <span className="material-symbols-outlined f-24 menu-icon text-white">
            <IoMenuSharp size={30} />
          </span>
        </button>
        <ul
          className={`dropdown-menu dropdown-menu-end dropdown-menu-dark profile-dropdown p-0 ${
            dropdownOpen ? "show" : ""
          }`}
        >
          <li>
            <a className="f-12 justify-content-between link-style">
              <div className="d-flex align-items-center">
                <span className="material-symbols-outlined ico">
                  <IoMdVolumeMute />
                </span>
                SOUND
              </div>
              <div>
                <div className="form-check form-switch lg-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="sound"
                    checked={sound}
                    onChange={handleSound}
                  />
                  <label className="form-check-label" htmlFor="sound" />
                </div>
              </div>
            </a>
          </li>
          <li className="divider" />
          <li>
            <Link to="/" className="f-12 justify-content-between link-style">
              <div className="d-flex align-items-center">
                <span className="material-symbols-outlined ico f-20">
                  <MdFlightTakeoff />
                </span>
                <img
                  src="/images/aviator.png"
                  className="side_logo"
                  alt="logo"
                />
              </div>
            </Link>
          </li>
          {/* <li>
            <Link
              to="/deposit"
              className="f-12 justify-content-between link-style"
            >
              <div className="d-flex align-items-center">
                <span className="material-symbols-outlined ico f-20">
                  <PiMoneyFill />
                </span>
                DEPOSIT FUNDS
              </div>
            </Link>
          </li>
          <li>
            <Link
              to="/withdraw"
              className="f-12 justify-content-between link-style"
            >
              <div className="d-flex align-items-center">
                <span className="material-symbols-outlined ico f-20">
                  <PiMoneyFill />
                </span>
                WITHDRAW FUNDS FROM THE ACCOUNT
              </div>
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              className="f-12 justify-content-between link-style"
            >
              <div className="d-flex align-items-center">
                <span className="material-symbols-outlined ico f-20">
                  account_circle
                </span>
                PERSONAL DETAILS
              </div>
            </Link>
          </li>
          <li>
            <Link
              to="/referal"
              className="f-12 justify-content-between link-style"
            >
              <div className="d-flex align-items-center">
                <span className="material-symbols-outlined ico f-20">
                  <PiMoneyFill />
                </span>
                REFERRAL
              </div>
            </Link>
          </li>
          <li>
            <Link
              to="/auth/login"
              onClick={logout}
              className="f-12 justify-content-between link-style"
            >
              <div className="d-flex align-items-center">
                <span className="material-symbols-outlined ico f-20">
                  <PiSignOutBold />
                </span>
                SIGN OUT
              </div>
            </Link>
          </li> */}
        </ul>
      </div>
    </div>
  );
}
