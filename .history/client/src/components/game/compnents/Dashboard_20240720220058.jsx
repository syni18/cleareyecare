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
           .ti-left-
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