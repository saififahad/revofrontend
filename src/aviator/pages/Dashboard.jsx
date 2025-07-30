import LeftSidebar from "./LeftSidebar";
import HistoryTop from "./HistoryTop";
import StageBoard from "./StageBoard";
import BetControls from "./BetControls";
import HeaderBottom from "./HeaderBottom";
import "../styles/HistoryTop.css";
export default function Dashboard() {
  return (
    <div className="dark-bg-main overflow-hidden position-relative ">
      <HeaderBottom />
      <div className="main-container full-game-container">
        <LeftSidebar />
        <div className="right-sidebar">
          <div>
            <HistoryTop />
            <StageBoard />
          </div>
          <BetControls />
        </div>
      </div>
    </div>
  );
}
