import React from "react";
import Carousel from "react-bootstrap/Carousel";
import slide1 from "../../../assets/wingo/images/slide5.png";
import slide2 from "../../../assets/wingo/images/slide4.png";
import slide3 from "../../../assets/wingo/images/slide3.png";
import "./Slider.css"
const Slider = () => {
  return (
    <div>
      <Carousel data-bs-theme="dark">
        <Carousel.Item>
          <img className="d-block w-100"  src={slide1} alt="First slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={slide2} alt="Second slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={slide3} alt="Third slide" />
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Slider;
