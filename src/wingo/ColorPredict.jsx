import React, { useEffect, useState } from "react";
import "./styles/main.css";
import Layout from "./Layout/Layout";
import Loader from "./Pages/Loader";

const ColorPredict = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="Mainbox">
      <div className="centerbox">{loading ? <Loader /> : <Layout />}</div>
    </div>
  );
};

export default ColorPredict;
