import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import "./styles/other.css";
import "./styles/styles.css";
import "./styles/New.css";
import usePreventRefresh from "../context/usePreventRefresh";
// import { ToastContainer, Flip } from "react-toastify";
function Aviator() {
  usePreventRefresh();
  return (
    <>
      <Routes>
        <Route index element={<Dashboard />} />
      </Routes>
      {/* <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop={true}
        closeOnClick
        draggable
        pauseOnHover
        theme="colored"
        transition={Flip}
      /> */}
    </>
  );
}
export default Aviator;
