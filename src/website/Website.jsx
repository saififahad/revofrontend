import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Play from "./Pages/Play";
import Wallet from "./Pages/Wallet";
import Profile from "./Pages/Profile";
function Website() {
  return (
    <>
      <Routes>
        <Route index element={<Home/>}></Route>
        <Route path="/play" element={<Play/>}></Route>
        <Route path="/Wallet" element={<Wallet/>}></Route>
        <Route path="/Profile" element={<Profile  />}></Route>
      </Routes>
    </>
  );
}
export default Website;
