import React from 'react'

function ExpiredCoupons() {
  return (
    <div className="available-cp-wrapper">
      <div className="available-cp-left">
        <div className="cp-left-title">
          <span>1000 upto off on Electronics</span>
        </div>
        <div className="cp-left-detail">
          <span>
            Get extra ₹1 off on 1 item(s) (price inclusive of cashback/coupon)
          </span>
        </div>
      </div>
      <div className="available-cp-right">
        <div className="cp-right-validity">
          <span>valid till 24 Jan, 2024</span>
        </div>
        <div className="cp-right-tnc">
          <span>view T&C</span>
        </div>
      </div>
    </div>
  );
}

export default ExpiredCoupons