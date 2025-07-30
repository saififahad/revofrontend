import React from "react";
import "../Styles/Advertisments.css";
import { Cup } from "../../assets/website/index";
const Advertisments = () => {
  return (
    <div className="box">
      <div className="box-child">
        <div className="ad-content">
          <h1 className="ad-content-heading">
            Play to Win Up to <span>10X</span>
          </h1>
          {/* <h1 className="ad-content-heading">
            Join now and multiply your winnings with our exciting{" "}
            <span>games</span> and <span>challenges</span>
          </h1> */}
        </div>
        <div className="ad-img">
          <img src={Cup} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Advertisments;
