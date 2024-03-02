import React, { useState } from "react";
import { Star } from "lucide-react";

const StarRating = ({ initialValue, onChange }) => {
  const [hoveredStar, setHoveredStar] = useState(null);
  const [rating, setRating] = useState(initialValue);

  const handleStarClick = (value) => {
    setRating(value);
    onChange(value);
  };

  const handleStarHover = (value) => {
    setHoveredStar(value);
  };

  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((value) => (
        <Star
          key={value}
          size={24}
          color={
            (hoveredStar && value <= hoveredStar) || value <= rating
              ? "#ffc107"
              : "#e4e5e9"
          }
          fill={
            (hoveredStar && value <= hoveredStar) || value <= rating
              ? "#ffc107"
              : "#e4e5e9"
          }
          onClick={() => handleStarClick(value)}
          onMouseEnter={() => handleStarHover(value)}
          onMouseLeave={() => handleStarHover(null)}
          style={{ cursor: "pointer" }}
        />
      ))}
    </div>
  );
};

export default StarRating;
