import React from 'react'
import './ratingreview.css';
import { ChevronRight, Star } from 'lucide-react';
import ReviewCard from './ReviewCard';

function RatingReview() {
  return (
    <div className="rating-review-wrapper">
      <div className="rating-review-container">
        <div className="rating-review-head">
          <label htmlFor="">
            Rating {" "}
            <div className="rating-head-overview">
              <span className="rating-overview-star">
                3.8 <Star size={16} className="overview-star-icon" />
              </span>
              <span className="review-overview-detail">
                3090 ratings & 1034 reviews
              </span>
            </div>
          </label>
          <button className="rating-review-addbtn">Rate Product</button>
        </div>
        <ReviewCard />
        <div className="review-load-more">
          All 192 reviews
          <ChevronRight size={18} />
        </div>
      </div>
    </div>
  );
}

export default RatingReview;