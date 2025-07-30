import { useState } from "react";
import Header from "../Components/Header/Header";
import Datachart from "../Components/Gamedata/Datachart";
import Betting from "../Components/GamePlay/Betting/Betting";
import Transactiondetail from "../Pages/Transactiondetail/Transactiondetail";
import Notification from "../Components/Notification/Notification";
import NotificationBar from "../Components/Notification/NotificationBar";

import Slider from "../Components/Slider/Slider";
import LossPopup from "../Components/WinlossPopup/LossPopup";

const Layout = () => {
  const [round, setRound] = useState();
  const [game, setGame] = useState(1);
  const [showdetail, setShowdetail] = useState("no");
  const showtransaction = (e) => {
    console.log(e);
    setShowdetail(e);
  };

  return (
    <div className="MaiNXBTntainer">
      {/* <Notification showtransaction={showtransaction} /> */}
      {showdetail === "no" && (
        <>
          <Header />
          {/* <Wallet /> */}
          {/* <Slider /> */}
          {/* <Slider/> */}
          {/* <LossPopup /> */}
          <NotificationBar showtransaction={showtransaction} />
          <Betting
            round={round}
            setRound={setRound}
            game={game}
            setGame={setGame}
          />
          <Datachart showtransaction={showtransaction} game={game} />
        </>
      )}

      {showdetail === "notification" && (
        <Notification showtransaction={showtransaction} />
      )}

      {showdetail === "transaction" && (
        <Transactiondetail showtransaction={showtransaction} />
      )}
    </div>
  );
};

export default Layout;
