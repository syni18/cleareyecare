// ZoomView.js
import React from "react";
import "./zoomview.css";

function ZoomView({ imageUrl, onClose }) {
  return (
    <div className="zoom-view-wrapper">
      <div className="zoom-view-container">
        <img src={imageUrl} alt="Zoomed Image" className="zoomed-image" />
        <button className="close-button" onClick={onClose}>
          <Close>
        </button>
      </div>
    </div>
  );
}

export default ZoomView;
