import React from "react";
import "./shopingbag.css";
import BagItem from "./BagItem";
import { useSelector } from "react-redux";

function ShoppingBag() {
    const cartItems = useSelector((state) => state.cart.cartItems);

    // Calculate subtotal
    const subtotal = cartItems
      .reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toFixed(2);
  return (
    <div className="shoppingbag-wrapper">
      <div className="shoppingbag-container">
        <div className="bag-label-head">
          <label htmlFor="">Shopping Bag</label>
          <button className="continue-shop">Continue Shopping</button>
        </div>
        <div className="shoppingbag-items">
          <div className="bag-items-head">
            <span className="bag-head-items">Items</span>
            <span className="bag-head-attribute">Attributes</span>
            <span className="bag-head-quantity">Quantity</span>
            <span className="bag-head-Shiping-cost">Shipping Cost</span>
            <span className="bag-head-Price">Price</span>
          </div>
          <BagItem />
          <div className="shoppingbag-cal-chkout">
            <div className="bag-chkout-cnt">
              <div className="bag-chkout-subtt">
                <span className="bag-subtotal">Subtotal:</span>
                <span className="bag-subtotal-val">${subtotal}</span>
              </div>
              <div className="bag-chkout-est">
                <span className="bag-estcost">Estimated Shipping:</span>
                <span className="bag-estcost-val">$15.00</span>
              </div>
              <div className="bag-chkout-coupon">
                <span className="bag-coupon-code">coupon Code</span>
                <span className="bag-estcost-val">$15.00</span>
              </div>
              <div className="bag-chkout-total">
                <span className="bag-total">Total:</span>
                <span className="bag-total-val">
                  ${(parseFloat(subtotal) + 15).toFixed(2)}
                </span>
              </div>
              <div className="checkout-btn">
                <button type="button">Procced to Checkout</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingBag;
