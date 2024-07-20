import React from 'react'
import './dashboard.css'
import  Avatar from "boring-avatars";
import { Copy, History, Flame, Wrench, IndianRupee } from 'lucide-react';

function Dashboard() {
  return (
    <div className="g-d-wrapper">
      <div className="g-d-container">
        <div className="g-d-c-top-index">
          <div className="gdc-t-i-left">
            <div className="ti-left-ck">
              <div className="gdc-til-logo">
                <Avatar
                  size={50}
                  name="Maria Mitchell"
                  variant="marble"
                  colors={[
                    "#92A1C6",
                    "#146A7C",
                    "#F0AB3D",
                    "#C271B4",
                    "#C20D90",
                  ]}
                />
              </div>
              <div className="gdc-til-usr-details">
                <p className="til-usr-name">Sahil</p>
                <span className="til-usr-uid">
                  <span className="usr-id">
                    <span className="id-head">UID :</span>
                    <span className="id-value"> 343413423</span>
                  </span>
                  <span className="usr-clip">
                    <Copy size={16} />
                  </span>
                </span>
                <span className="til-usr-ref">
                  <span className="usr-ref-link">
                    <span className="ref-head">Referral :</span>
                    <span className="ref-value">http://localhost/game/343413423</span>{" "}
                  </span>
                  <span className="usr-clip">
                    <Copy size={16} />
                  </span>
                </span>
              </div>
            </div>
          </div>
          <div className="gdc-t-i-right">
            <ul className="tir-links">
              <li>
                <History size={18} stroke={"red"} margin />
                <span className="tirl-text">History</span>
              </li>
              <li>
                <Flame size={18} stroke={"red"} />
                <span className="tirl-text">Withdraw</span>
              </li>
              <li>
                <Wrench size={18} stroke={"red"} />
                <span className="tirl-text">Settings</span>
              </li>
              <li>
                <IndianRupee size={18} stroke={"red"} />
                <span className="tirl-text">Balance</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="g-d-c-bottom-index"></div>
      </div>
    </div>
  );
}

export default Dashboard;