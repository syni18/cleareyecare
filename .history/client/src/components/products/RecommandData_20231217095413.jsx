import React from 'react'
import { Star } from "lucide-react";
import Img3 from "../../assets/img3.png";

function RecommandData() {
  return (
    <div className="recommand-p-card">
      <div className="recommand-p-left">
        <img src={Img3} alt="" />
        <h4 className="recommand-p-title">Product 1</h4>
        <div className="recommand-p-rating">
          <Star size={18} color="green" fill="green" />
          <Star size={18} color="green" fill="green" />
          <Star size={18} color="green" fill="green" />
          <Star size={18} color="green" fill="green" />
        </div>
      </div>
      <div className="recommand-p-right">
        <span>$25</span>
      </div>
    </div>
  );
}

export default RecommandData