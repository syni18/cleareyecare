import React, { useState, useEffect } from "react";
import "./banner.css";
import Img1 from "../../assets/img1.png";
import Img2 from "../../assets/img2.png";
import Img3 from "../../assets/img3.png";
import Img4 from "../../assets/img4.png";
import Img5 from "../../assets/img5.png";
import { ChevronLeft, ChevronRight } from "lucide-react";

function Banner() {
  const slides = [
    { URL: Img1, title: "dummy" },
    { URL: Img2, title: "dummy" },
    { URL: Img3, title: "dummy" },
    { URL: Img4, title: "dummy" },
    { URL: Img5, title: "dummy" },
  ];

  const [curIdx, setCurIdx] = useState(0);

  const SliderPrevious = () => {
    setCurIdx((prevIdx) => (prevIdx === 0 ? slides.length - 1 : prevIdx - 1));
  };

  const SliderNext = () => {
    setCurIdx((prevIdx) => (prevIdx === slides.length - 1 ? 0 : prevIdx + 1));
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      SliderNext();
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [curIdx]);

  return (
    <section className="slider-wrapper">
      <div className="slider-previous" onClick={SliderPrevious}>
        <ChevronLeft size={45} />
      </div>
      <div className="slider-container">
        <div
          className="slides"
          style={{ transform: `translateX(${-curIdx * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <img key={index} src={slide.URL} alt={`Slide ${index}`} />
          ))}
        </div>
      </div>
      <div className="slider-next" onClick={SliderNext}>
        <ChevronRight size={45} />
      </div>
    </section>
  );
}

export default Banner;
