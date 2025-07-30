import { useEffect } from "react";
import "./LossPopup.css";
import background from "../../../assets/wingo/images/popupback.png";

function categorizeNumber(number) {
  const smallNumbers = ["0", "1", "2", "3", "4"];
  const bigNumbers = ["5", "6", "7", "8", "9"];
  const greenNumbers = ["1", "3", "7", "9", "5"];
  const redNumbers = ["0", "2", "4", "6", "8"];
  const violetNumbers = ["0", "5"];
  const numberStr = String(number);
  const categories = {
    small: smallNumbers.includes(numberStr),
    big: bigNumbers.includes(numberStr),
    color: [],
  };
  if (greenNumbers.includes(numberStr)) {
    categories.color.push("green");
  }
  if (redNumbers.includes(numberStr)) {
    categories.color.push("red");
  }
  if (violetNumbers.includes(numberStr)) {
    categories.color.push("violet");
  }
  categories.color = categories.color.join("-");

  return categories;
}

const LossPopup = ({
  text = "Round Result",
  round = 123456789012,
  result = 5,
  game = 1,
  isVisible,
  setIsVisible,
}) => {
  const fr = categorizeNumber(result);
  console.log(round, result, text, game);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="popup-overlay fadeOut">
      <div
        className="losspopup-container"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="losspopup-body">
          <h2>{text}</h2>
          <div className="result">
            <span className="result-label">Lottery results</span>
            <span className="result-value">
              <button>{fr.color}</button>
              <button>{result}</button>
              <button>{fr.big ? "Big" : "Small"}</button>
            </span>
          </div>
          <div className="message">
            <span>Congrats</span>
          </div>
          <div className="period">
            <span>Period: Wingo {game} minute</span>
            <span>Id : {round}</span>
          </div>
          <div className="auto-close">
            <label htmlFor="autoClose">
              Please Check Your Bid History For see your Winnings
            </label>
          </div>
        </div>
        <button className="close-button" onClick={() => setIsVisible(false)}>
          ×
        </button>
      </div>
    </div>
  );
};

export default LossPopup;
