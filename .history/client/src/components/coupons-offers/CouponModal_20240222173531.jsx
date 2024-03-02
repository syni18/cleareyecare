import React from "react";
import "./couponModal.css"; // Make sure to create and style this CSS file

const CouponModal = ({ coupons, onSelectCoupon, onClose }) => {
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
            <li key={index} onClick={() => onSelectCoupon(coupon)}>
              <div className="coupon-code">{coupon}</div>
              <div className="coupon-description">{coupon.description}</div>
              <div className="coupon-discount">{coupon.discount}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CouponModal;
