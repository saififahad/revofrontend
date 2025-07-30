import { useCallback, useState, useEffect } from "react";
import { postData } from "../../api/ClientFunction";
import { useBetContext } from "../context/BetContext";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { useSocket } from "../../context/SocketContext";
import { mutate } from "swr";
export default function BetButtons({ id }) {
  const socket = useSocket();
  const { user } = useAuth();
  const [betId1, setBetId1] = useState(() => {
    const storedBetId1 = localStorage.getItem("betId1");
    return storedBetId1 ? parseInt(storedBetId1, 10) : 0;
  });
  const { state, dispatch } = useBetContext();
  const {
    gameStarted,
    withdrawn1,
    planeValue,
    withdrawn2,
    isBet1,
    isBet2,
    planeCrashed,
    fakeBet1,
    fakeBet2,
  } = state;
  const [extraBetAmount1, setExtraBetAmount1] = useState(() => {
    const value = localStorage.getItem("extraBetAmount1");
    return value !== null ? Number(value) : 10;
  });

  const [extraBetAmount2, setExtraBetAmount2] = useState(() => {
    const value = localStorage.getItem("extraBetAmount2");
    return value !== null ? Number(value) : 10;
  });

  // Determine betAmount based on id
  const [betAmount, setBetAmount] = useState(0);

  const [betId2, setBetId2] = useState(() => {
    const storedBetId2 = localStorage.getItem("betId2");
    return storedBetId2 ? parseInt(storedBetId2, 10) : 0;
  });
  const [betType, setBetType] = useState(0);
  const [cashDecrease, setCashDecrease] = useState(0);
  const [cashIncrease, setCashIncrease] = useState(0);
  const [autoCashOut, setAutoCashOut] = useState(false);
  const [rounds, setRounds] = useState(10);
  const [autoCashOutValue, setAutoCashOutValue] = useState(2);

  useEffect(() => {
    if (id === 1) {
      setBetAmount(extraBetAmount1 * planeValue);
    } else if (id === 2) {
      setBetAmount(extraBetAmount2 * planeValue);
    }
  }, [planeValue]);
  const autoCashOutHandler = (e, id) => {
    setAutoCashOut(!autoCashOut);
  };
  useEffect(() => {
    if (id === 1) {
      dispatch({ type: "autoCashOut1", payload: autoCashOut });
    } else {
      dispatch({ type: "autoCashOut2", payload: autoCashOut });
    }
  }, [autoCashOut]);

  const handleDecreaseChange = (value) => {
    setCashDecrease(value);
  };
  const handleIncreaseChange = (value) => {
    setCashIncrease(value);
  };
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  function handleStart(e, id) {
    e.preventDefault();
    if (id === 1) {
      dispatch({ type: "rounds1", payload: rounds });
      dispatch({ type: "cashDecrease1", payload: cashDecrease });
      dispatch({ type: "cashIncrease1", payload: cashIncrease });
    } else {
      dispatch({ type: "rounds2", payload: rounds });
      dispatch({ type: "cashDecrease2", payload: cashDecrease });
      dispatch({ type: "cashIncrease2", payload: cashIncrease });
    }
    closeModal();
  }
  function isNumber(value) {
    return typeof value === "number" && !isNaN(value);
  }
  async function handleBet(id) {
    if (gameStarted) {
      toast.error("Game has already started...");
      id === 1
        ? dispatch({ type: "fakeBet1" })
        : dispatch({ type: "fakeBet2" });
      return;
    }
    if (!autoCashOut) {
      const extraBetAmount = id === 1 ? extraBetAmount1 : extraBetAmount2;
      const isBetPlaced = id === 1 ? isBet1 : isBet2;
      if (extraBetAmount < 10) {
        toast.error("Minimum Stake Amount is 10");
      }
      if (!isBetPlaced) {
        const data = { betAmount: extraBetAmount };
        let res;
        if (id == 1) {
          res = await postData("/bet/place", data);
        } else {
          res = await postData("/bet/place2", data);
        }
        if (res.error) {
          toast.error("You Account Has Been blocked, you can't place bet!..");
        }
        if (res.status) {
          mutate("/user/getUserInfo");
          mutate(`/user/getmybets?phone=${user?.phone}`);
          toast.success("Stake Placed!...");
          dispatch({ type: id === 1 ? "isBet1" : "isBet2", payload: true });
          id === 1 ? setBetId1(res.betId) : setBetId2(res.betId);
          if (id === 1) {
            localStorage.setItem("betId1", res.betId);
            localStorage.setItem("betamount1", extraBetAmount);
          } else {
            localStorage.setItem("betId2", res.betId);
            localStorage.setItem("betamount2", extraBetAmount);
          }
          if (socket) {
            socket.emit("betPlaced", 1);
          }
        }
      } else {
        toast.error("Insufficient Funds!...");
      }
    }
  }

  const handleBetTypeChange = (type) => {
    setBetType(type);
  };

  const bet_amount_decremental = (id) => {
    if (id === 1) {
      setExtraBetAmount1((prev) => prev - 10);
      localStorage.setItem("extraBetAmount1", extraBetAmount1 - 10);
    } else {
      setExtraBetAmount2((prev) => prev - 10);
      localStorage.setItem("extraBetAmount2", extraBetAmount2 - 10);
    }
  };

  const bet_amount_incremental = (id) => {
    if (id === 1) {
      setExtraBetAmount1((prev) => prev + 10);
      localStorage.setItem("extraBetAmount1", extraBetAmount1 + 10);
    } else {
      setExtraBetAmount2((prev) => prev + 10);
      localStorage.setItem("extraBetAmount2", extraBetAmount2 + 10);
    }
  };

  const select_direct_bet_amount = useCallback(
    (amount, id) => {
      if (id === 1) {
        localStorage.setItem("extraBetAmount1", amount);
        setExtraBetAmount1(amount);
      } else if (id === 2) {
        localStorage.setItem("extraBetAmount2", amount);
        setExtraBetAmount2(amount);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    const withdrawalKey = `withdrawn${id}`;
    const performWithdrawal = async () => {
      if (autoCashOut) {
        if (!withdrawn1 && id == 1) {
          const data = { multiplier: autoCashOutValue, betId: betId1, id: 1 };
          const res = await postData("/bet/withdraw", data);
          if (res.status || res.success) {
            mutate("/user/getUserInfo");
            mutate(`/user/getmybets?phone=${user?.phone}`);

            toast.success(res.message ? res.message : "Money Debited");
            if (socket) {
              socket.emit("withdrawCount", 1);
            }
            dispatch({ type: withdrawalKey, payload: true });
            if (data.betId === betId1) {
              dispatch({ type: "withdrawn1", payload: true });
              dispatch({ type: "isBet1", payload: false });
            } else {
              dispatch({ type: "withdrawn2", payload: true });
              dispatch({ type: "isBet2", payload: false });
            }
          }
        }
        if (!withdrawn2 && id == 2) {
          const data = { multiplier: autoCashOutValue, betId: betId2, id: 2 };
          const res = await postData("/bet/withdraw", data);
          if (res.status || res.success) {
            mutate("/user/getUserInfo");
            mutate(`/user/getmybets?phone=${user?.phone}`);

            toast.success(res.message ? res.message : "Money Debited");
            if (socket) {
              socket.emit("withdrawCount", 1);
            }
            dispatch({ type: withdrawalKey, payload: true });
            if (data.betId === betId1) {
              dispatch({ type: "withdrawn1", payload: true });
              dispatch({ type: "isBet1", payload: false });
            } else {
              dispatch({ type: "withdrawn2", payload: true });
              dispatch({ type: "isBet2", payload: false });
            }
          }
        }
      }
    };
    if (
      planeValue == Number(autoCashOutValue) &&
      gameStarted &&
      betType === 1 &&
      (isBet1 === true || isBet2 === true) &&
      Number(autoCashOutValue) >= 1.2
    )
      performWithdrawal(); // Call the async function
  }, [autoCashOut, betId1, betId2, id, planeValue, gameStarted]);

  useEffect(() => {
    const extraBetAmount = id === 1 ? extraBetAmount1 : extraBetAmount2;
    async function PlaceBet() {
      const isBetPlaced = id === 1 ? isBet1 : isBet2;
      if (extraBetAmount < 10) {
        toast.error("Minimum Stake Amount is 10");
      }
      if (!isBetPlaced) {
        const data = { betAmount: extraBetAmount };
        let res;
        if (id == 1) {
          res = await postData("/bet/place", data);
        } else {
          res = await postData("/bet/place2", data);
        }
        if (res.error) {
          toast.error("You Account Has Been blocked, you can't place bet!..");
        }
        if (res.status || res.success) {
          mutate("/user/getUserInfo");
          mutate(`/user/getmybets?phone=${user?.phone}`);
          toast.success("Stake Placed!...");
          dispatch({ type: id === 1 ? "isBet1" : "isBet2", payload: true });
          id === 1 ? setBetId1(res.betId) : setBetId2(res.betId);
          if (id === 1) {
            localStorage.setItem("betId1", res.betId);
          } else {
            localStorage.setItem("betId2", res.betId);
          }
          if (socket) {
            socket.emit("betPlaced", 1);
          }
        }
      }
    }
    if (!gameStarted && betType === 1) {
      PlaceBet();
    }
  }, [autoCashOut, user, gameStarted]);
  async function handleCashOut(id) {
    if (!gameStarted) {
      toast.error("game is not started yet!..");
      return; // Explicit return to prevent further execution
    }
    id === 1 ? dispatch({ type: "fakeBet1" }) : dispatch({ type: "fakeBet2" });
    const withdrawalKey = `withdrawn${id}`;
    if (!withdrawn1 || !withdrawn2) {
      const data =
        id === 1
          ? { multiplier: planeValue, betId: betId1, id: 1 }
          : { multiplier: planeValue, betId: betId2, id: 2 };
      const res = await postData("/bet/withdraw", data);
      if (res.status || res.success) {
        mutate("/user/getUserInfo");
        mutate(`/user/getmybets?phone=${user?.phone}`);
        toast.success(res.message ? res.message : "Money Debited");
        console.log(res);
        if (socket) {
          socket.emit("withdrawCount", 1);
        }
        dispatch({ type: withdrawalKey, payload: true });
        if (data.betId === betId1) {
          dispatch({ type: "withdrawn1", payload: true });
          dispatch({ type: "isBet1", payload: false });
        } else {
          dispatch({ type: "withdrawn2", payload: true });
          dispatch({ type: "isBet2", payload: false });
        }
      }
    } else {
      toast.error("Money already debited!...");
    }
  }

  return (
    <div className="bet-control double-bet" id="extra_bet_section">
      <div className="controls">
        <div className="navigation">
          <div className="navigation-switcher">
            <div
              className={`slider bet-btn ${betType === 0 ? "active" : ""}`}
              onClick={() => handleBetTypeChange(0)}
            >
              Stake
            </div>
            <div
              className={`slider auto-btn ${betType === 1 ? "active" : ""}`}
              onClick={() => handleBetTypeChange(1)}
            >
              Auto
            </div>
            <span className="active-line"></span>
          </div>
        </div>
        <div className="first-row auto-game-feature">
          <div className="bet-block">
            <div className="spinner">
              <div className="qty-buttons">
                <button
                  className="minus"
                  id="extra_minus_btn"
                  onClick={() => bet_amount_decremental(id)}
                >
                  <span className="material-symbols-outlined">remove</span>
                </button>
                <div className="input">
                  <input
                    id="bet_amount"
                    type="number"
                    value={id === 1 ? extraBetAmount1 : extraBetAmount2}
                    className="extra_bet_amount"
                    onChange={(e) => {
                      const parsedValue = e.target.value;
                      if (id === 1) {
                        localStorage.setItem("extraBetAmount1", parsedValue);
                        setExtraBetAmount1(parsedValue);
                      } else if (id === 2) {
                        localStorage.setItem("extraBetAmount2", parsedValue);
                        setExtraBetAmount2(parsedValue);
                      }
                    }}
                  />
                </div>
                <button
                  className="plus"
                  id="extra_plus_btn"
                  onClick={() => bet_amount_incremental(id)}
                >
                  <span className="material-symbols-outlined">add</span>
                </button>
              </div>
            </div>
            <div className="bets-opt-list">
              <button
                className="btn btn-secondary btn-sm bet-opt extra_amount_btn"
                onClick={() => select_direct_bet_amount(100, id)}
              >
                <span className="amt">100</span>
                <span className="currency">$</span>
              </button>
              <button
                className="btn btn-secondary btn-sm bet-opt extra_amount_btn"
                onClick={() => select_direct_bet_amount(200, id)}
              >
                <span className="amt">200</span>
                <span className="currency">$</span>
              </button>
              <button
                className="btn btn-secondary btn-sm bet-opt extra_amount_btn"
                onClick={() => select_direct_bet_amount(500, id)}
              >
                <span className="amt">500</span>
                <span className="currency">$</span>
              </button>
              <button
                className="btn btn-secondary btn-sm bet-opt extra_amount_btn"
                onClick={() => select_direct_bet_amount(1000, id)}
              >
                <span className="amt">1000</span>
                <span className="currency">$</span>
              </button>
            </div>
          </div>
          {(!isBet1 && !fakeBet1 && id === 1) ||
          (!isBet2 && !fakeBet2 && id !== 1) ? (
            <div className="buttons-block" id="bet_button">
              <button
                className="btn btn-success bet font-family-title ng-star-inserted main_bet_btn"
                id="extra_bet_now"
                onClick={() => handleBet(id)}
              >
                <label className="font-family-title label">Stake</label>
              </button>
            </div>
          ) : null}
          {(id === 1 && fakeBet1) || (id !== 1 && fakeBet2) ? (
            <div className="buttons-block" id="cancel_button">
              <div className="btn-tooltip f-14 mb-1" id="waiting">
                Waiting for next round
              </div>
              <button
                className="btn btn-danger bet font-family-title height-70 ng-star-inserted main_bet_btn"
                id="extra_cancel_now"
                // Uncomment the line below to enable the onClick event if needed
                // onClick={() => cancelNow(id)}
              >
                <label className="font-family-title label">
                  Waiting For Next Round
                </label>
              </button>
            </div>
          ) : null}
          {((id === 1 && isBet1 && !withdrawn1 && !planeCrashed && !fakeBet1) ||
            (id !== 1 &&
              isBet2 &&
              !withdrawn2 &&
              !planeCrashed &&
              !fakeBet2)) && (
            <div className="buttons-block" id="cashout_button">
              <button
                className="btn btn-warning bet font-family-title ng-star-inserted"
                onClick={() => handleCashOut(id)}
                disabled={autoCashOut}
              >
                <label className="font-family-title label">CASH OUT</label>
                <div>{betAmount.toFixed(2)}</div>
                <div
                  className="font-family-title label"
                  id="cash_out_amount"
                ></div>
              </button>
            </div>
          )}
        </div>
        <div className={`text-white ${betType == 0 ? "second-row" : ""}`}>
          <div style={{ display: "flex", gap: "24px" }}>
            <div className=" text-white form-check form-switch lg-switch d-flex align-items-center">
              <label className="form-check-label f-12 me-1" htmlFor="cashout">
                Auto Cash Out
              </label>

              <input
                className="form-check-input m-0"
                type="checkbox"
                role="cashout"
                id="main_checkout"
                onChange={(e) => autoCashOutHandler(e, id)}
                checked={autoCashOut}
              />
            </div>
            <div
              className="spinner small"
              style={{ maxWidth: "100px", height: "24px" }}
            >
              <div className="input full-width">
                <input
                  className="f-16 font-weight-bold"
                  type="Number"
                  id="main_incrementor"
                  required={autoCashOut}
                  value={autoCashOutValue}
                  disabled={!autoCashOut}
                  min={1.2}
                  onChange={(e) => {
                    if (e.target.value < 1.21) {
                      toast.error(
                        "AutoCashout value can't be less than or equal to 1.2"
                      );
                    }
                    setAutoCashOutValue(e.target.value);
                  }}
                />
                <div className="text text-x">
                  <span className="material-symbols-outlined">close</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
