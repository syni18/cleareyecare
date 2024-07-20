import React from 'react'
import './dashboard.css'
import  Avatar from "boring-avatars";

function Dashboard() {
  return (
    <div className="g-d-wrapper">
      <div className="g-d-container">
        <div className="g-d-c-top-index">
          <div className="gdc-t-i-left">
            <div className="gdc-til-logo">
              <Avatar
                size={50}
                name="Maria Mitchell"
                variant="marble"
                colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
              />
            </div>
            <div className="gdc-til-usr-details">
              <p className="til-usr-name">Sahil</p>
              <span className="til-usr-uid">
                <span className="usr-id">UID343413423</span>
                <span className="usr-clip">copy</span>
              </span>
              <span className="til-usr-ref">
                <span className="usr-ref-link">
                  http:mylrefferallink.com/343413423
                </span>
                <span className="usr-clip">copy</span>
              </span>
            </div>
          </div>
          <div className="gdc-t-i-right">
            <ul className="tir-links">
              <li>history</li>
              <li>withdrawal</li>
              <li>setting</li>
              <li>balance</li>
            </ul>
          </div>
        </div>
        <div className="g-d-c-bottom-index"></div>
      </div>
    </div>
  );
}

export default Dashboard;