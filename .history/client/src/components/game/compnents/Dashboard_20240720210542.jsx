import React from 'react'
import './dashboard.css'
import AvatarEditor from "react-avatar-editor"
function Dashboard() {
  return (
    <div className="g-d-wrapper">
      <div className="g-d-container">
        <div className="g-d-c-top-index">
          <div className="gdc-t-i-left">
            <div className="gdc-til-logo">
              <AvatarEditor
                image="http://example.com/initialimage.jpg"
                width={250}
                height={250}
                border={50}
                color={[255, 255, 255, 0.6]} // RGBA
                scale={1.2}
                rotate={0}
              />
            </div>
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