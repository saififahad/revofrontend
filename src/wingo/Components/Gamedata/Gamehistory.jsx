import React, { useState, useEffect } from "react";
import "../../styles/main.css"; // Assume you have styles here
import useSWR from "swr";
import { fetchData } from "../../../api/ClientFunction";

const generateColor = (result) => {
  if (result === 0) {
    return ["red", "violet"];
  } else if (result === 5) {
    return ["green", "violet"];
  } else if (result % 2 === 0) {
    return ["red"];
  } else {
    return ["green"];
  }
};

const Gamehistory = ({ game }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;
  const [gameHistory, setGameHistory] = useState([]);
  const { data, error, isLoading } = useSWR(
    `wingo/gamehistory?game=${game}&page=${currentPage}&limit=${itemsPerPage}`,
    fetchData
  );
   useEffect(()=>{
    if (data && data?.games) {
      const processedData = data.games.map((item) => ({
        period: item.period,
        result: item.result,
        bigSmall: item.result >= 5 ? "Big" : "Small",
        color: generateColor(item.result),
      }));
      setGameHistory(processedData);
      setTotalPages(Math.ceil(data.length / itemsPerPage));
    }
   },[data])
    

  const handleClick = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const renderPaginationButtons = () => {
    return (
      <div className="pagination-container">
        <button
          className="pagination-arrow"
          onClick={() => handleClick(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        <span className="pagination-info">
          {currentPage}/{totalPages}
        </span>
        <button
          className="pagination-arrow"
          onClick={() => handleClick(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>
    );
  };

  return (
    <div className="gamehistory">
      <div className="history-container">
        <div className="table-titles">
          <table>
            <thead>
              <tr className="table-headers">
                <th>Period</th>
                <th>Result</th>
                <th>Big/Small</th>
                <th>Color</th>
              </tr>
            </thead>
            <tbody>
              {gameHistory?.map((item, index) => (
                <tr key={index}>
                  <td>{item.period}</td>
                  <td
                    id="resultsection"
                    className={
                      item.result === 0
                        ? "gradient-zero"
                        : item.result === 5
                        ? "gradient-five"
                        : item.color.join(" ")
                    }
                  >
                    {item.result}
                  </td>
                  <td>{item.bigSmall}</td>
                  <td>
                    {item.color.map((col, i) => (
                      <span key={i} className={`color-dot ${col}`}></span>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination">{renderPaginationButtons()}</div>
      </div>
    </div>
  );
};

export default Gamehistory;
