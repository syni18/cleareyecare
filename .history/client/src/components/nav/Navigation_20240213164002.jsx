import React, { useEffect, useRef, useState } from 'react'
import './navigation.css';
import { useNavigate } from 'react-router-dom';
import AuthDropdown from '../dropdown/Dropdown';
import {getUsername} from '../../helper/helper.js';
import { Search, ShoppingCart, User } from "lucide-react";
import { useSelector } from 'react-redux';

function Navigation() {
   let menuRef = useRef();
   const navigate = useNavigate();
   const [open, setOpen] = useState(false);
   const [username, setUsername] = useState("");
   const isAuthorized = localStorage.getItem("token");
   const [dropdownVisible, setDropdownVisible] = useState("");

   const cartCount = useSelector((state)=>state.cart.cartCount)

   const usernamePromise = getUsername();

   useEffect(() => {
     usernamePromise
       .then((data) => {
        // console.log(data);
         setUsername(data.username); // Set the username state with the data
       })
       .catch((error) => {
         console.error("Error fetching username:", error);
       });
   }, [usernamePromise]);

  const handleCart = () => {
    navigate("/cart");
  };

  const toggleDropdown = (category) => {
    setDropdownVisible(dropdownVisible === category ? "" : category);
  };

  return (
    <nav className="nav-wrapper">
      <div className="nav-container">
        <div className="container-left">
          {/* design a logo */}
          <a href="/" className="brand-logo">
            ClearEyeCare
          </a>
        </div>
        <div className="container-middle">
          {/* design the middle cateogry links */}
          <ul className="nav-link">
            <li
              className="nav-item"
              onMouseEnter={() => toggleDropdown("eyeglasses")}
              onMouseLeave={() => toggleDropdown("")}
            >
              Eye Glasses
              {dropdownVisible === "eyeglasses" && (
                <div className="dropdown-content">
                  {/* Dropdown content for Eye Glasses */}
                  <a href="#">Plastic Frames</a>
                  <a href="#">Metal Frames</a>
                  <a href="#">Full Frames</a>
                  <a href="#">Semi-Rimless Frames</a>
                  <a href="#">Rimless Frames</a>
                  <a href="#">Polycarbonate Lenses</a>
                  <a href="#">Round Frames</a>
                  <a href="#">Oval Frames</a>
                  <a href="#">Square Frames</a>
                </div>
              )}
            </li>
            <li
              className="nav-item"
              onMouseEnter={() => toggleDropdown("tshirt")}
              onMouseLeave={() => toggleDropdown("")}
            >
              T-shirt
              {dropdownVisible === "tshirt" && (
                <div className="dropdown-content">
                  <a href="#">V-neck tshirts</a>
                  <a href="#">Basic half sleeve tshirts</a>
                  <a href="#">Long Sleeve Crew neck tshirts</a>
                  <a href="#">Pollo collar tshirts</a>
                  <a href="#">Ringer tshirts</a>
                  <a href="#">Turtle neck tshirts</a>
                  <a href="#">Longline tshirts</a>
                  <a href="#">Pocket tshirts</a>
                  <a href="#">Douche bag neck tshirts</a>
                </div>
              )}
            </li>
            <li
              className="nav-item"
              onMouseEnter={() => toggleDropdown("hoodie")}
              onMouseLeave={() => toggleDropdown("")}
            >
              Hoodies
              {dropdownVisible === "hoodie" && (
                <div className="dropdown-content">
                  <a href="#">Zip-Up hoodies</a>
                  <a href="#">Pullover hoodies</a>
                  <a href="#">Fitted hoodies</a>
                  <a href="#">Athletic hoodies</a>
                  <a href="#">Knit-hoodies</a>
                  <a href="#">Designer hoodies</a>
                  <a href="#">Sleeveless hoodies</a>
                  <a href="#">Fleece hoodies</a>
                  <a href="#">Button-Up Cardigan Sweater hoodies</a>
                  <a href="#">Flannel Button-Up hoodies</a>
                  <a href="#">Tubic-Style hoodies</a>
                </div>
              )}
            </li>
            <li
              className="nav-item"
              onMouseEnter={() => toggleDropdown("jeans")}
              onMouseLeave={() => toggleDropdown("")}
            >
              Jeans
              {dropdownVisible === "jeans" && (
                <div className="dropdown-content">
                  {/* Dropdown content for Eye Glasses */}
                  <a href="#">Skinny Jeans</a>
                  <a href="#">Straight-leg Jeans</a>
                  <a href="#">Bootcut Jeans</a>
                  <a href="#">Flared Jeans</a>
                  <a href="#">Boyfriend Jeans</a>
                  <a href="#">Polycarbonate Jeans</a>
                  <a href="#">Round Jeans</a>
                  <a href="#">Oval Jeans</a>
                  <a href="#">Square Jeans</a>
                </div>
              )}
            </li>
            <li id="css-link" className="link-3">
              Shirts
            </li>
            <li id="css-link" className="link-3">
              Pants
            </li>
          </ul>
        </div>
        <div className="container-right">
          {/* design the search, profile, cart */}
          <div className="nav-search">
            {/* search icon and dropshow search bar */}
            <input
              type="search"
              name="search"
              id="search"
              className="search-input"
              placeholder="search products..."
            />
            <label htmlFor="search" className="search-label">
              <Search />
            </label>
          </div>
          {isAuthorized ? (
            <div
              className="nav-profile"
              onClick={() => {
                setOpen(!open);
              }}
            >
              {/* Design Profile logo / Registration */}
              <div className="user-auth-icon">{`${username
                .substring(0, 2)
                .toUpperCase()}`}</div>
              {open && (
                <AuthDropdown
                  isAuthorized={isAuthorized}
                  onClose={() => setOpen(false)}
                />
              )}
            </div>
          ) : (
            <div
              className="nav-profile"
              onClick={() => {
                setOpen(!open);
              }}
            >
              {/* Design Profile logo / Registration */}
              <User />
              {open && (
                <AuthDropdown
                  isAuthorized={isAuthorized}
                  onClose={() => setOpen(false)}
                />
              )}
            </div>
          )}
          <div className="nav-cart" onClick={handleCart}>
            {/* design a cart logo / Login */}
            <ShoppingCart />
            {cartCount > 0 && (
              <span className="nav-cart-value">{cartCount}</span>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;