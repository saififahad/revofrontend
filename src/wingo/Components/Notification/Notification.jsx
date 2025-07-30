import React from "react";
import "./Notification.css";
import { FaAngleLeft } from "react-icons/fa6";
const Notification = ({ showtransaction }) => {
  return (
    <div className="notification-container">
      <div className="notification-header">
        <span className="notification-icon2">
          {" "}
          <FaAngleLeft onClick={(e) => showtransaction("no")} />
        </span>
        <span className="notification-title">Notification</span>
      </div>
      <div className="notification-body">
        <p>Welcome to Revo Play,</p>
        <p>
          Thank you for being a member of the Revo Play Games platform, we
          provide many industry-leading games. This is the world's leading
          gaming platform. you can also refer unlimited friends and earn money
          without leaving your home.
        </p>
        <span className="notification-date">2024-07-01 12:06:06</span>
      </div>
      <div className="notification-footer">No more</div>
    </div>
  );
};

export default Notification;
