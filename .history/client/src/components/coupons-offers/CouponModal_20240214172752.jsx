import React from "react";
import "./couponModal.css"; // Make sure to create and style this CSS file

const CouponModal = ({ coupons, onSelectCoupon, onClose }) => {
  return (
    <div className="coupon-modal-overlay">
      <div className="coupon-modal">
        <h2>Select a Coupon</h2>
        <ul className="coupon-list">
          {coupons.map((coupon, index) => (
            <li key={index} onClick={() => onSelectCoupon(coupon)}>
              {coupon}
            </li>
          ))}
        </ul>
        <button className="coupon-modal-close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default CouponModal;
