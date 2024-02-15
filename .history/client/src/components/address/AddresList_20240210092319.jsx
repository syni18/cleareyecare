import React, { useState } from "react";

function AddresList() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <div className="form-saved-left">
        <div className="saved-address-tag">
          <span>Home</span>
        </div>
        <div className="saved-address-nameph">
          <span className="saved-name">Sahil Saini</span>
          <span className="saved-phno">+914553969345</span>
        </div>
        <div className="saved-address-local">
          <span>
            603, bhora kalan patti chainpura, Binola Industrial Area, Haryana -
            122413
          </span>
        </div>
      </div>
      <div className="address-saved-edit">
        <div className="dropdown">
          <button className="dropbtn" onClick={toggleDropdown}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="grey"
              stroke="rgb(130,130,130)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-grip-vertical"
            >
              <circle cx="9" cy="12" r="1" />
              <circle cx="9" cy="5" r="1" />
              <circle cx="9" cy="19" r="1" />
            </svg>
          </button>
          {isDropdownOpen && (
            <div className="dropdown-content">
              <a href="#">Edit</a>
              <a href="#">Delete</a>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default AddresList;
