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

  const [curIdx, setCurIdx] = useState(2);

  const SliderPrevious = () => {
    const isFirstSlide = curIdx === 0;
    const newIdx = isFirstSlide ? slides.length - 1 : curIdx - 1;
    setCurIdx(newIdx);
  };

  const SliderNext = () => {
    const isLastSlide = curIdx === slides.length - 1;
    const newIdx = isLastSlide ? 0 : curIdx + 1;
    setCurIdx(newIdx);
  };

  const goToSlide = (index) => {
    setCurIdx(index);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      SliderNext();
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, [curIdx]);

  return (
    <section className="slider-wrapper">
      <div className="slider-previous" onClick={SliderPrevious}>
        <ChevronLeft size={45} />
      </div>
      <div
        className="slider-container"
        style={{
          transform: `translateX(${-curIdx * 85}%)`,
          transition: "transform 1s ease-in-out", // Adjust the duration and easing as needed
        }}
      >
        <img src={slides[curIdx].URL} alt={"Slide"} />
      </div>
      <div className="slider-next" onClick={SliderNext}>
        <ChevronRight size={45} />
      </div>
    </section>
  );
}

export default Banner;
