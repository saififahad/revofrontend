import React from "react";
// import { aviator, color } from "../../assets/website/index";
import { cardone, cardtwo } from "../../assets/website/index";

import "../Styles/Game.css";
import { useNavigate } from "react-router-dom";

const Game = () => {
  const navigate = useNavigate();
  const gameData = [
    {
      id: 1,
      imgSrc: cardone,
      name: "Out of Gas",
      route: "/aviator",
      Description:
        "Place your Stake, watch the multiplier grow and cash out before the car runs out of fuel. The longer the car runs the higher your multiplier—but don’t wait too long, or you risk losing you Stake",
    },
    {
      id: 2,
      imgSrc: cardtwo,
      name: "Color Prediction Game",
      route: "/wingo",
      Description:
        "Color prediction is a game of chance that has gained popularity in some parts of the world, particularly in India and other Asian countries. The game involves predicting the color of a ball or card that will be drawn from a set of options. Players place Stakes on their predictions and win money based on the accuracy of their predictions.",
    },
  ];
  return (
    <div className="game-container">
      <div className="game-child">
        <div className="game-heading">
          <h1>Available Games</h1>
        </div>

        <div className="card-game-parent">
          {/* {gameData.map((item) => ( */}
          <div className="card-game " onClick={() => navigate("/aviator")}>
            <div className="image-play">
              <img src={cardone} alt="Aviator Game" />
            </div>
            <button className="game-btn">Play</button>
            <h1>Out of Gas</h1>
            <p>
              {
                "Out of Gas is an exhilarating and fast-paced Staking game inspired by popular crash games like Aviator. However, in this unique twist, instead of a plane soaring through the sky, a car speeds down a road—fueled by excitement and luck! Players must place their Stakes, start the car, and decide when to stop before the car runs out of fuel and comes to a screeching crash."
              }
            </p>
          </div>
          {/* ))} */}
        </div>
      </div>
    </div>
  );
};

export default Game;
