import React from 'react'
import './giftcard.css';
import { Plus } from 'lucide-react';
import giftbalance from '../../assets/giftbalance.png';
import giftbalance2 from "../../assets/giftbalance2.png";

import img2 from '../../assets/img2.png';
function GiftCard() {
  return (
    <div className="gift-card-wrapper">
      <div className="gift-card-container">
        <div className="gift-card-head">
          <label htmlFor="">Gift Cards</label>
        </div>
        <div className="gift-card-top">
          <div className="gift-card-topleft">
            <div className="gift-card-topup">
              <Plus size={60} strokeWidth={1} color="#d3d3d3" />
            </div>
          </div>
          <div className="gift-card-topright">
            <div className="gift-card-balance">
              <div className="card-balance-head">
                <label htmlFor="">Balance</label>
                <span>$0</span>
              </div>
              <img src={giftbalance} alt="" />
            </div>
          </div>
        </div>
        <div className="gift-card-bottom">
          <div className="card-bottom-head">
            <label htmlFor="">Buy a Gift Card</label>
          </div>
          <div className="card-bottom-select">
            <ul className="card-select-list">
              <li>
                <img src={img2} alt="" />
              </li>
              <li>
                <img src={giftbalance} alt="" />
              </li>
              <li>
                <img src={giftbalance2} alt="" />
              </li>
              <li>
                <img src={img2} alt="" />
              </li>
              <li>
                <span>see more</span>
              </li>
            </ul>
          </div>
          <div className="card-bottom-amount">
            <label htmlFor="">Select your Amount</label>
            <ul className="card-select-amount">
              <li>100</li>
              <li>200</li>
              <li>500</li>
              <li>1000</li>
              <li>2000</li>
              <li>5000</li>
              <li>10000</li>
              <li>custom</li>
            </ul>
          </div>
          <div className="card-bottom-fillup">
            <form action="" className="card-bottom-form">
              <div className="card-form-receivermail">
                <label htmlFor="">Receiver Mail</label>
                <input
                  type="email"
                  name="receiver-mail"
                  id="_receiver-mail"
                  placeholder="Receiver email id"
                />
              </div>
              <div className="card-form-receivername">
                <label htmlFor="">Receiver Name</label>
                <input
                  type="text"
                  name="receiver-name"
                  id="_receiver-name"
                  placeholder="Receiver name"
                />
              </div>
              <div className="card-form-receiverno">
                <label htmlFor="">No. of card</label>
                <input
                  type="number"
                  name="receiver-no"
                  id="_receiver-no"
                  placeholder="1"
                  defaultValue={1}
                />
              </div>
              <div className="card-form-sendername">
                <label htmlFor="">Sender Name</label>
                <input
                  type="text"
                  name="sender-name"
                  id="_sender-name"
                  placeholder="Sender name"
                />
              </div>
              <div className="card-form-message">
                <label htmlFor="">Message for Receiver</label>
                <textarea
                  name="card-message"
                  id="_sender-message"
                  cols="10"
                  rows="5"
                  placeholder='write a note (100 characters)'
                ></textarea>
              </div>
              <div className="card-order-btn">
                <button type="button" className="gift-card-orderbtn">
                  Order Now
                </button>
              </div>
            </form>
              <div className="gift-card-fillup">
                <div className="fillup-balance">
                  <div className="fillup-balance-head">
                    <label htmlFor="">Gift Value</label>
                    <span>$0</span>
                  </div>
                  <img src={giftbalance2} alt="" />
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GiftCard;