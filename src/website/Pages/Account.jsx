import React from "react";
import "../Styles/Account.css"; // Make sure to create this CSS file

const Account = ({ isOpen, onClose, accountDetails }) => {
  if (!isOpen) return null;

  return (
    <div className="popup-parent">
      <div className="popup-container">
        <div className="popup-header">
          <h2>Connected Account Details</h2>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="popup-content">
          <h5>{accountDetails}</h5>
        </div>
      </div>
    </div>
  );
};

export default Account;
