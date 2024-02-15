import React from 'react'
import './savedauthpayupi.css';
import { Trash } from 'lucide-react';
import paytm from '../../assets/paytm.png'
import gpay from '../../assets/gpay.png'
import icicibank from "../../assets/icicibank.png";
import phonepe from "../../assets/phonepe.png";
import hdfc from "../../assets/hdfc.png";
import bobbank from "../../assets/bobbank.png";
import axisbank from "../../assets/axisbank.png";
import sbibank from "../../assets/sbibank.png";

function SavedAuthPayUPI() {
  return (
    <div className="pay-card-wrapper">
      <div className="pay-card-container">
        <div className="pay-card-head">
          <label htmlFor="">Manage Saved UPIs</label>
        </div>
        <div className="pay-card-saved">
          <div className="pay-card-saved-left">
            <div className="paycard-saved-detail">
              <span>Paytm UPI</span>
              <div className="paycard-saved-iconValue">
                {/* <img src={paytm} alt="" /> */}
                {/* <img src={gpay} alt="" /> */}
                {/* <img src={icicibank} alt="" /> */}
                {/* <img src={phonepe} alt="" /> */}
                <img src={hdfc} alt="" />
                {/* <img src={bobbank} alt="" /> */}
                {/* <img src={axisbank} alt="" /> */}
                {/* <img src={sbibank} alt="" /> */}

                <span>32524225@paytm</span>
              </div>
            </div>
          </div>
          <div className="pay-card-saved-right">
            <Trash color="rgb(130,130,130)" size={18} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SavedAuthPayUPI;