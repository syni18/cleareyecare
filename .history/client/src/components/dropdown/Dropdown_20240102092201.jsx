import React from 'react'
import {useNavigate}
import './dropdown.css';
import {
  BadgeIndianRupee,
  Heart,
  Package,
  ToggleLeft,
  ToggleRight,
  UserRound,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
function AuthDropdown({onClose, isAuthorized}) {
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
      className={`profile-dropdown-wrapper ${
        isAuthorized ? "active" : "inactive"
      }`}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      {isAuthorized ? (
        <ul className="profile-dropdown-container">
          <li className="dropdownItem">
            Profile
            <UserRound />
          </li>
          <li className="dropdownItem">
            Orders
            <Package />
          </li>
          <li className="dropdownItem">
            Watchlist
            <Heart />
          </li>
          <li className="dropdownItem">
            Coupons
            <BadgeIndianRupee />
          </li>
          <li className="dropdownItem" onClick={handlelogout}>
            <a> Logout </a>
            <ToggleRight />
          </li>
        </ul>
      ) : (
        <ul className="profile-dropdown-container">
          <li className="dropdownItem" onClick={handlelogin}>
            <a> Login </a>
            <ToggleLeft />
          </li>
        </ul>
      )}
    </div>
  );
}

export default AuthDropdown;