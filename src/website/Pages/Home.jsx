import React from "react";
import "../Styles/Home.css";
import AuthNavbar from "../Component/AuthNavbar";
import Game from "../Component/Game";
import Block from "../LandingPage/Block";
import Blogs from "../LandingPage/Blogs";
import Footer from "../LandingPage/Footer";
import Advertisments from "../LandingPage/Advertisments";
import GameInfo from "../Component/GameInfo";
import Disclamers from "../Component/Disclamers";

const Home = () => {
  return (
    <div className="Home-layout">
      <AuthNavbar />
      <Game />
      <Disclamers />
      <Advertisments />
      <Footer />
    </div>
  );
};

export default Home;
