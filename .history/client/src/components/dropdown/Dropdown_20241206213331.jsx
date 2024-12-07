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
    <>
    
    </>
  );
}

export default AuthDropdown;
