import React, { useState, useEffect, useCallback } from "react";
import "./banner.css";
import Img1 from "../../assets/img1.png";
import Img2 from "../../assets/img2.png";
import Img3 from "../../assets/img3.png";
import Img4 from "../../assets/img4.png";
import Img5 from "../../assets/img5.png";

// Array of slide images and titles
const slides = [
  { URL: Img1, title: "Slide 1" },
  { URL: Img2, title: "Slide 2" },
  { URL: Img3, title: "Slide 3" },
  { URL: Img4, title: "Slide 4" },
  { URL: Img5, title: "Slide 5" },
];

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Preload images for better performance
  useEffect(() => {
    const imagePreloads = slides.map((slide) => {
      const img = new Image();
      img.src = slide.URL;
      return img;
    });

    return () => {
      // Cleanup images (optional)
      imagePreloads.forEach((img) => {
        img.onload = null;
        img.onerror = null;
      });
    };
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

  // Function to handle manual slide change
  const handleSlideChange = useCallback((index) => {
    setCurrentSlide(index);
  }, []);

  // Avoid rendering if no slides
  if (!slides.length) {
    return null;
  }

  return (
    <div className="banner">
      <div className="banner-content">
        <img
          src={slides[currentSlide].URL}
          className="slider-img"
          alt={slides[currentSlide].title}
          // Adding a fade-in effect for smooth transitions
          style={{ transition: "opacity 0.5s ease-in-out" }}
        />
      </div>
      <div className="banner-controls">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`control-dot ${currentSlide === index ? "active" : ""}`}
            onClick={() => handleSlideChange(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
