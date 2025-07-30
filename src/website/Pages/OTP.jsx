import React, { useState, useEffect } from "react";

const OTP = ({ onTimerComplete }) => {
  const [timeLeft, setTimeLeft] = useState(120);

  useEffect(() => {
    if (timeLeft === 0) {
      onTimerComplete();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimerComplete]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <div className="otp-timer">
      {timeLeft > 0 ? (
        <p>Time left: {formatTime(timeLeft)}</p>
      ) : (
        <p>OTP expired</p>
      )}
    </div>
  );
};

export default OTP;
