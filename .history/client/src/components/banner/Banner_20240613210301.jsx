import React, { useState, useEffect } from "react";
import "./banner.css";
import Img1 from "../../assets/img1.png";
import BannerImg from '../../assets/cleareyebanner.jpg'
import Img2 from "../../assets/img2.png";
import Img3 from "../../assets/img3.png";
import Img4 from "../../assets/img4.png";
import Img5 from "../../assets/img5.png";

const slides = [
  { URL: Img1, title: "dummy" },
  { URL: Img2, title: "dummy" },
  { URL: Img3, title: "dummy" },
  { URL: Img4, title: "dummy" },
  { URL: Img5, title: "dummy" },
];
const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Preload images for better performance
  useEffect(() => {
    slides.forEach((slide) => {
      const img = new Image();
      img.src = slide.URL;
    });
  }, []);

  // Automatic slideshow effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === slides.length - 1 ? 0 : prevSlide + 1
      );
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  if (slides.length === 0) {
    return null; // No slides to render, return null or handle differently
  }

  return (
    <div className="banner">
      <div className="banner-content">
        <img
          src={slides[currentSlide].URL}
          className="slider-img"
          alt={slides[currentSlide].title}
        />
      </div>
    </div>
  );
};

export default Banner;