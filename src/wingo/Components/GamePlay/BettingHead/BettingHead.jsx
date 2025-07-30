import React from "react";
import "../../../styles/main.css";

const themes = {
  green: {
    background: "green",
    text: "white",
    button: "darkgreen",
  },
  violet: {
    background: "#B659FE",
    text: "white",
    button: "#B659FE",
  },
  red: {
    background: "red",
    text: "white",
    button: "darkred",
  },
};
const BettingHead = ({ onButtonClick }) => {
  return (
    <div className="Betting__C-head">
      <div
        className="Betting__C-head-g"
        onClick={() => {
          onButtonClick(themes.green, "Green");
        }} // Add onClick to trigger popup open
      >
        Green
      </div>
      <div
        className="Betting__C-head-p"
        onClick={() => {
          onButtonClick(themes.violet, "Violet");
        }} // Add onClick to trigger popup open
      >
        Violet
      </div>
      <div
        className="Betting__C-head-r"
        onClick={() => {
          onButtonClick(themes.red, "Red");
        }} // Add onClick to trigger popup open
      >
        Red
      </div>
    </div>
  );
};

export default BettingHead;
