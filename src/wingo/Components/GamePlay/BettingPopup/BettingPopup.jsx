import React, { useState, useEffect, useCallback } from "react";
import "../../../styles/main.css";
import success from "../../../../assets/wingo/images/success.png";
import useSWR, { mutate } from "swr";
import { fetchData, postData } from "../../../../api/ClientFunction";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BettingPopup = ({
  theme = { background: "white", text: "black", button: "grey" },
  isOpen,
  onClose,
  selectedNumber,
  selectedValue,
  PreSaleModal,
  activeMultiplier,
  handleErrorModalOpen,
  resetActiveMultiplier,
  round,
  game,
}) => {
  const { data, error } = useSWR(
    `/wingo/mybets?game=${game}&page=1&limit=10`,
    fetchData
  );

  const [quantity, setQuantity] = useState(1);
  const [popupActiveMultiplier, setPopupActiveMultiplier] =
    useState(activeMultiplier);
  console.log("m: ", activeMultiplier);
  const [balance, setBalance] = useState(10);
  const [activeBalance, setActiveBalance] = useState(10);
  const [totalAmount, setTotalAmount] = useState(10);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTotalAmount(activeBalance * quantity * popupActiveMultiplier);
  }, [activeBalance, quantity, popupActiveMultiplier]);

  useEffect(() => {
    setPopupActiveMultiplier(activeMultiplier);
  }, [activeMultiplier]);

  const clearInputs = useCallback(() => {
    setQuantity(1);
    setBalance(10);
    setActiveBalance(10);
    setTotalAmount(10);
  }, []);

  const handleBalanceClick = useCallback(
    (value) => {
      setBalance(value);
      setActiveBalance(value);
      setTotalAmount(value * quantity * popupActiveMultiplier);
    },
    [quantity, popupActiveMultiplier]
  );

  const handleMultiplierClick = useCallback(
    (multiplier) => {
      // setQuantity(multiplier);
      setPopupActiveMultiplier(multiplier);
      setTotalAmount(activeBalance * multiplier * popupActiveMultiplier);
    },
    [activeBalance, popupActiveMultiplier]
  );

  const handleClose = useCallback(() => {
    setBalance(10);
    setActiveBalance(10);
    clearInputs();
    onClose();
    resetActiveMultiplier(1);
    setPopupActiveMultiplier(1);
    setLoading(false);
  }, [clearInputs, onClose, resetActiveMultiplier]);

  // Function Handling posData method
  async function handleData() {
    setLoading(true);

    let join = "";

    switch (selectedNumber) {
      case "Big":
        join = "l";
        break;
      case "Small":
        join = "n";
        break;
      case "Violet":
        join = "t";
        break;
      case "Red":
        join = "d";
        break;
      case "Green":
        join = "x";
        break;
      case "red-violet":
        join = "0";
        break;
      case "green-violet":
        join = "5";
        break;
      default:
        join = selectedNumber;
    }

    // Validate inputs
    if (!game || !quantity || !totalAmount || !round) {
      toast.error("Missing required data.");
      setLoading(false);
      return;
    }

    const data = {
      typeid: game,
      join: join.toString(),
      x: quantity,
      money: Math.ceil(totalAmount / quantity),
      stage: round,
    };

    console.log("The posted data: ", data);

    try {
      const response = await postData("/wingo/bet", data);

      if (response.status || response.success) {
        // mutate(`/wingo/mybets?game=${game}`);
        await mutate(`/wingo/mybets?game=${game}&page=1&limit=10`);
        mutate("/user/getUserInfo");
        toast.success("Bet placed successfully!");
        handleClose();
      } else {
        toast.error(response.message || "Failed to place bet.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content" style={{ background: theme.background }}>
        <div className="headers">
          <div className="popup-header" style={{ color: theme.text }}>
            Win Go 1Min
          </div>
          <div className="popup-header_2">
            {selectedNumber !== null
              ? `Selected: ${selectedNumber}`
              : `Select ${selectedValue}`}
          </div>
        </div>
        <div className="popup-body">
          <div className="blance">
            <label>Balance</label>
            <div className="balance-options">
              {[10, 50, 100, 500, 1000].map((value) => (
                <button
                  key={value}
                  style={{
                    background:
                      value === activeBalance
                        ? theme.button
                        : "rgba(41, 39, 39, 0.150)",
                    color: value === activeBalance ? theme.text : theme.button,
                  }}
                  onClick={() => handleBalanceClick(value)}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
          <div className="quantity">
            <label>Quantity</label>
            <div className="quantity-controls">
              <button
                style={{ background: theme.button }}
                onClick={() =>
                  setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1))
                }
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
              <button
                style={{ background: theme.button }}
                onClick={() => setQuantity((prevQuantity) => prevQuantity + 1)}
              >
                +
              </button>
            </div>
          </div>
          <div className="multipliers">
            {[1, 5, 10, 20, 50, 100].map((multiplier) => (
              <button
                key={multiplier}
                style={{
                  background:
                    multiplier === popupActiveMultiplier
                      ? theme.button
                      : "rgba(41, 39, 39, 0.150)",
                  color:
                    multiplier === popupActiveMultiplier
                      ? theme.text
                      : theme.button,
                }}
                onClick={() => handleMultiplierClick(multiplier)}
              >
                X{multiplier}
              </button>
            ))}
          </div>
          <div className="agreements">
            {/* <span className="success_icon">
              <img src={success} alt="success" />
            </span>
            <span className="agree">I agree</span>
            <span className="preSaleRules" onClick={PreSaleModal}>
              《Pre-sale rules》
            </span> */}
          </div>
        </div>
        <div className="popup-footer">
          <button className="popup-close" onClick={handleClose}>
            Cancel
          </button>
          <button
            className="popup-confirm"
            style={{ background: theme.button }}
            onClick={handleData}
            disabled={loading}
          >
            {loading ? "Placing bet..." : `Total amount $${totalAmount}.00`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BettingPopup;
