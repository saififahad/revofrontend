import React, { useState } from "react";
import "../../styles/main.css";
import Gamehistory from "./Gamehistory";
import Chart from "./Chart";
import Myhistory from "./Myhistory";

const Datachart = ({ showtransaction, game }) => {
  const [title, setTitle] = useState("Gamehistory");

  const handleMenuClick = (e, menuTitle) => {
    setTitle(menuTitle);
  };

  return (
    <div className="datachart">
      <ul className="chartmenu">
        <li
          className={`menu-element ${title === "Gamehistory" ? "active" : ""}`}
          onClick={(e) => handleMenuClick(e, "Gamehistory")}
        >
          Game History
        </li>
        <li
          className={`menu-element ${title === "Chart" ? "active" : ""}`}
          onClick={(e) => handleMenuClick(e, "Chart")}
        >
          Chart
        </li>
        <li
          className={`menu-element ${title === "Myhistory" ? "active" : ""}`}
          onClick={(e) => handleMenuClick(e, "Myhistory")}
        >
          My History
        </li>
      </ul>

      <div className="datachart-box">
        {title === "Gamehistory" ? (
          <Gamehistory game={game} />
        ) : title === "Chart" ? (
          <Chart game={game} />
        ) : (
          <Myhistory showtransaction={showtransaction} game={game} />
        )}
      </div>
    </div>
  );
};

export default Datachart;
