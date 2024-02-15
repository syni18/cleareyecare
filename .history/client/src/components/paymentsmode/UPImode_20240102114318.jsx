import React from 'react'
import './upipayment.css';
 
function UpiPayment() {
  return (
    <div className="upi-wrapper">
        <div className="upi-container">
            <input type="text" name="upi-mode" className='upi-mode' placeholder='enter upi id' />
            <button type="button">Verify UPI</button>
        </div>
    </div>
  )
}

export default UPImode;