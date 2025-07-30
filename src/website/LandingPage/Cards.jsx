import React from "react";
import { cardone, cardtwo } from "../../assets/website/index";
import "../Styles/Cards.css";
import Tips from "../Component/Tips";
import WhyPlay from "../Component/WhyPlay";
import GetStarted from "../Component/GetStarted";

const Cards = () => {
  return (
    <>
      <div className="cards-container">
        <div className="card-one">
          <div className="image">
            {" "}
            <img src={cardone} alt="" />
          </div>
          <div className="cards-content">
            <h1>Out of Gas</h1>
            <h3>
              "Out of Gas" is an exhilarating and fast-paced Staking game
              inspired by popular crash games like Aviator. However, in this
              unique twist, instead of a plane soaring through the sky, a car
              speeds down a road—fueled by excitement and luck! Players must
              place their Stakes, start the car, and decide when to stop before
              the car runs out of fuel and comes to a screeching crash.
            </h3>
          </div>
        </div>
      </div>
      <div className="instructions-container">
        <WhyPlay />
      </div>
      <div className="instructions-container">
        <GetStarted />
      </div>
      <Tips />
      <div className="instructions-container">
        <h2 className="instruction-heading">Game Rules</h2>
        <ol className="instructions-list">
          <ul className="sublist">
            <li className="sublist-item">
              The multiplier starts at 1.0x and grows as the car moves.
            </li>
            <li className="sublist-item">
              The car stopping point is random and unpredictable.
            </li>
            <li className="sublist-item">
              Cash out before the car stops to win; failing to cash out results
              in losing your Stake.
            </li>
            <li className="sublist-item">
              ●Missed cash-outs cannot be refunded.
            </li>
          </ul>
        </ol>
      </div>
    </>
  );
};

export default Cards;
