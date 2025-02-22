import React from 'react'
import './emptyorders.css';
import emptybox from '../../assets/empty-box.svg'

function EmptyOrders() {
  return (
    <div className='empty-box-wrapper'>
      <img src={emptybox} alt="" className="empty-box-svg" />
      <p>You don't have purchase yet</p>
      <button type='button' className='shopnow-btn'>Shop Now</button>
    </div>
  );
}

export default EmptyOrders;