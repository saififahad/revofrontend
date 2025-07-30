import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import '../../styles/main.css';
import { fetchData } from '../../../api/ClientFunction';

const generateColor = (result) => {
  return result >= 5 ? "red" : "green";
};

const Chart = ({ game }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;
  const [gameHistory, setGameHistory] = useState([]);
  

  const { data, error } = useSWR(
    `/wingo/gamehistory?game=${game}&page=${currentPage}&limit=${itemsPerPage}`,
    fetchData
  );

  useEffect(() => {
    if (data && data.games) {
      const processedData = data.games.map((item) => ({
        period: item.period,
        result: item.result,
        bigSmall: item.result >= 5 ? "Big" : "Small",
        color: generateColor(item.result),
        numbers: Array.from({ length: 10 }, (_, i) => i), // Assuming this is the way to generate numbers
      }));
      setGameHistory(processedData);
      setTotalPages(Math.ceil(data.games.length / itemsPerPage));
    }
  }, [data]);

  const handleClick = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  }

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
    <div className="chart-gamehistory">
      <div className="chart-history-container">
        <div className="chart-table-titles">
          <table>
            <thead>
              <tr className="chart-table-headers">
                <th>Period</th>
                <th>Numbers</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {gameHistory.map((item, index) => (
                <tr key={index}>
                  <td>{item.period}</td>
                  <td>
                    <div className="chart-numbers">
                      {item.numbers.map((num, i) => (
                        <span
                          key={i}
                          className={`chart-number ${
                            item.result === num
                              ? item.result % 2 === 0
                                ? 'chart-red'
                                : 'chart-green'
                              : num % 2 === 0
                              ? "chart-even"
                              : "chart-odd"
                          }`}
                        >
                          {num}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className={`chart-type ${item.bigSmall === 'Big' ? 'chart-type-big' : 'chart-type-small'}`}>
                    {item.bigSmall}
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

export default Chart;
