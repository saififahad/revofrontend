import React, { useState, useEffect } from "react";
import "../../styles/main.css"; // Assume you have styles here
// import "../../styles/Myhistory.css";
import useSWR from "swr";
import { fetchData } from "../../../api/ClientFunction";

const TransactionDetails = ({ transaction }) => (
  <div className="details-component">
    <h4>Bid Details</h4>
    <p>Order number: {transaction.ordernumber}</p>
    <p>Period: {transaction.period}</p>
    <p>Purchase amount: {transaction.betamount}</p>
    <p>Tax: {transaction.fee}</p>
    <p>Result: {transaction.result}</p>
    <p>Select: {transaction.bigSmall}</p>
    <p>
      Status:{" "}
      <span className={transaction.status.toLowerCase()}>
        {transaction.status}
      </span>
    </p>
    <p>
      Get/Bet-Amount:
      {transaction.status === "Succeeded"
        ? transaction.getamount
        : transaction.betamount}
    </p>
    <p>Order time: {transaction.datetime}</p>
  </div>
);

const MyHistory = ({ showtransaction, game }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [myHistory, setMyHistory] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [totalPages, setTotalPages] = useState(1); // State to keep track of total pages
  const itemsPerPage = 10;

  // Using SWR to fetch data
  const { data, error } = useSWR(
    `/wingo/mybets?game=${game}&page=${currentPage}&limit=${itemsPerPage}`,
    fetchData
  );
  useEffect(() => {
    if (data && data?.bets) {
      const processedData = data.bets.map((item) => ({
        period: item.stage,
        result: item.result,
        bigSmall: item.result >= 5 ? "Big" : "Small",
        betValue: getMappedValue(item.bet),
        status:
          item.status === 0
            ? "Pending"
            : item.status === 1
            ? "Succeeded"
            : "Failed",
        color:
          item.status === 0 ? "yellow" : item.status === 1 ? "green" : "red",
        betcolor: generateColor(item.bet),
        bet: item.bet,
        datetime: extractDate(item.time),
        betamount: item.betAmount,
        getamount: item.get === 0 ? `$${item.betAmount}` : `+$${item.get}`,
        ordernumber: item.id_product,
        quantity: item.bet,
        fee: item.fee,
      }));
      setTotalPages(Math.ceil(data.length / itemsPerPage));

      setMyHistory(processedData);
      setSelectedTransaction(null); // Reset selected transaction when data updates
      // setTotalPages(Math.ceil(data.length / itemsPerPage));
    }
  }, [data]);
  const generateColor = (result) => {
    if (result === " ") {
      return ["red"];
    } else if (result % 2 === 0) {
      return ["red"];
    } else if (result % 2 === 1) {
      return ["green"];
    } else if (result === "n") {
      return ["#6da7f4"];
    } else if (result === "l") {
      return ["#ffa82e"];
    } else if (result === "x") {
      return ["#40ad72"];
    } else if (result === "t") {
      return ["#b659fe"];
    } else if (result === "d") {
      return ["red"];
    } else {
      return ["white"];
    }
  };

  function getMappedValue(input) {
    switch (input) {
      case "l":
        return "Big";
      case "n":
        return "Small";
      case "t":
        return "Violet";
      case "d":
        return "Red";
      case "x":
        return "Green";
      default:
        return input;
    }
  }
  const extractDate = (time) => {
    const apiDate = new Date(time);
    const year = apiDate.getFullYear();
    const month = String(apiDate.getMonth() + 1).padStart(2, "0");
    const day = String(apiDate.getDate()).padStart(2, "0");
    const hours = String(apiDate.getHours()).padStart(2, "0");
    const minutes = String(apiDate.getMinutes()).padStart(2, "0");
    const seconds = String(apiDate.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const handleClick = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleTransactionClick = (transaction) => {
    setSelectedTransaction(
      selectedTransaction === transaction ? null : transaction
    );
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
    <div>
      <div className="history-container">
        <div className="detail-btn">
          <h6>Bid History</h6>
          {/* <button onClick={() => showtransaction("transaction")}>
            Detail <RiCheckboxCircleLine />
          </button> */}
        </div>

        <div className="table-head">
          <div className="head-l">
            <li> Period</li>
            <li> Status</li>
          </div>
          <div className="head-r">
            <li>Bet </li>
            <li> Amount</li>
          </div>
        </div>
        {myHistory.map((item, index) => (
          <div className="history-box" key={index}>
            <div
              className={`history-item ${item.color}`}
              onClick={() => handleTransactionClick(item)}
            >
              <div className="history-info">
                <div className="history-details">
                  <div>{item.period}</div>
                  <div>{item.datetime}</div>
                </div>
              </div>
              <div className={`history-status ${item.status.toLowerCase()}`}>
                {item.status}
              </div>
              <div
                className={`betvalue  ${
                  item.bet === "0"
                    ? "gradient-zero"
                    : item.bet === "5"
                    ? "gradient-five"
                    : item.betcolor.join(" ")
                }`}
                style={{ color: item.betcolor.join(" ") }}
              >
                {item.betValue}
              </div>
              <div className="amount-box">
                <div className={`history-amount failed`}>
                  {`-$${item.betamount}`}
                </div>
                <div className={`history-amount ${item.status.toLowerCase()}`}>
                  {item.status === "Succeeded" ? item.getamount : null}
                </div>
              </div>
            </div>
            {selectedTransaction === item && (
              <TransactionDetails transaction={selectedTransaction} />
            )}
          </div>
        ))}
      </div>
      <div className="pagination">{renderPaginationButtons()}</div>
    </div>
  );
};

export default MyHistory;
