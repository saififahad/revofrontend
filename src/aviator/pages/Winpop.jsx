import { IoClose } from "react-icons/io5";
import "./../styles/HistoryTop.css";
function Winpop({ multiplier, amount, closeToast }) {
  return (
    <div className="win-pop">
      <div className="win-heading">
        <h3>You Have Cashed Out</h3>
        <h4>{amount}</h4>
      </div>
      <div className="win-button">
        <h2>Win Money</h2>
        <h3>{multiplier}</h3>
      </div>
      <div className="cross-win" onClick={closeToast}>
        <IoClose />
      </div>
    </div>
  );
}

export default function showToast(amount, multiplier) {
  toast(<Winpop amount={amount} multiplier={multiplier} />, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}
