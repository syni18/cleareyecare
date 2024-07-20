import React, { useState } from 'react'
import './cart.css';
import { MapPin, PackagePlus } from "lucide-react";
import CartCalculation from './CartCalculation';
import UPImode from '../paymentsmode/UPImode';
import Cardmode from '../paymentsmode/Cardmode';
import CartItem from '../products/CartItem';
import EmptyCart from '../empty/EmptyCart';
import { useSelector } from 'react-redux';

function Cart() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [paymentMethod, setPaymentMethod] = useState("");

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };
  return (
    <div className="cart-wrapper">
      <div className="cart-container">
        {cartItems.length > 0 ? (
          <div className="cart-left-details">
            {/* address, payment mode , order summary */}
            <div className="cart-section-shipping">
              <div className="section-shipping-head">
                <div className="shipping-head-left">
                  <span className="shipping-index">1</span>
                  <h3>Shipping Address</h3>
                </div>
                <div className="shipping-head-right">
                  <button type="button">
                    <MapPin size={18} className="shipping-add-pin" />
                    Add
                  </button>
                </div>
              </div>
              <div className="shipping-saved-address">
              {/* <AddressCard />
              <AddressCard />
              <AddressCard /> */}
              </div>
              <div className="section-shipping-head">
                <div className="shipping-head-left">
                  <span className="shipping-index">2</span>
                  <h3>Select Shipping Option</h3>
                </div>
              </div>
              <div className="section-shipping-options">
                <div className="shipping-option-card">
                  <input
                    type="radio"
                    name="shipping-speed"
                    checked
                    className="option-card-radio"
                  />
                  <div className="option-card-value">
                    <h5>
                      Standard Delivery
                      <br /> <small>(3-4 days)</small>
                    </h5>
                    <h4>Free</h4>
                  </div>
                </div>
                <div className="shipping-option-card">
                  <input
                    type="radio"
                    name="shipping-speed"
                    className="option-card-radio"
                  />
                  <div className="option-card-value">
                    <h5>
                      Express Delivery
                      <br /> <small>(1-2 days)</small>
                    </h5>
                    <h4>$10.00</h4>
                  </div>
                </div>
              </div>
              <div className="section-shipping-head">
                <div className="shipping-head-left">
                  <span className="shipping-index">3</span>
                  <h3>Select Payment Method</h3>
                </div>
              </div>
              <div className="section-shipping-options">
                <div className="shipping-option-card">
                  <input
                    type="radio"
                    name="payOption"
                    className="option-card-radio"
                    onChange={() => handlePaymentMethodChange("COD")}
                  />
                  <div className="option-card-value">
                    <h5>COD</h5>
                  </div>
                </div>
                <div className="shipping-option-card">
                  <input
                    type="radio"
                    name="payOption"
                    className="option-card-radio"
                    onChange={() => handlePaymentMethodChange("UPI")}
                  />
                  <div className="option-card-value">
                    <h5>UPI</h5>
                  </div>
                </div>
                <div className="shipping-option-card">
                  <input
                    type="radio"
                    name="payOption"
                    className="option-card-radio"
                    onChange={() => handlePaymentMethodChange("CCard")}
                  />
                  <div className="option-card-value">
                    <h5>Credit Card</h5>
                  </div>
                </div>
                <div className="shipping-option-card">
                  <input
                    type="radio"
                    name="payOption"
                    className="option-card-radio"
                    onChange={() => handlePaymentMethodChange("DCard")}
                  />
                  <div className="option-card-value">
                    <h5>Debit Card</h5>
                  </div>
                </div>
                <div className="shipping-option-card">
                  <input
                    type="radio"
                    name="payOption"
                    className="option-card-radio"
                    onChange={() => handlePaymentMethodChange("NET")}
                  />
                  <div className="option-card-value">
                    <h5>Net Banking</h5>
                  </div>
                </div>
                {/* <span className="option-new-value-add">
                  <PackagePlus size={18} />
                  Add
                </span> */}
              </div>
              {paymentMethod === "UPI" && <UPImode />}
              {paymentMethod === "CCard" && <Cardmode />}
              {paymentMethod === "DCard" && <Cardmode />}
              {paymentMethod === "NET" && <Cardmode />}
              <CartItem />
            </div>
          </div>
        ) : (
          <EmptyCart />
        )}
        {cartItems.length > 0 && (
          <div className="cart-right-checkout">
            {/* total price summary and checkout btn */}
            <CartCalculation />
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;