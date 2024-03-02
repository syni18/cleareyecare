import React, { useState, useEffect } from "react";
import "./banner.css";
import Img1 from "../../assets/img1.png";
import Img2 from "../../assets/img2.png";
import Img3 from "../../assets/img3.png";
import Img4 from "../../assets/img4.png";
import Img5 from "../../assets/img5.png";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  { URL: Img1, title: "dummy" },
  { URL: Img2, title: "dummy" },
  { URL: Img3, title: "dummy" },
  { URL: Img4, title: "dummy" },
  { URL: Img5, title: "dummy" },
];

const Banner = () => {
  const [curIdx, setCurIdx] = useState(0);

  const SliderPrevious = () => {
    setCurIdx((prevIdx) => (prevIdx === 0 ? slides.length - 1 : prevIdx - 1));
  };

  const SliderNext = () => {
    setCurIdx((prevIdx) => (prevIdx === slides.length - 1 ? 0 : prevIdx + 1));
  };

  return (
    <section className="banner">
      <div className="slider-wrapper">
        <div className="slider-previous" onClick={SliderPrevious}>
          <ChevronLeft size={45} />
        </div>
        <div className="slider-container">
          <img src={slides[curIdx].URL} alt={"Slide"} />
        </div>
        <div className="slider-next" onClick={SliderNext}>
          <ChevronRight size={45} />
        </div>
      </div>
    </section>
  );
};

export default Banner;
