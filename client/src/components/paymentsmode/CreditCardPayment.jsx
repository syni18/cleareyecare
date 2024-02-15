import React from 'react'
import './creditcardpayment.css';

function CreditCardPayment() {
  return (
    <div className="credit-card-wrapper">
      <div className="credit-card-container">
        <div className="card-number">
          <label htmlFor="">Card Number</label>
          <input type="number" name="" className="credit-card-number" placeholder='1234-4567-8900-xxxx' />
          <span>visa</span>
        </div>
        <div className="card-holder">
          <label htmlFor="">Full Name</label>
          <input type="text" name="" className="credit-card-holder-name" placeholder='John Doe'/>
        </div>
        <div className="card-expiry">
          <div className="">
            <label htmlFor="">Expiry Date</label>
            <input type="number" name="" className="credit-card-expiry" placeholder='05/30'/>
          </div>
          <div className="">
            <label htmlFor="">CVV</label>
            <input type="number" name="" className="credit-card-cvv" placeholder='123'/>
          </div>
        </div>
      </div>
        <div className="card-saved-reference">
          <input type="checkbox" name="saved-help" className="card-saved-future" />
          <p className='card-saved-detail'>Save this card for future faster checkout</p>
        </div>
    </div>
  );
}

export default CreditCardPayment;