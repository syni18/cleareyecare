import React from "react";
import "./shopingbag.css";
import BagItem from "./BagItem";

function ShoppingBag() {
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
          <BagItem />
          <BagItem />
          <BagItem />
          <BagItem />
          <div className="shoppingbag-cal-chkout">
            <div className="bag-chkout-cnt">
              <div className="bag-chkout-subtt">
                <span className="bag-subtotal">Subtotal:</span>
                <span className="bag-subtotal-val">$2958.67</span>
              </div>
              <div className="bag-chkout-est">
                <span className="bag-estcost">Subtotal:</span>
                <span className="bag-estcost-val">$2958.67</span>
              </div>
              <div className="bag-chkout-total">
                <span className="bag-total">Subtotal:</span>
                <span className="bag-total-val">$2958.67</span>
              </div>
              <div className="checkout-btn">
                button
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingBag;
