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
function AuthDropdown({ onClose, isAuthorized }) {
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
            <Link to="/profile" classname="dp-item-link">
            Profile
            </Link>
              <UserRound />
          </li>
          <li className="dropdownItem">
            <Link to="/orders" classname="dp-item-link">
              Orders
            </Link>
              <Package />
          </li>
          <li className="dropdownItem">
            <Link to="/profile/watchlist" classname="dp-item-link">
              Watchlist
            </Link>
              <Heart />
          </li>
          <li className="dropdownItem">
            <Link to="/profile/myCoupons" classname="dp-item-link">
              Coupons
            </Link>
              <BadgeIndianRupee />
          </li>
          <li className="dropdownItem" onClick={handlelogout}>
            <Link to="/">
              Logout
            </Link>
              <ToggleRight />
          </li>
        </ul>
      ) : (
        <ul className="auth-dropdown-container">
          <li className="dropdownItem" onClick={handlelogin}>
            <Link to="/login" classname="dp-item-link">
              Login
            </Link>
              <ToggleLeft />
          </li>
        </ul>
      )}
    </div>
  );
}

export default AuthDropdown;
