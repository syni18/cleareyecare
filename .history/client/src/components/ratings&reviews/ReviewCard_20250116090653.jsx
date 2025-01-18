import React, { useState } from "react";
import "./reviewcard.css";
import Img1 from "../../assets/img1.png";
import Img2 from "../../assets/img2.png";
import Img3 from "../../assets/img3.png";

import { CheckCircle, Star, ThumbsDown, ThumbsUp } from "lucide-react";
import ZoomView from "../zoomview/ZoomView";

function ReviewCard() {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [showZoomView, setShowZoomView] = useState(false);
  const imageUrls = [Img1, Img2, Img3];

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
    setShowZoomView(true);
  };

  const handlePrevImage = () => {
    if (selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  const handleNextImage = () => {
    if (selectedImageIndex < imageUrls.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };

  const handleCloseZoomView = () => {
    setShowZoomView(false);
  };
  return (
    <div className="review-card-wrapper">
      <div className="review-card-container">
        <div className="card-container-left">
          <div className="card-rating-comment">
            <span className="card-rating-user">
              5<Star size={14} className="rating-user-icon" />
            </span>
            <span className="card-comment-user">
              this product is awesome and work perfectly
            </span>
          </div>
          <div className="card-comment-images">
            {imageUrls.map((url, index) => (
              <img
                key={index}
                src={url}
                alt=""
                onClick={() => handleImageClick(index)}
              />
            ))}
          </div>
          <div className="rating-user-detail">
            <h6>Sahil Saini</h6>
            <span className="rating-detail-time">4 months ago</span>
          </div>
          <div className="rating-user-certify">
            <CheckCircle color="green" size={14} />
            <h5>Certified buyer</h5>
          </div>
        </div>
        <div className="card-container-right">
          <div className="review-thumbsup">
            <ThumbsUp size={18} />
            <span className="thumbsup-no">13</span>
          </div>
          <div className="review-thumbsup">
            <ThumbsDown size={18} />
            <span className="thumbsdown-no">7</span>
          </div>
          <div className="review-threat">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-grip-vertical"
            >
              <circle cx="9" cy="12" r="1" />
              <circle cx="9" cy="5" r="1" />
              <circle cx="9" cy="19" r="1" />
            </svg>
          </div>
          .
        </div>
      </div>
      {showZoomView && (
        <ZoomView
          imageUrls={imageUrls}
          selectedIndex={selectedImageIndex}
          onClose={handleCloseZoomView}
          onNext={handleNextImage}
          onPrev={handlePrevImage}
        />
      )}
    </div>
  );
}

export default ReviewCard;
