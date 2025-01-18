import React from 'react'
import './ratingreview.css';
import { ChevronRight, Star } from 'lucide-react';
import ReviewCard from './ReviewCard';
import { useNavigate } from 'react-router-dom';

function RatingReview() {
  const navigate = useNavigate();
  const handlerateingForm = () => {
    navigate("/rate&review-pkg");
  }
  return (
    <div className="rating-review-wrapper">
      <div className="rating-review-container">
        <div className="rating-review-head">
          <label htmlFor="">
            Rating & Review{" "}
            <div className="rating-head-overview">
              <span className="rating-overview-star">
                3.8 <Star size={14} className="overview-star-icon" />
              </span>
              <span className="review-overview-detail">
                3090 ratings & 1034 reviews
              </span>
            </div>
          </label>
          <button className="rating-review-addbtn" onClick={handlerateingForm}>Rate Product</button>
        </div>
        <ReviewCard />
        <ReviewCard />
        <div className="review-load-more">
          more reviews
          <ChevronRight size={16} />
        </div>
      </div>
    </div>
  );
}

export default RatingReview;