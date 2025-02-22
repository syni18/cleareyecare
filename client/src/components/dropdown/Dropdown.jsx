import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import "./dropdown.css";
import {
  BadgeIndianRupee,
  Heart,
  Package,
  ToggleLeft,
  ToggleRight,
  UserRound,
} from "lucide-react";
function AuthDropdown({ onClose, isAuthorized, user }) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const handlelogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  const handlelogin = () => {
    navigate("/login");
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
    if (onClose) {
      onClose();
    }
  };
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  return (
    <div
      className={`auth-dropdown-wrapper ${
        isAuthorized ? "active" : "inactive"
      }`}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      {isAuthorized ? (
        <ul className="auth-dropdown-container">
          <li className="dropdownItem">
            <Link to="/profile" className="dp-item-link">
              Profile
              <UserRound size={18} />
            </Link>
          </li>
          <li className="dropdownItem">
            <Link to="/orders" className="dp-item-link">
              Orders
              <Package size={18} />
            </Link>
          </li>
          <li className="dropdownItem">
            <Link to="/profile/watchlist" className="dp-item-link">
              Watchlist
              <Heart size={18} />
            </Link>
          </li>
          <li className="dropdownItem">
            <Link to="/profile/myCoupons" className="dp-item-link">
              Coupons
              <BadgeIndianRupee size={18} />
            </Link>
          </li>
          <li className="dropdownItem" onClick={handlelogout}>
            <Link to="/">
              Logout
              <ToggleRight size={18} />
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="auth-dropdown-container">
          <li className="dropdownItem" onClick={handlelogin}>
            <Link to="/login" className="dp-item-link">
              Login
              <ToggleLeft size={18} />
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}

export default AuthDropdown;
