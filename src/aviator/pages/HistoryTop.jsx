import React, { useEffect, useState } from "react";
import { useSocket } from "../../context/SocketContext";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import { MdHistory } from "react-icons/md";

import "../styles/HistoryTop.css";

const HistoryTop = () => {
  const socket = useSocket();
  const [history, setHistory] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [ndata, setNdata] = useState([]);

  useEffect(() => {
    if (history.length > 0) {
      setNdata([...history].reverse());
    }
  }, [history]);

  useEffect(() => {
    if (socket) {
      socket.on("lastCrashed", (data) => {
        setHistory(data);
      });
    }
  }, [socket,history]);

  const DropHandler = () => {
    setIsOpen(!isOpen);
  };

  const getClassName = (item) => {
    if (item > 10) {
      return "last";
    } else if (item > 2) {
      return "second";
    } else {
      return "initial";
    }
  };

  const displayedData = isOpen ? ndata : ndata.slice(0, 25);

  return (
    <div className="history-top-container">
      <div className="payouts-wrapper-part">
        <div className={`payouts-block-part ${isOpen ? "open" : ""}`}>
          {displayedData &&
            displayedData.map((item, index) => (
              <div key={index} className={`listed-data ${getClassName(item)}`}>
                {item}
              </div>
            ))}
        </div>
        {ndata.length > 20 && (
          <div className="drop-icon" onClick={DropHandler}>
            <MdHistory />
            {isOpen ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryTop;
