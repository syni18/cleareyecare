import React from 'react'
import './billingaddress.css';
import { Phone } from 'lucide-react';

function BillingAddress() {
  return (
    <div className="billing-address-wrapper">
      <div className="billing-address-container">
        <div className="bill-label-head">
          <label htmlFor="">Billing Address</label>
        </div>
        <div className="billing-address-scard">
          <div className="bill-address-scard-container">
            <div className="bill-scard-tag">
              <span>Home</span>
            </div>
            <div className="bill-scard-nameph">
              <span className="bill-scard-name">Sahil</span>
              <span className="bill-scard-phno"><Phone size={14}/> bsp;3563532413</span>
            </div>
            <div className="bill-scard-locate">
                <span className='bill-scard-locate-det'>
                    VPO bhora kalan patti-chainpura <br/>
                    Gurgaon, Haryana <br/>
                    122413
                </span>
                <span className='bill-scard-locate-nearby'>Near Surya Global School</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BillingAddress