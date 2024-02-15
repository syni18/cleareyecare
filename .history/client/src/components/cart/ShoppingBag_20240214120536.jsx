import React from 'react'
import './shopingbag.css';

function ShoppingBag() {
  return (
    <div className="shoppingbag-wrapper">
        <div className="shoppingbag-container">
            <div className="bag-label-head">
                <label htmlFor="">Shopping Bag</label>
                <button>Continue Shopping</button>
            </div>
        </div>
    </div>
  )
}

export default ShoppingBag