import React from "react";
import { blogs1, blogs2, blogs3 } from "../../assets/website/index";
import "../Styles/Blogs.css";

const Blogs = () => {
  const objData = [
    {
      id: 1,
      head: "07 March, 2024 , by Admin",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
      imgSrc: blogs1,
    },
    {
      id: 2,
      head: "07 March, 2024 , by Admin",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
      imgSrc: blogs2,
    },
    {
      id: 3,
      head: "07 March, 2024 , by Admin",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
      imgSrc: blogs3,
    },
  ];

  return (
    <div className="Blogs-container">
      <h5>News</h5>
      <h1>Read Our News</h1>
      <div className="blogs-part">
        {objData.map((item) => (
          <div className="blogs-card">
            <img src={item.imgSrc} alt="" />
            <h1>{item.head}</h1>
            <h4>{item.description}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
