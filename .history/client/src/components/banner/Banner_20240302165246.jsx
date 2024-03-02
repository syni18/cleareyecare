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

  return (
    <div
      className="banner"
    >
      <div className="banner-content">
        <img src={BannerImg} className="slider-img" alt="" srcset="" />
      </div>
    </div>
  );
};

export default Banner;

