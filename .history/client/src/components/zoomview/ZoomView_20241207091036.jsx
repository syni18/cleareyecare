// ZoomView.js
import React from "react";
import "./zoomview.css";

function ZoomView({ imageUrls, selectedIndex, onClose, onNext, onPrev }) {
  return (
    <div className="zoom-view-wrapper">
      <div className="zoom-view-container">
        {/* <img
          src={imageUrls[selectedIndex]}
          alt="Zoomed Image"
          className="zoomed-image"
        /> */}
        <button className="close-button" onClick={onClose}>
          Close
        </button>
        <button
          className="nav-button prev"
          onClick={onPrev}
          disabled={selectedIndex === 0}
        >
          Prev
        </button>
        <button
          className="nav-button next"
          onClick={onNext}
          disabled={selectedIndex === imageUrls.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ZoomView;
