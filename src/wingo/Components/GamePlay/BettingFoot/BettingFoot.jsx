import React from "react";
import "../../../styles/main.css";
const themes = {
  big: {
    background: "#ffa82e",
    text: "white",
    button: "#ffa82e",
  },
  small: {
    background: "#6da7f4",
    text: "white",
    button: "#6da7f4",
  },
};
const BettingFoot = ({ onButtonClick }) => {
  return (
    <div className="Betting__C-foot">
      <div
        className="Betting__C-foot-b"
        onClick={() => {
          onButtonClick(themes.big, "Big");
        }}
      >
        Big
      </div>
      <div
        className="Betting__C-foot-s"
        onClick={() => {
          onButtonClick(themes.small, "Small");
        }}
      >
        Small
      </div>
    </div>
  );
};

export default BettingFoot;
