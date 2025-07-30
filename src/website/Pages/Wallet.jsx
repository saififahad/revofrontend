import React, { useState } from "react";
import AuthNavbar from "../Component/AuthNavbar";
import Footer from "../LandingPage/Footer";
import Transaction from "../Component/Transaction";
import "../Styles/Wallet.css";
import TokenTransfer from "./TokenTransfer";
import Referral from "../Component/Referral";

const Wallet = () => {
  const [activeTab, setActiveTab] = useState("wallet");

  const containerStyle = {
    height:
      activeTab === "wallet"
        ? "67.2vh"
        : activeTab === "referral"
        ? "200vh"
        : "160vh",
  };

  return (
    <div className="wallet-container">
      <AuthNavbar />
      <div className="wallet-part" style={containerStyle}>
        <div className="tabs">
          <button
            className={`wallet-btn ${activeTab === "wallet" ? "active" : ""}`}
            onClick={() => setActiveTab("wallet")}
          >
            Wallet
          </button>
          <button
            className={`wallet-btn ${
              activeTab === "transactions" ? "active" : ""
            }`}
            onClick={() => setActiveTab("transactions")}
          >
            Transactions
          </button>
          <button
            className={`wallet-btn ${activeTab === "referral" ? "active" : ""}`}
            onClick={() => setActiveTab("referral")}
          >
            Referrals
          </button>
        </div>
        <div className="tab-content">
          {activeTab === "wallet" ? (
            <TokenTransfer />
          ) : activeTab === "transactions" ? (
            <Transaction />
          ) : (
            <Referral />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Wallet;
