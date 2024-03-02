import React from 'react'
import './reviewcard.css';
import Img3 from '../../assets/Img3.png';

import { CheckCircle, Star, ThumbsDown, ThumbsUp } from 'lucide-react';

function ReviewCard() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseZoomView = () => {
    setSelectedImage(null);
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
            <img src={Img3} alt="" />
            <img src={Img3} alt="" />
            <img src={Img3} alt="" />
            <img src={Img3} alt="" />
          </div>
          <div className="rating-user-detail">
            <h5>Sahil Saini</h5>
            <span className="rating-detail-time">4 months ago</span>
          </div>
          <div className="rating-user-certify">
            <CheckCircle color="green" size={18} />
            <h5>Certified buyer</h5>
          </div>
        </div>
        <div className="card-container-right">
          <div className="review-thumbsup">
            <ThumbsUp size={20} />
            <span className="thumbsup-no">13</span>
          </div>
          <div className="review-thumbsup">
            <ThumbsDown size={20} />
            <span className="thumbsdown-no">7</span>
          </div>
          <div className="review-threat">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-grip-vertical"
            >
              <circle cx="9" cy="12" r="1" />
              <circle cx="9" cy="5" r="1" />
              <circle cx="9" cy="19" r="1" />
            </svg>
          </div>
          .
        </div>
      </div>
    </div>
  );
}

export default ReviewCard