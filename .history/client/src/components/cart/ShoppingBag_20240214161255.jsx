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
                    <span>$29</span>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingBag;
