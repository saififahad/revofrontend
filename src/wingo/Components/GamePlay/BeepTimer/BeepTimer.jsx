import React, { useState, useEffect, useRef } from 'react';
import '../../../styles/main.css';
import timerSound from '../../../../aviator/sound/beep.mp3';
import { useSettingContext } from '../../../../context/SettingContext';

const StopWatch = () => {
  const [timeLeft, setTimeLeft] = useState(5);
  const beepRef = useRef(null);
  const { state } = useSettingContext();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime > 0) {
          if (state.sound) {
            beepRef.current.play();
          }
          return prevTime - 1;
        } else {
          return 0; // Stop at 0
        }
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [state.sound]);

  return (
    <div className="beep-timer-modal">
      <div className="timer_container">
        <p className='beep_timer'><span>0</span><span>{timeLeft}</span></p>
      </div>
      <audio ref={beepRef} src={timerSound} />
    </div>
  );
};

export default StopWatch;
