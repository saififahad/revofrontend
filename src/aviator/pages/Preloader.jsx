import pump from "../../assets/pump.png";
import "../styles/loader.css";

const PreLoader = () => {
  return (
    <div className="load-txt">
      <div className="loading-game-1">
        <div className="center-loading text-white text-center">
          <img src={pump} alt="Wheel" className="wheel" />
          <div className="secondary-font f-40 mt-2 waiting-text">
            WAITING FOR NEXT ROUND
          </div>
          <div className="line-loader mt-2">
            <div className="fill-line"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreLoader;
