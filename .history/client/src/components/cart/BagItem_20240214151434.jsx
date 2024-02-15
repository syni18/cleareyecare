import React from 'react'
import img1 from '../../assets/img1.png'
function BagItem() {
  return (
    <div className="bagitem-wrapper">
        <div className="bagitem-container">
            <div className="bagitem-items">
                <img src={img1} alt="" srcset="" />
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