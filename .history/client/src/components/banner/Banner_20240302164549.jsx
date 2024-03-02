import React, { useState, useEffect } from "react";
import "./banner.css";
import Img1 from "../../assets/img1.png";
import BannerImg
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
  const [scrollPosition, setScrollPosition] = useState(0);
  const [bannerHeight, setBannerHeight] = useState("calc(100vh - 48px)"); // Adjust 60px based on your navigation height

  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.pageYOffset;
      setScrollPosition(currentPosition);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setBannerHeight(
        `calc(100vh - ${document.querySelector(".navigation").offsetHeight}px)`
      );
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className="banner"
      style={{ height: scrollPosition > 48 ? "100vh" : bannerHeight }}
    >
      <div className="banner-content">
        <img src={Img1} className="slider-img" alt="" srcset="" />
      </div>
    </div>
  );
};

export default Banner;

