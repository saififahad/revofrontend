import React from "react";
import "../../styles/main.css";
import { useNavigate } from "react-router-dom";
const Wallet = () => {
  const navigate = useNavigate();
  return (
    <div className="withdraw-box">
      <div className="wallet-amount">
        <p>Wallet Balance</p>
        <h2>$54335</h2>
      </div>
      <div className="withdraw-section">
        <button className="btn1" onClick={()=>navigate("/Wallet")}>Withdraw</button>
        <button className="btn2" onClick={()=>navigate("/Wallet")}>Deposit</button>
      </div>
    </div>
  );
};

export default Wallet;
