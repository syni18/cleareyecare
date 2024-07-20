import React from "react";
import "./dashboard.css";
import Avatar from "boring-avatars";
import { Copy, History, Flame, Wrench, IndianRupee } from "lucide-react";

function Dashboard() {
  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-container">
        <div className="dashboard-top">
          <div className="top-left">
            <div className="user-info">
              <div className="user-avatar">
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
              <div className="user-details">
                <p className="user-name">Sahil</p>
                <div className="user-id">
                  <span>UID: 343413423</span>
                  <Copy size={18} className="icon" />
                </div>
                <div className="user-referral">
                  <span>Referral ID: http:mylrefferallink.com/343413423</span>
                  <Copy size={18} className="icon" />
                </div>
              </div>
            </div>
          </div>
          <div className="top-right">
            <ul className="nav-links">
              <li>
                <History size={18} className="icon" />
                <span>History</span>
              </li>
              <li>
                <Flame size={18} className="icon" />
                <span>Withdraw</span>
              </li>
              <li>
                <Wrench size={18} className="icon" />
                <span>Settings</span>
              </li>
              <li>
                <IndianRupee size={18} className="icon" />
                <span>Balance</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="dashboard-bottom"></div>
      </div>
    </div>
  );
}

export default Dashboard;
