// InstructionsModal.js
import React from "react";
import "../../../styles/main.css";

const InstructionsModal = ({ isOpen, onClose, game }) => {
  const handleClose = () => {
    onClose();
  };
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="instru_modal-content">
        <h2>How to Play</h2>
        {/* <div className="instructions">
          <p>
            1 minute {game} issue, {game * 60 - 5} seconds to order, 5 seconds
            waiting for the draw. It opens all day. The total number of trades
            is 1440 issues. if you spend 100 to trade, after deducting the
            service fee of 2%, the contract amount: is 98
          </p>
          <ol>
            <li>
              Select green: if the result shows 1,3,7,9 you will get (98*2)
              =196; If the result shows s 5, you will get (98*1.5) 147
            </li>
            <li>
              Select red: if the result shows 2,4,6,8 you will get (98*2) =196;
              If the result shows 0, you will get (98*1.5) 147
            </li>
            <li>
              Select violet: if the result shows 0 or 5. You will get (98*4.5)
              =441
            </li>
            <li>
              Select number: if the result is the same as the number you
              selected, you will get (98 *9) =882
            </li>
            <li>
              Select big: if the result shows 5, 6,7,8,9 you will get (98*2)
              =196
            </li>
            <li>
              Select small: if the result shows 0, 1,2,3,4 you will get (98*2)
              =196
            </li>
          </ol>
        </div> */}
        <div className="instructions">
          <p>
            {game} minute Game, {game * 60 - 5} seconds to order, 5 seconds
            waiting for the draw. It opens all day. The total number of trades
            is 1440 issues. If you spend 100 to trade, the contract amount is
            100.
          </p>
          <ol>
            <li>
              Select green: if the result shows 1,3,7,9 you will get (100*2) =
              200; If the result shows 5, you will get (100*1.5) = 150.
            </li>
            <li>
              Select red: if the result shows 2,4,6,8 you will get (100*2) =
              200; If the result shows 0, you will get (100*1.5) = 150.
            </li>
            <li>
              Select violet: if the result shows 0 or 5, you will get (100*4.5)
              = 450.
            </li>
            <li>
              Select number: if the result is the same as the number you
              selected, you will get (100*9) = 900.
            </li>
            <li>
              Select big: if the result shows 5, 6, 7, 8, 9, you will get
              (100*2) = 200.
            </li>
            <li>
              Select small: if the result shows 0, 1, 2, 3, 4, you will get
              (100*2) = 200.
            </li>
          </ol>
        </div>

        <div className="modal_btn">
          <button onClick={handleClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default InstructionsModal;
