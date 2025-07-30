import React from "react";
import "../Styles/Banner.css";
import GameInfo from "../Component/GameInfo";
import Features from "../Component/Features";
// import { bg, bg1 } from "../../assets/website/index";

const Banner = ({ showRegister, handleClose, handleRegisterClick }) => {
  return (
    <>
      <div className="banner">
        <div className="content">
          <div className="content-child">
            <h4>Welcome to Revo Play</h4>
            <h1>
              Dive into the ultimate gaming adventure where every ride turns
              into rewards!{" "}
            </h1>
            <p>With Revo Play, you can:</p>
            <div className="revo-wrapper">
              <ul className="revo-details">
                <li className="detail">
                  ✔️ Earn Rev Coins by playing exciting challenges.
                </li>
                <li className="detail">
                  ✔️ Invite friends and unlock exclusive referral bonuses.
                </li>
                <li className="detail">
                  ✔️ Climb the leaderboard to win big prizes and bragging
                  rights!
                </li>
              </ul>
            </div>
            <div className="get-started">
              <div className="play-btn play-btn2" onClick={handleRegisterClick}>
                Get Started
              </div>
            </div>
          </div>
        </div>
      </div>
      <GameInfo />
      <div className="instructions-container">
        <Features />
      </div>

      <div className="instructions-container">
        <h2 className="instruction-heading">How to Play</h2>
        <ol className="instructions-list">
          <li className="instructions-item">
            <span className="item-title">Place Your Stake:</span>
            <ul className="sublist">
              <li className="sublist-item">
                Enter your desired Stakimg amount.
              </li>
              <li className="sublist-item">Confirm to join the round.</li>
            </ul>
          </li>
          <li className="instructions-item">
            <span className="item-title">Watch the Multiplier:</span>
            <ul className="sublist">
              <li className="sublist-item">
                Once the game begins, the car starts moving, and the multiplier
                starts growing (e.g., 1.5x, 2x, 3x).
              </li>
            </ul>
          </li>
          <li className="instructions-item">
            <span className="item-title">Cash Out in Time:</span>
            <ul className="sublist">
              <li className="sublist-item">
                Tap <span className="italic-text">Cash Out</span> to secure your
                winnings before the car runs out of fuel.
              </li>
              <li className="sublist-item">
                Your payout ={" "}
                <span className="bold-text">Stake Amount × Multiplier</span> at
                the time of cashing out.
              </li>
            </ul>
          </li>
          <li className="instructions-item">
            <span className="item-title">Avoid Running Out of Gas:</span>
            <ul className="sublist">
              <li className="sublist-item">
                If the car stops before you cash out, you lose your Stake.
              </li>
            </ul>
          </li>
        </ol>
      </div>
    </>
  );
};

export default Banner;
