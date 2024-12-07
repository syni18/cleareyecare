import React, { useEffect, useState, useCallback, useMemo } from "react";
import "./navigation.css";
import { debounce } from "lodash";

import { useNavigate } from "react-router-dom";
import AuthDropdown from "../dropdown/Dropdown";
import { fetchSearchProducts } from "../../helper/helper.js";
import { Cog, Search, ShoppingCart, User } from "lucide-react";
import useCartStore from "../../redux/store/cartStore.js";
import { useUser } from "../../redux/context/UserContext.jsx";

const Navigation = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { user } = useUser();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const cartCount = useCartStore((state) => state.cartCount);

  const handleSearch = useCallback(async () => {
    if (!searchInput.trim()) return;
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


 const userRole = user?.role || "guest";
 const username = user?.fullname || "";

  const handleCart = useCallback(() => {
    navigate(isAuthorized ? "/cart" : "/cart-login");
  }, [isAuthorized, navigate]);

  const toggleDropdown = useCallback((category) => {
    setDropdownVisible((prev) => (prev === category ? "" : category));
  }, []);

  const memoizedCategories = useMemo(() => categories, []);

  return (
    <nav className="nav-wrapper">
      <div className="nav-container">
        <div className="container-left">
          <a href="/" className="brand-logo">ClearEyeCare</a>
        </div>
        <div className="container-middle">
          <ul className="nav-link">
            {memoizedCategories.map(({ category, items }) => (
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
          {username && userRole === "admin" && (
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

const Dropdown = ({ category, items, visible, toggleDropdown }) => {
  const chunkedItems = useMemo(() => chunkItems(items, 10), [items]);

  return (
    <li
      className="nav-item"
      onMouseEnter={() => toggleDropdown(category)}
      onMouseLeave={() => toggleDropdown("")}
    >
      {category.charAt(0).toUpperCase() + category.slice(1)}
      {visible === category && (
        <div className="dropdown-content">
          {chunkedItems.map((chunk, index) => (
            <div key={index} className="dropdown-column">
              {chunk.map((item) => (
                <a key={item} href="#">
                  {item}
                </a>
              ))}
            </div>
          ))}
        </div>
      )}
    </li>
  );
};




const SearchComponent = ({ searchInput, setSearchInput, handleSearch }) => {
  const debouncedHandleSearch = useMemo(
    () => debounce(handleSearch, 300),
    [handleSearch]
  );

  useEffect(() => {
    return () => debouncedHandleSearch.cancel(); // Cleanup debounce on unmount
  }, [debouncedHandleSearch]);

  return (
    <div className="nav-search">
      <input
        type="search"
        className="search-input"
        placeholder="Search products..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && searchInput.trim() !== "") {
            debouncedHandleSearch();
          }
        }}
      />
      <button onClick={debouncedHandleSearch} className="search-label">
        <Search />
      </button>
    </div>
  );
};


const ProfileComponent = ({ isAuthorized, open, setOpen, username }) => (
  <div className="nav-profile" onClick={() => setOpen(!open)}>
    {isAuthorized ? (
      <div className="user-auth-icon">
        {username.slice(0,2).toUpperCase()}
      </div>
    ) : (
      <User />
    )}
    {open && (
      <AuthDropdown
        isAuthorized={isAuthorized}
        onClose={() => setOpen(false)}
        user={User}
      />
    )}
  </div>
);

const categories = [
  {
    category: "eyeglasses",
    items: [
      "Plastic Frames",
      "Metal Frames",
      "Full Frames",
      "Semi-Rimless Frames",
      "Rimless Frames",
      "Polycarbonate Lenses",
      "Round Frames",
      "Oval Frames",
      "Square Frames",
      "Cat Eye Frames",
      "Aviator Frames",
      "Rectangular Frames",
      "Horn-Rimmed Frames",
      "Wayfarer Frames",
      "Clubmaster Frames",
      "Clip-On Frames",
    ],
  },
  {
    category: "tshirt",
    items: [
      "V-neck tshirts",
      "Basic half sleeve tshirts",
      "Long Sleeve Crew neck tshirts",
      "Pollo collar tshirts",
      "Ringer tshirts",
      "Turtle neck tshirts",
      "Longline tshirts",
      "Pocket tshirts",
      "Douche bag neck tshirts",
      "Henley tshirts",
      "Graphic tshirts",
      "Sleeveless tshirts",
      "Muscle tshirts",
      "Slub tshirts",
      "Thermal tshirts",
      "Raglan tshirts",
    ],
  },
  {
    category: "hoodie",
    items: [
      "Zip-Up hoodies",
      "Pullover hoodies",
      "Fitted hoodies",
      "Athletic hoodies",
      "Knit-hoodies",
      "Designer hoodies",
      "Sleeveless hoodies",
      "Fleece hoodies",
      "Button-Up Cardigan Sweater hoodies",
      "Flannel Button-Up hoodies",
      "Tubic-Style hoodies",
      "Thermal hoodies",
      "High-Neck hoodies",
      "Cropped hoodies",
      "Sherpa hoodies",
      "Quilted hoodies",
    ],
  },
  {
    category: "jeans",
    items: [
      "Skinny Jeans",
      "Straight-leg Jeans",
      "Bootcut Jeans",
      "Flared Jeans",
      "Boyfriend Jeans",
      "High-Waisted Jeans",
      "Low-Rise Jeans",
      "Mom Jeans",
      "Jeggings Jeans",
      "Distressed Jeans",
      "Cropped Jeans",
      "Wide-Leg Jeans",
      "Tapered Jeans",
      "Slim Fit Jeans",
      "Relaxed Fit Jeans",
      "Stretch Jeans",
    ],
  },
  {
    category: "shirt",
    items: [
      "Dress Shirts",
      "Collar Dress Shirts",
      "Tuxedo Dress Shirts",
      "Denim Shirts",
      "Men's Casual Shirts",
      "Button-Down Shirts",
      "Banded Collar Shirts",
      "Spread Collar Shirts",
      "Club Collar Shirts",
      "Flannel Shirts",
      "Oxford Shirts",
      "Chambray Shirts",
      "Linen Shirts",
      "Hawaiian Shirts",
      "Western Shirts",
      "Military Shirts",
    ],
  },
  {
    category: "pants",
    items: [
      "Bell Bottom Pants",
      "Bootcut Pants",
      "Breeches Pants",
      "Cargo Pants",
      "Carpenter Pants",
      "Chaps Pants",
      "Chinos Pants",
      "Corduroy Pants",
      "Dickies Pants",
      "Flat Front Pants",
      "Joggers",
      "Pleated Pants",
      "Suit Pants",
      "Khaki Pants",
      "Track Pants",
      "Trousers",
    ],
  },
];

const chunkItems = (items, size) => {
  const chunks = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
};

