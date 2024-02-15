import React from 'react'
import './coupons.css';
import AvailableCoupons from './AvailableCoupons';
import UpcomingCoupons from './UpcomingCoupons';
import ExpiredCoupons from './ExpiredCoupons';

function Coupons() {
  return (
    <div className="coupon-wrapper">
      <div className="coupon-container">
        <div className="coupon-head">
          <label htmlFor="">Available Coupons</label>
        </div>
        <ul className="coupon-avail-list">
          <li className="active coupon-avail-item" data-value="1">
            <AvailableCoupons />
          </li>
        </ul>
        <div className="coupon-head">
          <label htmlFor="">Upcoming Coupons</label>
        </div>
        <ul className="coupon-upcome-list">
          <li className="active coupon-upcome-item" data-value="1">
            <UpcomingCoupons />
          </li>
        </ul>
        <div className="coupon-head">
          <label htmlFor="">Expired Coupons</label>
        </div>
        <ul className="coupon-expire-list">
          <li className="active coupon-expire-item" data-value="1">
            <ExpiredCoupons />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Coupons;