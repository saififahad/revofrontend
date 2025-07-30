import { Routes, Route } from "react-router-dom";
import "./styles/ludo.scss";
import { ToastContainer, Flip } from "react-toastify";
import LudoBoard from "./pages/LudoBoard";
function Ludo() {
  return (
    <>
      <Routes>
        <Route index element={<LudoBoard />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop={true}
        closeOnClick
        draggable
        pauseOnHover
        theme="colored"
        transition={Flip}
      />
    </>
  );
}
export default Ludo;
