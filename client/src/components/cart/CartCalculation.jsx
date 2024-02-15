import React from 'react'
import './cartcalculation.css';

import { Fingerprint, RefreshCw, ShieldCheck } from "lucide-react";

function CartCalculation() {
  return (
    <div className="cart-eval-wrapper">
      <div className="cart-eval-container">
        <div className="cart-eval-head">
          <h3>Order Summary</h3>
        </div>
        <div className="cart-eval-btn">
          <button type="button">Proceed to Checkout</button>
        </div>
        <div className="cart-eval-body">
          <div className="cart-eval-subtotal">
            <p>Order Subtotal</p>
            <span>$29.56</span>
          </div>
          <div className="cart-eval-shipping">
            <p>Shipping charges</p>
            <span>$9.00</span>
          </div>
          <div className="cart-eval-tax">
            <p>Sales Tax</p>
            <span>$4.29</span>
          </div>
        </div>
        <div className="cart-eval-payment">
          <p>Payment Due</p>
          <span>$48.77</span>
        </div>
        <div className="cart-eval-trust">
          <div className="eval-trust-box1">
            <Fingerprint size={28} className="trust-box1-icon" />
            <small>Secure Payment</small>
          </div>
          <div className="eval-trust-box2">
            <RefreshCw size={28} className="trust-box1-icon" />
            <small>7-day Returns</small>
          </div>
          <div className="eval-trust-box3">
            <ShieldCheck size={28} className="trust-box1-icon" />
            <small>100%Buyer Protection</small>
          </div>
        </div>
        <div className="cart-eval-btn">
          <button type="button">Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
}

export default CartCalculation