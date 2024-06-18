import React, { useEffect, useState, useCallback, useMemo } from "react";
import "./navigation.css";
import { useNavigate } from "react-router-dom";
import AuthDropdown from "../dropdown/Dropdown";
import { fetchSearchProducts, getUsername } from "../../helper/helper.js";
import { Cog, Search, ShoppingCart, User } from "lucide-react";
import { useSelector } from "react-redux";

function Navigation() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [userRole, setUserRole] = useState("admin");
  const isAuthorized = localStorage.getItem("token");
  const [dropdownVisible, setDropdownVisible] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const cartCount = useSelector((state) => state.cart.cartCount);

  const handleSearch = useCallback(async () => {
    if (searchInput.trim() === "") return;
    try {
      const response = await fetchSearchProducts(searchInput.trim());
      if (response.status === 200) {
        const data = await response.data;
        navigate("/search-items", { state: { products: data } });
      } else {
        console.error("Failed to fetch search results");
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  }, [searchInput, navigate]);

  useEffect(() => {
    getUsername()
      .then((data) => {
        setUsername(data.username);
        setUserRole("admin"); // Adjust based on actual response
      })
      .catch((error) => {
        console.error("Error fetching username:", error);
      });
  }, []);

  const handleCart = useCallback(() => {
    navigate(isAuthorized ? "/cart" : "/cart-login");
  }, [isAuthorized, navigate]);

  const toggleDropdown = useCallback((category) => {
    setDropdownVisible((prev) => (prev === category ? "" : category));
  }, []);

  const categories = useMemo(
    () => [
      {
        category: "eyeglasses",
        items: ["Plastic Frames", "Metal Frames", "Full Frames"],
      },
      {
        category: "tshirt",
        items: [
          "V-neck tshirts",
          "Basic half sleeve tshirts",
          "Long Sleeve Crew neck tshirts",
        ],
      },
      {
        category: "hoodie",
        items: ["Zip-Up hoodies", "Pullover hoodies", "Fitted hoodies"],
      },
      {
        category: "jeans",
        items: ["Skinny Jeans", "Straight-leg Jeans", "Bootcut Jeans"],
      },
      {
        category: "shirt",
        items: ["Dress Shirts", "Collar Dress Shirts", "Tuxedo Dress Shirts"],
      },
      {
        category: "pants",
        items: ["Bell Bottom Pants", "Bootcut Pants", "Breeches Pants"],
      },
    ],
    []
  );

  return (
    <nav className="nav-wrapper">
      <div className="nav-container">
        <div className="container-left">
          <a href="/" className="brand-logo">
            ClearEyeCare
          </a>
        </div>
        <div className="container-middle">
          <ul className="nav-link">
            {categories.map(({ category, items }) => (
              <Dropdown
                key={category}
                category={category}
                items={items}
                visible={dropdownVisible}
                toggleDropdown={toggleDropdown}
              />
            ))}
          </ul>
        </div>
        <div className="container-right">
          <SearchComponent
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            handleSearch={handleSearch}
          />
          {isAuthorized && userRole === "admin" && (
            <div className="nav-console">
              <Cog />
            </div>
          )}
          <ProfileComponent
            isAuthorized={isAuthorized}
            open={open}
            setOpen={setOpen}
            username={username}
          />
          <div className="nav-cart" onClick={handleCart}>
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

const Dropdown = ({ category, items, visible, toggleDropdown }) => (
  <li
    className="nav-item"
    onMouseEnter={() => toggleDropdown(category)}
    onMouseLeave={() => toggleDropdown("")}
  >
    {category.charAt(0).toUpperCase() + category.slice(1)}
    {visible === category && (
      <div className="dropdown-content">
        {items.map((item) => (
          <a key={item} href="#">
            {item}
          </a>
        ))}
      </div>
    )}
  </li>
);
