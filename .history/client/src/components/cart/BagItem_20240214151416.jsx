import React from 'react'
import img1 from '../'
function BagItem() {
  return (
    <div className="bagitem-wrapper">
        <div className="bagitem-container">
            <div className="bagitem-items">
                <img src="#" alt="" srcset="" />
                <div className="bagitem-item-det">
                    <h4>{"Tittle"}</h4>
                    <button className='bagitem-remove-btn'>Remove</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default BagItem