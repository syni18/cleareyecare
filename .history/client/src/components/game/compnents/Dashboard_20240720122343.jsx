import React from 'react'
import './dashboard.css'
function Dashboard() {
  return (
    <div className="g-d-wrapper">
      <div className="g-d-container">
        <div className="g-d-c-top-index">
          <div className="gdc-t-i-left">
            <div className="gdc-til-logo"></div>
            <div className="gdc-til-usr-details">
              <p className="til-usr-name">Sahil</p>
              <span className="til-usr-uid">
                <span className="usr-id">343413423</span>
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