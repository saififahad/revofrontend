import React, { useState } from "react";
import "../../../styles/main.css";

const GameListComponent = ({ onGameChange, setGame }) => {
  const [activeItem, setActiveItem] = useState(0);

  const handleItemClick = (index, game) => {
    setActiveItem(index);
    onGameChange(index);
    setGame(game);
  };

  return (
    <div className="GameList__C">
      <div
        className={`GameList__C-item ${activeItem === 0 ? "active" : ""}`}
        onClick={() => handleItemClick(0, 1)}
      >
        <div>
          Win Go
          <br />
          1Min
        </div>
      </div>
      <div
        className={`GameList__C-item ${activeItem === 1 ? "active" : ""}`}
        onClick={() => handleItemClick(1, 3)}
      >
        <div>
          Win Go
          <br />
          3Min
        </div>
      </div>
      <div
        className={`GameList__C-item ${activeItem === 2 ? "active" : ""}`}
        onClick={() => handleItemClick(2, 5)}
      >
        <div>
          Win Go
          <br />
          5Min
        </div>
      </div>
      <div
        className={`GameList__C-item ${activeItem === 3 ? "active" : ""}`}
        onClick={() => handleItemClick(3, 10)}
      >
        <div>
          Win Go
          <br />
          10Min
        </div>
      </div>
    </div>
  );
};

export default GameListComponent;
