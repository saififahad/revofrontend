import React from "react";
import "../Styles/Block.css";
import { Cloudeffect, phn } from "../../assets/website/index";

const Block = () => {
  return (
    <div className="Block-container">
      <div className="block-box">
        <h1>Ready to try your <br/>luck with us?</h1>
        <button className="block-btn">Register</button>
        <img src={phn} alt="" />
      </div>
    </div>
  );
};

export default Block;
