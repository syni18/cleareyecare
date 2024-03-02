import React from 'react'
import './billingaddress.css';
import AddresList from '../address/AddresList';

function BillingAddress() {
  return (
    <div className="billing-address-wrapper">
      <div className="billing-address-container">
        <div className="bill-label-head">
          <label htmlFor="">Billing Address</label>
        </div>
        <div className="billing-address-scard">
            <AddresList
        </div>
      </div>
    </div>
  );
}

export default BillingAddress