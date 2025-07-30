import { useEffect, useState } from "react";

const LudoBoard = () => {
  // const [privateAreas, setPrivateAreas] = useState({
  //   blue: [],
  //   red: [],
  //   green: [],
  //   yellow: [],
  // });
  // const [outerPosition, setOuterPosition] = useState(new Position(52));
  // const [lastLine, setLastLine] = useState({
  //   blue: new Position(5),
  //   red: new Position(5),
  //   green: new Position(5),
  //   yellow: new Position(5),
  // });
  // const [homeAreas, setHomeAreas] = useState({
  //   blue: [],
  //   red: [],
  //   green: [],
  //   yellow: [],
  // });
  // const [diceValue, setDiceValue] = useState(6);
  // const [currentTurn, setCurrentTurn] = useState(0);
  // const [turnOrder, setTurnOrder] = useState([
  //   "blue",
  //   "red",
  //   "green",
  //   "yellow",
  // ]);
  // const [winner, setWinner] = useState(null);

  // useEffect(() => {
  //   initGame();
  // }, []);

  // function initGame() {
  //   let privateAreasCopy = {
  //     blue: [],
  //     red: [],
  //     green: [],
  //     yellow: [],
  //   };

  //   Object.keys(privateAreasCopy).forEach((color) => {
  //     for (let i = 1; i <= 4; i++) {
  //       let pawn = new Pawn(i, color);
  //       privateAreasCopy[color].push(pawn);
  //     }
  //   });

  //   setPrivateAreas(privateAreasCopy);
  // }

  // function rollDice() {
  //   if (winner) return;

  //   let newDiceValue = Math.floor(Math.random() * 6) + 1;
  //   setDiceValue(newDiceValue);

  //   if (newDiceValue !== 6) {
  //     setCurrentTurn((currentTurn) => (currentTurn + 1) % turnOrder.length);
  //   }
  // }

  // function movePawn(pawn, steps) {
  //   if (!steps || !pawn) return;

  //   let color = pawn.color;

  //   if (privateAreas[color].includes(pawn)) {
  //     let index = privateAreas[color].indexOf(pawn);
  //     privateAreas[color].splice(index, 1);
  //     outerPosition[pawn.startCell].push(pawn);
  //   } else if (outerPosition[pawn.currentCell].includes(pawn)) {
  //     let index = outerPosition[pawn.currentCell].indexOf(pawn);
  //     outerPosition[pawn.currentCell].splice(index, 1);
  //     let targetCell = (parseInt(pawn.currentCell) + steps) % 52;
  //     if (targetCell === 0) targetCell = 52;
  //     pawn.currentCell = targetCell.toString();
  //     if (targetCell >= 51) {
  //       lastLine[color][targetCell - 51].push(pawn);
  //     } else {
  //       outerPosition[targetCell].push(pawn);
  //     }
  //   } else if (lastLine[color][pawn.currentCell].includes(pawn)) {
  //     let index = lastLine[color][pawn.currentCell].indexOf(pawn);
  //     lastLine[color][pawn.currentCell].splice(index, 1);
  //     if (parseInt(pawn.currentCell) + steps <= 5) {
  //       pawn.currentCell = "home";
  //       homeAreas[color].push(pawn);
  //       checkWinner();
  //     } else {
  //       let targetCell = (parseInt(pawn.currentCell) + steps) % 5;
  //       lastLine[color][targetCell].push(pawn);
  //       pawn.currentCell = targetCell.toString();
  //     }
  //   }

  //   checkWinner();
  //   setCurrentTurn((currentTurn) => (currentTurn + 1) % turnOrder.length);
  // }

  // function checkWinner() {
  //   let color = turnOrder[currentTurn];
  //   if (homeAreas[color].length === 4) {
  //     setWinner(color);
  //     playSound("win");
  //   }
  // }

  // function playSound(type) {
  //   const soundMap = {
  //     roll: "/sounds/roll.mp3",
  //     move: "/sounds/move.mp3",
  //     win: "/sounds/win.mp3",
  //   };
  //   const audio = new Audio(soundMap[type]);
  //   audio.play();
  // }

  // function Position(length) {
  //   let pos = {};
  //   for (let i = 1; i <= length; i++) {
  //     pos[i] = [];
  //   }
  //   return pos;
  // }

  // function Pawn(id, color) {
  //   this.id = id;
  //   this.color = color;
  //   this.startCell =
  //     color === "blue"
  //       ? "1"
  //       : color === "red"
  //       ? "14"
  //       : color === "green"
  //       ? "27"
  //       : "40";
  //   this.currentCell = this.startCell;
  // }

  return (
    <main>
      <script src="./main.js"/>
      <h1 className="title">Onbid Ludo</h1>
      <div className="board">
        <div className="section section-1">
          <div className="private red">
            <div className="cells">
              <div className="cell red-private-1 red"></div>
              <div className="cell red-private-2 red"></div>
              <div className="cell red-private-3 red"></div>
              <div className="cell red-private-4 red"></div>
            </div>
          </div>

          <div className="cells">
            <div className="cell out-24"></div>
            <div className="cell out-25"></div>
            <div className="cell out-26"></div>

            <div className="cell out-23"></div>
            <div className="cell green-last-line-1 green"></div>
            <div className="cell out-27 green"></div>

            <div className="cell out-22 star"></div>
            <div className="cell green-last-line-2 green"></div>
            <div className="cell out-28"></div>

            <div className="cell out-21"></div>
            <div className="cell green-last-line-3 green"></div>
            <div className="cell out-29"></div>

            <div className="cell out-20"></div>
            <div className="cell green-last-line-4 green"></div>
            <div className="cell out-30"></div>

            <div className="cell out-19"></div>
            <div className="cell green-last-line-5 green"></div>
            <div className="cell out-31"></div>
          </div>

          <div className="private green">
            <div className="cells">
              <div className="cell green-private-1 green"></div>
              <div className="cell green-private-2 green"></div>
              <div className="cell green-private-3 green"></div>
              <div className="cell green-private-4 green"></div>
            </div>
          </div>
        </div>

        <div className="section section-2">
          <div className="cells">
            <div className="cell out-13"></div>
            <div className="cell out-14 red"></div>
            <div className="cell out-15"></div>
            <div className="cell out-16"></div>
            <div className="cell out-17"></div>
            <div className="cell out-18"></div>

            <div className="cell out-12"></div>
            <div className="cell red-last-line-1 red"></div>
            <div className="cell red-last-line-2 red"></div>
            <div className="cell red-last-line-3 red"></div>
            <div className="cell red-last-line-4 red"></div>
            <div className="cell red-last-line-5 red"></div>

            <div className="cell out-11"></div>
            <div className="cell out-10"></div>
            <div className="cell out-9 star"></div>
            <div className="cell out-8"></div>
            <div className="cell out-7"></div>
            <div className="cell out-6"></div>
          </div>

          <div className="homes">
            <div className="home green">
              <div className="cells">
                <div className="cell green-home-1 green"></div>
                <div className="cell green-home-2 green"></div>
                <div className="cell green-home-3 green"></div>
                <div className="cell green-home-4 green"></div>
              </div>
            </div>
            <div className="home yellow">
              <div className="cells">
                <div className="cell yellow-home-1 yellow"></div>
                <div className="cell yellow-home-2 yellow"></div>
                <div className="cell yellow-home-3 yellow"></div>
                <div className="cell yellow-home-4 yellow"></div>
              </div>
            </div>
            <div className="home blue">
              <div className="cells">
                <div className="cell blue-home-1 blue"></div>
                <div className="cell blue-home-2 blue"></div>
                <div className="cell blue-home-3 blue"></div>
                <div className="cell blue-home-4 blue"></div>
              </div>
            </div>
            <div className="home red">
              <div className="cells">
                <div className="cell red-home-1 red"></div>
                <div className="cell red-home-2 red"></div>
                <div className="cell red-home-3 red"></div>
                <div className="cell red-home-4 red"></div>
              </div>
            </div>
          </div>

          <div className="cells">
            <div className="cell out-32"></div>
            <div className="cell out-33"></div>
            <div className="cell out-34"></div>
            <div className="cell out-35 star"></div>
            <div className="cell out-36"></div>
            <div className="cell out-37"></div>

            <div className="cell yellow-last-line-5 yellow"></div>
            <div className="cell yellow-last-line-4 yellow"></div>
            <div className="cell yellow-last-line-3 yellow"></div>
            <div className="cell yellow-last-line-2 yellow"></div>
            <div className="cell yellow-last-line-1 yellow"></div>
            <div className="cell out-38"></div>

            <div className="cell out-44"></div>
            <div className="cell out-43"></div>
            <div className="cell out-42"></div>
            <div className="cell out-41"></div>
            <div className="cell out-40 yellow"></div>
            <div className="cell out-39"></div>
          </div>
        </div>
        <div className="section section-3">
          <div className="private blue">
            <div className="cells">
              <div className="cell blue-private-1 blue"></div>
              <div className="cell blue-private-2 blue"></div>
              <div className="cell blue-private-3 blue"></div>
              <div className="cell blue-private-4 blue"></div>
            </div>
          </div>

          <div className="cells">
            <div className="cell out-5"></div>
            <div className="cell blue-last-line-5 blue"></div>
            <div className="cell out-45"></div>

            <div className="cell out-4"></div>
            <div className="cell blue-last-line-4 blue"></div>
            <div className="cell out-46"></div>

            <div className="cell out-3"></div>
            <div className="cell blue-last-line-3 blue"></div>
            <div className="cell out-47"></div>

            <div className="cell out-2"></div>
            <div className="cell blue-last-line-2 blue"></div>
            <div className="cell out-48 star"></div>

            <div className="cell out-1 blue"></div>
            <div className="cell blue-last-line-1 blue"></div>
            <div className="cell out-49"></div>

            <div className="cell out-52"></div>
            <div className="cell out-51"></div>
            <div className="cell out-50"></div>
          </div>

          <div className="private yellow">
            <div className="cells">
              <div className="cell yellow-private-1 yellow"></div>
              <div className="cell yellow-private-2 yellow"></div>
              <div className="cell yellow-private-3 yellow"></div>
              <div className="cell yellow-private-4 yellow"></div>
            </div>
          </div>
        </div>
        <div className="dashboard blue">
          <div className="player-name">
            <span>Blue's turn</span>
          </div>
          <div className="dice-section">
            <div className="dice glowing"></div>
          </div>
          <div className="dice-value">
            <span>6</span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LudoBoard;

const Cell = ({ color, classNames }) => {
  return <div className={`cell ${classNames} ${color}`}></div>;
};

const PlayerDashboard = ({ color, playerName, isTurn, diceValue }) => {
  const turnClass = isTurn ? "active" : "";

  return (
    <div className={`dashboard ${color} ${turnClass}`}>
      <div className="player-name">
        <span>{playerName}'s turn</span>
      </div>
      <div className="dice-section">
        <div className="dice glowing"></div>
      </div>
      <div className="dice-value">
        <span>{diceValue}</span>
      </div>
    </div>
  );
};
