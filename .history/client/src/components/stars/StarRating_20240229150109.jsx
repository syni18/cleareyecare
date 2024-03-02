import React, { useState } from "react";
import { Star } from "lucide-react";

const StarRating = ({ initialValue, onChange }) => {
  const [rating, setRating] = useState(initialValue);

  const handleStarClick = (value) => {
    setRating(value);
    onChange(value);
  };

  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((value) => (
        <Star
          key={value}
          size={24}
          color={value <= rating ? "#ffc107" : "green"}
          fill={value <= rating ? "#ffc107" : "#green"}
          onClick={() => handleStarClick(value)}
          style={{ cursor: "pointer" }}
        />
      ))}
    </div>
  );
};

export default StarRating;
