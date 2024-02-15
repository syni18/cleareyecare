import React from 'react'
import './shopingbag.css';

function ShoppingBag() {
  return (
    <div className="shoppingbag-wrapper">
        <div className="shoppingbag-container">
            <div className="bag-label-head">
                <label htmlFor="">Shopping Bag</label>
                <button className='continue-shop'>Continue Shopping</button>
            </div>
            <div className="shoppingbag-items">
                <div className="bag-items-head">
                    <span></span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ShoppingBag