import React, { useState } from "react";
import "../../styles/Transactiondetail.css";
import { IoIosArrowDropleft } from "react-icons/io";
import MyHistory from "../../Components/Gamedata/Myhistory";

const Transactiondetail = ({ showtransaction }) => {
  const [activeTab, setActiveTab] = useState("WinGO 1Min");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="detail-box" style={{ color: "black" }}>
      <div className="detail-header">
        <div className="backicon" onClick={(e) => showtransaction("no")}>
          <IoIosArrowDropleft />
        </div>
        <h5>WinGo</h5>
      </div>
      <div className="detail-nav">
        <li
          className={activeTab === "WinGO 1Min" ? "active" : ""}
          onClick={() => handleTabClick("WinGO 1Min")}
        >
          WinGO 1Min
        </li>
        <li
          className={activeTab === "WinGO 3Min" ? "active" : ""}
          onClick={() => handleTabClick("WinGO 3Min")}
        >
          WinGO 3Min
        </li>
        <li
          className={activeTab === "WinGO 5Min" ? "active" : ""}
          onClick={() => handleTabClick("WinGO 5Min")}
        >
          WinGO 5Min
        </li>
        <li
          className={activeTab === "WinGO 10Min" ? "active" : ""}
          onClick={() => handleTabClick("WinGO 10Min")}
        >
          WinGO 10Min
        </li>
      </div>
      <div className="transaction-detail" style={{ width: "100%" }}>
        <MyHistory />
      </div>
    </div>
  );
};

export default Transactiondetail;
