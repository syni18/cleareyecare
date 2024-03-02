import React, { useEffect, useRef, useState } from 'react'
import './navigation.css';
import { useNavigate } from 'react-router-dom';
import AuthDropdown from '../dropdown/Dropdown';
import {getUsername} from '../../helper/helper.js';
import { Cog, Search, ShoppingCart, User } from "lucide-react";
import { useSelector } from 'react-redux';
import useFetchProducts from '../../hooks/useFetechProducts.js';

function Navigation() {
  let menuRef = useRef();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [userRole, setUserRole] = useState("admin"); // New state for user role
  const isAuthorized = localStorage.getItem("token");
  const [dropdownVisible, setDropdownVisible] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const { products, error, loading } = useFetchProducts();
  const cartCount = useSelector((state) => state.cart.cartCount);

  const handleSearch = () => {
    if (searchInput.trim() === "") {
      return;
    }else {
      const filteredProducts = products.filter((p) =>
        p.title.toLowerCase().includes(searchInput.toLowerCase())
      );
      console.log(filteredProducts.map((p) => p.brand));
      // Assuming SearchResults component can accept products as state
      navigate("/search-items", { state: { products: filteredProducts } });
    }
  };

  const usernamePromise = getUsername();

  useEffect(() => {
    usernamePromise
      .then((data) => {
        // console.log(data);
        setUsername(data.username); // Set the username state with the data
        setUserRole("admin"); // Assuming your getUsername also returns user role
      })
      .catch((error) => {
        console.error("Error fetching username:", error);
      });
  }, [usernamePromise]);

  const handleCart = () => {
    isAuthorized === true ? navigate('/cart'):navigate('/cart-login')
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
        {/* <div className="container-middle">
          
          <ul className="nav-link">
            <li
              className="nav-item"
              onMouseEnter={() => toggleDropdown("eyeglasses")}
              onMouseLeave={() => toggleDropdown("")}
            >
              Eye Glasses
              {dropdownVisible === "eyeglasses" && (
                <div className="dropdown-content">
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
                  <a href="#">Skinny Jeans</a>
                  <a href="#">Straight-leg Jeans</a>
                  <a href="#">Bootcut Jeans</a>
                  <a href="#">Flared Jeans</a>
                  <a href="#">Boyfriend Jeans</a>
                  <a href="#">High-Waisted Jeans</a>
                  <a href="#">Low-Rise Jeans</a>
                  <a href="#">Mom Jeans</a>
                  <a href="#">Jeggings Jeans</a>
                </div>
              )}
            </li>
            <li
              className="nav-item"
              onMouseEnter={() => toggleDropdown("shirt")}
              onMouseLeave={() => toggleDropdown("")}
            >
              Shirts
              {dropdownVisible === "shirt" && (
                <div className="dropdown-content">
                  <a href="#">Dress Shirts</a>
                  <a href="#">Collar Dress Shirts</a>
                  <a href="#">Tuxedo Dress Shirts</a>
                  <a href="#">Denim Shirts</a>
                  <a href="#">Men's Casual Shirts</a>
                  <a href="#">Button-Down Shirts</a>
                  <a href="#">Banded Collar Shirts</a>
                  <a href="#">Spread Collar Shirts</a>
                  <a href="#">Club Collar Shirts</a>
                </div>
              )}
            </li>
            <li
              className="nav-item"
              onMouseEnter={() => toggleDropdown("pants")}
              onMouseLeave={() => toggleDropdown("")}
            >
              Eye Glasses
              {dropdownVisible === "pants" && (
                <div className="dropdown-content">
                  <a href="#">Bell Bottom Pants</a>
                  <a href="#">Bootcut Pants</a>
                  <a href="#">Breeches Pants</a>
                  <a href="#">Cargo Pants</a>
                  <a href="#">Carpenter Pants</a>
                  <a href="#">Chaps Pants</a>
                  <a href="#">Chinos Pants</a>
                  <a href="#">Corduroy Pants</a>
                  <a href="#">Dickies Pants</a>
                  <a href="#">Flat Front Pants</a>
                  <a href="#">Joggers</a>
                  <a href="#">Pleated Pants</a>
                  <a href="#">Suit Pants</a>
                </div>
              )}
            </li>
          </ul>
        </div> */}
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
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && searchInput.trim() !== "") {
                  handleSearch();
                }
              }}
            />
            <button onClick={handleSearch} className="search-label">
              <Search />
            </button>
          </div>
          {isAuthorized && userRole === "admin" && (
            <div className="nav-console">
              <Cog />
            </div>
          )}
          {isAuthorized ? (
            <div
              className="nav-profile"
              onClick={() => {
                setOpen(!open);
              }}
            >
              {/* Design Profile logo / Registration */}
              <div className="user-auth-icon">{`${username
                .substring(0)
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