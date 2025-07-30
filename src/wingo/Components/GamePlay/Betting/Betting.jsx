import React, { useState, useEffect } from "react";
import "../../../styles/main.css";
import BettingHead from "../BettingHead/BettingHead";
import BettingNumC from "../BettingNumC/BettingNumC";
import BettingMultiple from "../BettingMultiple/BettingMultiple";
import BettingFoot from "../BettingFoot/BettingFoot";
import BettingPopup from "../BettingPopup/BettingPopup";
import TimeLeft from "../TimeLeftComponent/TimeLeftComponent";
import GameListComponent from "../GameTime/GameListComponent";
import PreSaleModal from "../PreSaleModal/PreSaleModal";
import AmountError from "../AmountError/AmountError";

const Betting = ({ round, setRound, setGame, game }) => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [theme, setTheme] = useState({});
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [activeRoom, setActiveRoom] = useState(0);
  const [activeMultiplier, setActiveMultiplier] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPreSaleModalOpen, setIsPreSaleModal] = useState(false);
  const [errorModal, setIsErrorModal] = useState(false);
  const [timerClosed, setTimerClosed] = useState(false);

  const handleErrorModalOpen = () => {
    setIsErrorModal(true);
  };
  const handleErrorModalClose = () => {
    setIsErrorModal(false);
  };

  const handlePreSaleModalOpen = () => {
    setIsPreSaleModal(true);
  };
  const handlePreSaleModalClose = () => {
    setIsPreSaleModal(false);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleButtonClick = (theme, number) => {
    setTheme(theme);
    setSelectedNumber(number);
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
    resetActiveMultiplier();
    setSelectedNumber(null);
  };

  const resetActiveMultiplier = () => {
    setActiveMultiplier(1); // Set activeMultiplier to default value
  };

  const handleGameChange = (roomIndex) => {
    setActiveRoom(roomIndex);
  };

  const handlePopupOpen = (value, colorTheme) => {
    setSelectedValue(value);
    setTheme(
      colorTheme || { background: "white", text: "black", button: "grey" }
    );
    setPopupOpen(true);
  };

  const themes = {
    green: { background: "green", text: "white", button: "darkgreen" },
    red: { background: "red", text: "white", button: "darkred" },
    gradient_5: {
      background: "linear-gradient(192deg, purple 24%, green 10%)",
      text: "white",
      button: "purple",
    },
    gradient_0: {
      background: "linear-gradient(192deg, red 24%, purple 10%)",
      text: "white",
      button: "purple",
    },
  };

  const handleRandomClick = () => {
    const randomNumber = Math.floor(Math.random() * 10);
    let theme;
    if ([1, 3, 7, 9].includes(randomNumber)) {
      theme = themes.green;
    } else if ([2, 4, 6, 8].includes(randomNumber)) {
      theme = themes.red;
    } else if (randomNumber === 0) {
      theme = themes.gradient_0;
    } else if (randomNumber === 5) {
      theme = themes.gradient_5;
    } else {
      theme = { background: "white", text: "black", button: "grey" };
    }
    handleButtonClick(theme, randomNumber);
  };

  // Callback function to close the timer after 5 seconds
  const handleTimerClose = () => {
    setTimerClosed(true);
  };

  // const handleRandomClick = async () => {
  //   const randomNumber = await animateIcons();
  //   handleButtonClick(theme[randomNumber], randomNumber);
  // };

  // const animateIcons = () => {
  //   return new Promise(resolve => {
  //     const randomNumber = Math.floor(Math.random() * 10);
  //     const event = new CustomEvent('animateIcons', { detail: randomNumber });
  //     window.dispatchEvent(event);
  //     setTimeout(() => resolve(randomNumber), 1000); // Adjust time to match your animation duration
  //   });
  // };

  const rooms = [
    { roomId: 1, interval: 1 },
    { roomId: 2, interval: 3 },
    { roomId: 3, interval: 5 },
    { roomId: 4, interval: 10 },
  ];

  return (
    <div className="Betting__C">
      <GameListComponent onGameChange={handleGameChange} setGame={setGame} />
      {rooms.map(
        (room, index) =>
          index === activeRoom && (
            <TimeLeft
              key={room.roomId}
              TimeLeftId={room.roomId}
              interval={room.interval}
              isActive={index === activeRoom}
              onClose={handleTimerClose}
              round={round}
              setRound={setRound}
            />
          )
      )}
      <BettingHead  onButtonClick={handleButtonClick}/>
      <BettingNumC onButtonClick={handleButtonClick} />
      <BettingMultiple
        activeMultiplier={activeMultiplier}
        setActiveMultiplier={setActiveMultiplier}
        onRandomClick={handleRandomClick}
      />
      <BettingFoot onPopupOpen={handlePopupOpen} onButtonClick={handleButtonClick}/>
      <BettingPopup
        theme={theme}
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        selectedNumber={selectedNumber}
        selectedValue={selectedValue}
        selectedColor={selectedColor}
        activeMultiplier={activeMultiplier}
        PreSaleModal={handlePreSaleModalOpen}
        handleErrorModalOpen={handleErrorModalOpen}
        resetActiveMultiplier={resetActiveMultiplier}
        round={round}
        game={game}
      />
      <PreSaleModal
        isOpen={isPreSaleModalOpen}
        onClose={handlePreSaleModalClose}
      />
      <AmountError isOpen={errorModal} onClose={handleErrorModalClose} />
    </div>
  );
};

export default Betting;
