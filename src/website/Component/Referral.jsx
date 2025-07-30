import React, { useState } from "react";
import useSWR from "swr";
import "../Styles/Tree.css";
import { fetchData } from "../../api/ClientFunction";
import { useAuth } from "../../context/AuthContext";

const UserTable = () => {
  const { user } = useAuth();
  const { data, error } = useSWR("/user/mlmtree", fetchData);
  const [currentPage, setCurrentPage] = useState({
    level1: 1,
    level2: 1,
    level3: 1,
    level4: 1,
    level5: 1,
  });
  const itemsPerPage = 5;

  const handleNextPage = (level) => {
    setCurrentPage((prev) => ({
      ...prev,
      [level]: prev[level] + 1,
    }));
  };

  const handlePrevPage = (level) => {
    setCurrentPage((prev) => ({
      ...prev,
      [level]: prev[level] - 1,
    }));
  };

  const totalMembers = (level) => data?.data?.[level]?.length ?? 0;

  const paginateData = (level) => {
    const startIndex = (currentPage[level] - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data?.data?.[level]?.slice(startIndex, endIndex);
  };

  if (error) return <div>Error loading data</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className="user-container">
      <div className="current-bal">
        <div className="current-bal-child">
          <h1>Parent UserName</h1>
          <span className="points">{user?.parentUser?.name_user}</span>
        </div>
        <div className="current-bal-child">
          <h1>Parent Email</h1>
          <span className="points">{user?.parentUser?.email}</span>
        </div>
        <div className="current-bal-child">
          <h1>Parent Phone</h1>
          <p className="points">{user?.parentUser?.phone}</p>
        </div>
      </div>
      {["level1", "level2", "level3", "level4", "level5"].map((level) => (
        <div key={level} className="level-section">
          <div>
            <div className="level-header">
              <h3>{level.toUpperCase()}</h3>
              <div>Earning:{data.data?.user[level]}</div>
              <div>Total Members: {totalMembers(level)}</div>
            </div>
            <table className="user-table">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Parent Username</th>
                  <th>Parent Email</th>
                  <th>Parent Phone</th>
                </tr>
              </thead>
              <tbody>
                {paginateData(level)?.map((item) => (
                  <tr key={item?.user?.id}>
                    <td>{item?.user?.name_user}</td>
                    <td>{item?.user?.email}</td>
                    <td>{item?.user?.phone}</td>
                    <td>{item?.parent?.name_user}</td>
                    <td>{item?.parent?.email}</td>
                    <td>{item?.parent?.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {totalMembers(level) > itemsPerPage && (
              <div className="pagination-controls">
                <button
                  className="page-btn"
                  onClick={() => handlePrevPage(level)}
                  disabled={currentPage[level] === 1}
                >
                  Previous
                </button>
                <span className="current-page">{currentPage[level]}</span>
                <button
                  onClick={() => handleNextPage(level)}
                  className="page-btn"
                  disabled={
                    currentPage[level] * itemsPerPage >= totalMembers(level)
                  }
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserTable;
