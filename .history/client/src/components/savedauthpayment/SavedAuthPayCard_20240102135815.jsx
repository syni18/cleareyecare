import React from 'react'
import './savedauthpaycard.css';
import { Trash } from 'lucide-react';

function SavedAuthPayCard() {
  return (
    <div className="pay-card-wrapper">
      <div className="pay-card-container">
        <div className="pay-card-head">
          <label htmlFor="">Manage Saved Cards</label>
        </div>
        <div className="pay-card-saved">
          <div className="pay-card-saved-left">
            <div className="paycard-saved-detail">
              <span>ICICI Bank credit Card</span>
              <div className="paycard-saved-iconValue">
                <span>**** **** **** 1234</span>
              </div>
            </div>
            <div className="paycard-saved-edit">
              <span>edit</span>
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

export default SavedAuthPayCard;