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
            <Link to="/profile" class>
              Profile
              <UserRound />
            </Link>
          </li>
          <li className="dropdownItem">
            <Link class>
              Orders
              <Package />
            </Link>
          </li>
          <li className="dropdownItem">
            <Link class>
              Watchlist
              <Heart />
            </Link>
          </li>
          <li className="dropdownItem">
            <Link class>
              Coupons
              <BadgeIndianRupee />
            </Link>
          </li>
          <li className="dropdownItem" onClick={handlelogout}>
            <Link>
              Logout
              <ToggleRight />
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="auth-dropdown-container">
          <li className="dropdownItem" onClick={handlelogin}>
            <Link to="/login"  class>
              Login
              <ToggleLeft />
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}

export default AuthDropdown;
