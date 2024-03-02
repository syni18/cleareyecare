import React from 'react'
import "./specificorders.css";
import { DownloadCloud, HelpCircle, MapPin, Star, Store, Truck } from 'lucide-react';
import img2 from '../../assets/img2.png';
import { Link } from 'react-router-dom';

function SpecificOrders() {
  return (
    <div className="orders-wrapper">
      <div className="orders-container">
        <div className="orders-head">
          <label htmlFor="">orders</label>
        </div>
        <div className="orders-details-container">
          <div className="orders-details-card">
            <div className="details-card-pkg">
              <div className="pkg-label-invoice">
                <label htmlFor="">Package</label>
                <button type="button">
                  <DownloadCloud size={18} className="invoice-btn" />
                  Invoice
                </button>
              </div>
              <span className="pkg-invoice-id">
                Pkg - #760126 <small>Delivered</small>
              </span>
              <div className="card-pkg-shipped">
                <label htmlFor="">Ship to</label>
                <div className="pkg-shipped-address">
                  <h4>Dheeraj</h4>
                  <div className="pkg-address-card">
                    bhora kalan patti chainpura, near goverment hospital GURGAON
                    - 122413, Haryana
                  </div>
                  <div className="pkg-shipped-mail">
                    <h5>Mail ID</h5>
                    <span>csesai07@gmail.com</span>
                  </div>
                  <div className="pkg-shipped-phno">
                    <h5>Ph no.</h5>
                    <span>9999992365</span>
                  </div>
                </div>
              </div>
              <label htmlFor="" className="pkg-head">
                Items
              </label>
              <div className="pkg-item-details">
                <div className="pkg-details-view">
                  <img src={img2} alt="" />
                  <div className="pkg-view-desc">
                      <h5>MOTOROLA Edge 40 (Eclipse Black, 256 GB)</h5>
                      <p>
                        color: <span>Black</span>
                      </p>
                    <h4>$2500</h4>
                  </div>
                </div>
                <div className="pkg-details-help">
                  <Link to='/rate&review-pkg' className="pkg-help-rate-review">
                    <Star size={18} fill="#007bff" color='#007bff'/>
                    <span>Rate & Review</span>
                  </Link>
                  <div className="pkg-help-help">
                    <HelpCircle size={18} />
                    <span>Help</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="details-card-tracker">
              <div className="card-1">
                <div className="pkg-order-head">
                  <label htmlFor="">Order Key</label>
                </div>
                <div className="tracker-date">
                  <div className="pkg-order-date">
                    <label htmlFor="">Order Date</label>
                    <span>Tuesday, Jan 2023</span>
                  </div>
                  <div className="pkg-order-time">
                    <label htmlFor="">Order Time</label>
                    <span>9:45 PM</span>
                  </div>
                </div>
                <div className="tracker-carrier">
                  <div className="pkg-order-carrier">
                    <label htmlFor="">Carrier</label>
                    <span>DHL</span>
                  </div>
                  <div className="pkg-order-trackid">
                    <label htmlFor="">Tracking</label>
                    <span>3563254</span>
                  </div>
                </div>
              </div>
              <div className="card-2">
                <div className="pkg-shippment-head">
                  <label htmlFor="">Shipment timeline</label>
                </div>
                <div className="pkg-shipment-timeline-left">
                  <div className="timeline-vertical">
                    <span>
                      <Truck className="timeline-truck" />
                    </span>
                    <span>
                      <Store className="timeline-store" />
                    </span>
                    <span>
                      <MapPin className="timeline-mapin" />
                    </span>
                  </div>
                  <div className="pkg-shipment-timeline-right">
                    <div className="timeline-right-done">
                      <label htmlFor="">3:05PM, Monday, 03 June 2023</label>
                      <p>Delivered to recipient at FedEx Facility</p>
                    </div>
                    <div className="timeline-right-done">
                      <label htmlFor="">3:05PM, Monday, 03 June 2023</label>
                      <p>Delivered to recipient at FedEx Facility</p>
                    </div>
                    <div className="timeline-right-done">
                      <label htmlFor="">3:05PM, Monday, 03 June 2023</label>
                      <p>Delivered to recipient at FedEx Facility</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SpecificOrders;