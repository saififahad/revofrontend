import React, { useState, useEffect, useRef } from "react";
import "../../../styles/main.css";
import zero from "../../../../assets/wingo/images/n0.png";
import one from "../../../../assets/wingo/images/n1.png";
import two from "../../../../assets/wingo/images/n2.png";
import three from "../../../../assets/wingo/images/n3.png";
import four from "../../../../assets/wingo/images/n4.png";
import five from "../../../../assets/wingo/images/n5.png";
import six from "../../../../assets/wingo/images/n6.png";
import seven from "../../../../assets/wingo/images/n7.png";
import eight from "../../../../assets/wingo/images/n8.png";
import nine from "../../../../assets/wingo/images/n9.png";
import LossPopup from "../../../Components/WinlossPopup/LossPopup";
import InstructionsModal from "../InstructionsModal/InstructionsModal";
import BeepTimer from "../BeepTimer/BeepTimer";
import useSWR, { mutate } from "swr";
import { fetchData, baseURL } from "../../../../api/ClientFunction";
import { io } from "socket.io-client";
import { toast } from "react-toastify";
const imageUrls = [zero, one, two, three, four, five, six, seven, eight, nine];

const generateRandomNumbers = () => {
  return Array.from({ length: 4 }, () => Math.floor(Math.random() * 10));
};
const formatTime = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;
  return [
    Math.floor(minutes / 10),
    minutes % 10,
    Math.floor(seconds / 10),
    seconds % 10,
  ];
};

const TimeLeft = ({ interval, setRound, round }) => {
  const { data } = useSWR(`/wingo/currentgame?game=${interval}`, fetchData);
  useEffect(() => {
    if (data && data?.period) {
      setRound(data.period);
    }
  }, [data]);
  const [numbers, setNumbers] = useState(generateRandomNumbers());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showBeepTimer, setShowBeepTimer] = useState(false);
  useEffect(() => {
    if (showBeepTimer) {
      const beepTimer = setTimeout(() => {
        setShowBeepTimer(false);
      }, 5000); // 5 seconds for the beep timer
      return () => clearTimeout(beepTimer);
    }
  }, [showBeepTimer]);

  return (
    <div className="TimeLeft__C">
      <div className="TimeLeft__C-rule" onClick={() => setIsModalOpen(true)}>
        How to play
      </div>
      <div className="TimeLeft__C-name">Win Go {interval}Min</div>
      <div className="TimeLeft__C-num">
        {numbers.map((value, index) => (
          <div
            key={index}
            className={`n${value}`}
            style={{ backgroundImage: `url(${imageUrls[value]})` }}
          />
        ))}
      </div>
      <TimeRemaining
        interval={interval}
        setShowBeepTimer={setShowBeepTimer}
        setNumbers={setNumbers}
        round={round}
      />
      <div className="TimeLeft__C-id" bis_skin_checked="1">
        {round}
      </div>
      <InstructionsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        game = {interval}
      />
      {showBeepTimer && <BeepTimer onClose={() => setShowBeepTimer(false)} />}
    </div>
  );
};

export default TimeLeft;

function TimeRemaining({ interval, setShowBeepTimer, setNumbers, round }) {
  const [isVisible, setIsVisible] = useState(false);
  const [time, setTime] = useState(0);
  const [finalResult, setFinalResult] = useState(0);
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const newSocket = io(baseURL);
    setSocket(newSocket);
    return () => newSocket.close();
  }, []);
  const countdown = `countdown${interval}`;
  const result = `result${interval}`;
  useEffect(() => {
    if (socket) {
      socket.on(countdown, (newTime) => {
        setTime(newTime);
        if (newTime === 5) {
          setShowBeepTimer(true);
        }
        if (newTime === 0) {
          setNumbers(generateRandomNumbers());
        }
      });
      return () => {
        socket.off(countdown);
      };
    }
  }, [socket, interval]);
  useEffect(() => {
    if (socket) {
      const handleResult = (dResult) => {
        setFinalResult(dResult);
        setIsVisible(true);
        mutate(`/wingo/currentgame?game=${interval}`);
        mutate(`/wingo/gamehistory?game=${interval}&page=1&limit=10`);
        mutate(`/wingo/mybets?game=${interval}&page=1&limit=10`);
        mutate("/user/getUserInfo");
      };

      socket.on(result, handleResult);
      return () => {
        socket.off(result, handleResult);
      };
    }
  }, [socket, interval, result]); // E
  const numericValues = formatTime(time);
  return (
    <>
      {isVisible && (
        <LossPopup
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          result={finalResult}
          game={interval}
          round={Number(round - 1)}
        />
      )}
      <div className="TimeLeft__C-text">Time remaining</div>
      <div className="TimeLeft__C-time">
        {numericValues.map((value, index) => (
          <div key={index}>{value}</div>
        ))}
      </div>
    </>
  );
}
