import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { fetchData } from "./../../api/ClientFunction";
import "../Styles/MyWallet.css";

const TransactionsTable = () => {
  const [page, setPage] = useState(1); // Start at page 1
  const [tdata, setTData] = useState({ transactions: [], totalPage: 1 });
  const { data, error } = useSWR(
    `/user/alltransaction?page=${page}&limit=10`,
    fetchData
  );

  function formatDate(dateString) {
    const date = new Date(dateString);

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = date.getMinutes();

    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12;

    const minutesFormatted = minutes < 10 ? "0" + minutes : minutes;

    const formattedDate = `${day}-${month}-${year}`;
    const formattedTime = `${hours}:${minutesFormatted} ${ampm}`;

    return (
      <p style={{ width: "160px" }}>
        {formattedDate} {formattedTime}
      </p>
    );
  }

  useEffect(() => {
    if (data && data.transactions) {
      setTData({
        transactions: data.transactions,
        totalPage: data.pagination.totalPages,
      });
    }
  }, [data]);

  const handlePrevious = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const handleNext = () => {
    if (page < tdata.totalPage) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="table-parent">
      <div className="table-container">
        <table className="transactions-table">
          <thead className="table-head-transaction">
            <tr className="transaction-head-items">
              <th>Date & Time</th>
              {/* <th>ID</th> */}
              <th>Username</th>
              <th>Currency</th>
              <th>Token</th>
              <th>USD Value</th>
              <th>Transaction Type</th>
              <th>Receiver Address</th>
              <th>Sender Address</th>
            </tr>
          </thead>
          <tbody>
            {tdata.transactions.map((transaction, index) => (
              <tr key={index}>
                <td className="date-box-table">
                  {formatDate(transaction.date)}
                </td>
                {/* <td className="date-box">{transaction.id}</td> */}
                <td className="date-box-table">{transaction.name_user}</td>
                <td className="date-box-table">{transaction.cur}</td>
                <td className="date-box-table">{transaction.token}</td>
                <td className="date-box-table">{transaction.points}</td>
                <td
                  className={transaction.type === "w" ? "withdraw" : "credit"}
                >
                  {transaction.type === "w"
                    ? "Debit"
                    : transaction.type === "d"
                    ? "Credit"
                    : "Bonus"}
                </td>
                <td className="truncated-address date-box-table">
                  {transaction.receiver}
                </td>
                <td className="truncated-address  date-box-table">
                  {transaction.sender}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination-buttons">
        <button
          onClick={handlePrevious}
          disabled={page <= 1}
          className="page-btn"
        >
          Previous
        </button>
        <span>
          {page} of {tdata.totalPage}
        </span>
        <button
          className="page-btn"
          onClick={handleNext}
          disabled={page >= tdata.totalPage}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TransactionsTable;
