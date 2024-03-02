import React, { useState } from "react";
import "./couponModal.css"; // Make sure to create and style this CSS file
import { ChevronDown, ChevronUp } from "lucide-react";

const CouponModal = ({ coupons, onSelectCoupon, onClose }) => {
  const [expandedCoupon, setExpandedCoupon] = useState(null);

  const toggleCouponDetails = (coupon) => {
    if (expandedCoupon === coupon) {
      setExpandedCoupon(null);
    } else {
      setExpandedCoupon(coupon);
    }
  };

  return (
    <div className="coupon-modal-overlay">
      <div className="coupon-modal">
        <div className="coupon-modal-header">
          <h2>Select a Coupon</h2>
          <span className="coupon-modal-close-icon" onClick={onClose}>
            ×
          </span>
        </div>
        <ul className="coupon-list">
          {coupons.map((coupon, index) => (
            <li key={index}>
              <div className="coupon-code-dhead">
                <div
                  className="coupon-code"
                  onClick={() => onSelectCoupon(coupon)}
                >
                  {coupon}
                </div>
                <div className="coupon-discount">10% off</div>
              </div>
              <div
                className="coupon-description"
                style={{
                  display: expandedCoupon === coupon ? "block" : "none",
                }}
              >
                {/* Description, Terms & Conditions, How to avail points */}
                <p>
                  Description: Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Commodi, quam?
                </p>
                <p>
                  Terms & Conditions: Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Commodi, quam?
                </p>
                <p>
                  How to avail points: Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Commodi, quam?
                </p>
              </div>
              <div
                className="coupon-more-details"
                onClick={() => toggleCouponDetails(coupon)}
              >
                {expandedCoupon === coupon ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
                more details
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CouponModal;
