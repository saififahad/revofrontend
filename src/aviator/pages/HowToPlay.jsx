import { useState } from "react";
import "../styles/Howtoplay.css";
import { useNavigate } from "react-router-dom";

const HowToPlay = () => {
  const navigate = useNavigate();
  const [isDialogOpen, setDialogOpen] = useState(true);

  const handleCloseClick = () => {
    setDialogOpen(false);
  };

  return isDialogOpen ? (
    <div className="el-dialog__wrapper" style={{ zindex: "2005" }}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Game Rules"
        className="el-dialog el-dialog-normal dialog-content dialog-game-rules"
        style={{ marginTop: "15vh" }}
      >
        <div
          style={{ display: "flex", justifyContent: "space-between" }}
          className="el-dialog__header"
        >
          <span className="el-dialog__title">Game Rules</span>
          <span style={{ cursor: "pointer" }} onClick={handleCloseClick}>
            X
          </span>
        </div>
        <div className="el-dialog__body">
          <div data-v-09061f1c className="content-wrapper">
            <div data-v-09061f1c className="content ng-star-inserted">
              <div
                data-v-09061f1c
                className="modal-content"
                style={{ backgroundColor: "transparent" }}
              >
                <div data-v-09061f1c className="modal-body">
                  <p data-v-09061f1c translate className="text-grey">
                    Aviator is a new generation of iGaming entertainment.You can
                    win many times more,in seconds!Aviator is built on a
                    provably fair system,which is currently the only real
                    guarantee of honesty in the gambling industry
                  </p>
                  {/* <a
                    style={{
                      color: " rgb(232, 232, 191)",
                      textDecoration: "none",
                    }}
                    data-v-09061f1c
                    href="#"
                    translate
                  >
                    Read more about provably fair system
                  </a> */}
                  <h6 data-v-09061f1c className="mt-4 mb-2 text-uppercase">
                    HOW TO PLAY
                  </h6>
                  <div
                    data-v-09061f1c
                    className="imginfoen"
                    style={{ width: "100%" }}
                  />
                  <div data-v-09061f1c className="steps-wrapper">
                    <h6 data-v-09061f1c translate className="pt-5 pl-2">
                      Aviator is as easy to play as 1-2-3:
                    </h6>
                    <div data-v-09061f1c className="steps-container">
                      <div data-v-09061f1c className="step step-1">
                        <h3 data-v-09061f1c>01</h3>
                        <div data-v-09061f1c className="step-bg-img" />
                        <div
                          data-v-09061f1c
                          translate
                          className="step-text pt-2"
                        >
                          <span data-v-09061f1c className="text-uppercase">
                            bet
                          </span>
                          STAKE before take-off
                        </div>
                      </div>
                      <div data-v-09061f1c className="step step-2">
                        <h3 data-v-09061f1c>02</h3>
                        <div data-v-09061f1c className="step-bg-img" />
                        <div data-v-09061f1c translate className="step-text">
                          <span data-v-09061f1c className="text-uppercase">
                            WATCH
                          </span>
                          as your Lucky Plane takes off and your winnings
                          increase.
                        </div>
                      </div>
                      <div data-v-09061f1c className="step step-3">
                        <h3 data-v-09061f1c>03</h3>
                        <div data-v-09061f1c className="step-bg-img" />
                        <div data-v-09061f1c translate className="step-text">
                          <span data-v-09061f1c className="text-uppercase">
                            exchange
                          </span>
                          CASHOUT-before the plane disappears and wins X times
                          more!
                        </div>
                      </div>
                    </div>
                    <p data-v-09061f1c translate className="mt-3 text-grey">
                      But remember,if you did not have time to Cash Out before
                      the Lucky Plane flies away,your Stake will be lost.Aviator
                      is pure excitement!Risk and win.It's all in your hands!
                    </p>
                    <div data-v-09061f1c className="rules-list pt-3">
                      <div
                        data-v-09061f1c
                        translate
                        className="rules-list-title"
                      >
                        More details
                      </div>
                      <ul data-v-09061f1c className="list-group">
                        <li
                          data-v-09061f1c
                          translate
                          className="list-group-item"
                        >
                          The win multiplier starts at 1x and grows more and
                          more as the Lucky Plane takes off.
                        </li>
                        <li
                          data-v-09061f1c
                          translate
                          className="list-group-item"
                        >
                          Your winnings are calculated at the multiplier at
                          which you made a Cash Out,multiplied by your bet.
                        </li>
                        <li
                          data-v-09061f1c
                          translate
                          className="list-group-item"
                        >
                          Before the start of each round,our provably fair
                          random number generator generates the multiplier at
                          which the Lucky Plane will fly away.You can check the
                          honesty of this generation by clicking on
                          <span data-v-09061f1c className="icon-fair" />
                          icon,opposite the result,in the History tab
                        </li>
                      </ul>
                    </div>
                  </div>
                  <h6 data-v-09061f1c translate className="mt-4 mt-5">
                    GAME FUNCTIONS
                  </h6>
                  <div data-v-09061f1c className="rules-list pt-2">
                    <div data-v-09061f1c translate className="rules-list-title">
                      Stake Cash Out
                    </div>
                    <ul data-v-09061f1c className="list-group">
                      <li data-v-09061f1c translate className="list-group-item">
                        Select an amount and press the "Bet"button to make a bet
                      </li>
                      <li
                        data-v-09061f1c
                        translate
                        className="list-group-item ng-star-inserted"
                      >
                        You can make two bets simultaneously.You can add or
                        reduce a Stake panel by press the plus or minus icon,
                        which is located on the top right corner of the bet
                        panel.
                      </li>
                      <li data-v-09061f1c translate className="list-group-item">
                        Press the "Cash Out"button to cash out your
                        winnings.Your win is your Stake multiplied by the Cash
                        Out multiplier.
                      </li>
                      <li data-v-09061f1c translate className="list-group-item">
                        Your Stake is lost,if you didn't cash out before the
                        plane flies away.
                      </li>
                    </ul>
                  </div>
                  <div
                    data-v-09061f1c
                    className="rules-list pt-2 ng-star-inserted"
                  >
                    <div data-v-09061f1c translate className="rules-list-title">
                      Auto Play Auto Cash Out
                    </div>
                    <ul data-v-09061f1c className="list-group ng-star-inserted">
                      <li data-v-09061f1c translate className="list-group-item">
                        Auto Play is activated on the Stake Panel,by pressing
                        the "Auto Play"button.After activation,bets will be
                        placed automatically.For Cash Out,you should press the
                        "Cash Out"button in each round.
                      </li>
                      <li data-v-09061f1c translate className="list-group-item">
                        In the Auto Play Panel,the "Stop if cash decreases
                        by"option stops Auto Play,if the balance is decreased by
                        the selected amount.
                      </li>
                      <li data-v-09061f1c translate className="list-group-item">
                        In the Auto Play Panel,the "Stop if cash increases
                        by"option stops Auto Play,if the balance is increased by
                        the selected amount.
                      </li>
                      <li data-v-09061f1c translate className="list-group-item">
                        In the Auto Play Panel,the "Stop if single win
                        exceeds"option stops Auto Play,if a single win exceeds
                        the selected amount.
                      </li>
                      <li data-v-09061f1c translate className="list-group-item">
                        Auto Cash Out is available on the Stake panel.After
                        activation,your Stake will be automatically cashed out
                        when it reaches the multiplier entered
                      </li>
                    </ul>
                  </div>
                  <div data-v-09061f1c className="rules-list pt-2">
                    <div data-v-09061f1c translate className="rules-list-title">
                      Live Bets Statistics
                    </div>
                    <ul data-v-09061f1c className="list-group">
                      <li data-v-09061f1c translate className="list-group-item">
                        On the left side of the game interface,is located the
                        'All Bets'panel.Here you can see all bets that are being
                        made in the current round.
                      </li>
                      <li data-v-09061f1c translate className="list-group-item">
                        In the "My Bets"panel you can see all of your bets and
                        Cash Out information.
                      </li>
                    </ul>
                  </div>
                  <div data-v-09061f1c className="rules-list pt-2">
                    <div data-v-09061f1c translate className="rules-list-title">
                      Randomisation
                    </div>
                    <ul data-v-09061f1c className="list-group">
                      <li data-v-09061f1c translate className="list-group-item">
                        The multiplier for each round is generated by a
                        "Provably Fair"algorithm and is completely transparent.
                        {/* <a
                          style={{
                            color: " rgb(232, 232, 191)",
                            textDecoration: "none",
                          }}
                          data-v-09061f1c
                          href="#"
                          translate
                        >
                          Read more about provably fair system
                        </a> */}
                      </li>
                      <li data-v-09061f1c translate className="list-group-item">
                        You can check the fairness of each round by pressing
                        <span data-v-09061f1c className="icon-fair" /> icon.It
                        is in the“My Bets”Panel,or click the game result for
                        each round in the“Top”tabs.
                      </li>
                    </ul>
                  </div>
                  <div
                    data-v-09061f1c
                    className="rules-list pt-2 ng-star-inserted"
                  >
                    <div data-v-09061f1c translate className="rules-list-title">
                      Return to Player
                    </div>
                    <ul data-v-09061f1c className="list-group">
                      <li data-v-09061f1c className="list-group-item">
                        The overall theoretical return to player is 97%.This
                        means that on average,for every 100 rounds,every 3
                        rounds end with the Lucky Plane flying away at the very
                        beginning of the round.
                      </li>
                    </ul>
                  </div>
                  <div data-v-09061f1c className="rules-list pt-2">
                    <div data-v-09061f1c translate className="rules-list-title">
                      Other
                    </div>
                    <ul data-v-09061f1c className="list-group">
                      <li data-v-09061f1c translate className="list-group-item">
                        If you have activated "Auto Cash Out"mode,and the
                        internet connection is interrupted during the round,your
                        Stake will be automatically cashed out only when it
                        reaches the multiplier you entered.
                      </li>
                      <li data-v-09061f1c translate className="list-group-item">
                        If you have NOT activated "Auto Cash Out"mode,and the
                        internet connection is interrupted BEFORE the Lucky
                        Plane take off,your Stake will be automatically cashed
                        out when it reaches the multiplier 1.01x.
                      </li>
                      <li data-v-09061f1c translate className="list-group-item">
                        If you have NOT activated "Auto Cash Out"mode,and the
                        internet connection is interrupted AFTER the Lucky Plane
                        take off,your Stake will be automatically cashed out at
                        the same time.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default HowToPlay;
