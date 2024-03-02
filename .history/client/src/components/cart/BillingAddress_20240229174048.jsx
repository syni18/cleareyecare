import React from 'react'
import './billingaddress.css';

function BillingAddress() {
  return (
    <div className="billing-address-wrapper">
      <div className="billing-address-container">
        <div className="bill-label-head">
          <label htmlFor="">Billing Address</label>
        </div>
        <div className="billing-address-scard">
          <div className="bill-address-scard-container">
              {/* Display your address details */}
              <div className="form-saved-left">
                <div className="saved-address-tag">
                  <span>Home</span>
                </div>
                <div className="saved-address-nameph">
                  <span className="saved-name">{address.fullName}</span>
                  <span className="saved-phno">{address.phoneNumber}</span>
                </div>
                <div className="saved-address-local">
                  <span>
                    {address.address} &nbsp; {address.city} &nbsp;
                    {address.state}&nbsp; {address.postalCode}
                  </span>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BillingAddress