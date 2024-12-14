import React, { useEffect, useState } from "react";
import "./profile.css";
import {
  ChevronRight,
  Import,
  LogOut,
  ScrollText,
  User,
  UserRound,
  Wallet,
} from "lucide-react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { getUsername } from "../../helper/helper";
import { useUser } from "../../redux/context/UserContext";

function Profile() {
  const { user } = useUser();
  const navigate = useNavigate();

  const handleOrders = () => {
    navigate("/orders");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const navLinks = [
    {
      to: "/profile/userinfo",
      label: "Profile Information",
    },
    {
      to: "/profile/manage-address",
      label: "Manage Address",
    },
    {
      to: "/profile/pan-upload",
      label: "PAN Card Information",
    },
    {
      to: "/profile/saved-auth-payment-cards",
      label: "Saved Card",
    },
    {
      to: "/profile/saved-auth-payment-upi",
      label: "Saved UPI",
    },
    {
      to: "/profile/saved-auth-giftCards",
      label: "Gift Card",
    },
    {
      to: "/profile/myCoupons",
      label: "My Coupons",
    },
    {
      to: "/profile/reviews-ratings",
      label: "My Ratings & Reviews",
    },
    {
      to: "/profile/watchlist",
      label: "My Watchlists",
    },
  ];

  return (
    <div className=" profile-wrapper">
      <div className="profile-container">
        <div className="profile-head-left">
          <div className="profile-hl-account">
            <span
              className={`hl-account-circle ${
                !user.avatar ? "with-padding" : ""
              }`}
            >
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt="User  Avatar"
                  className="user-avatar"
                />
              ) : (
                <UserRound color="#b76d3e" />
              )}
            </span>
            <div className="hl-account-admin">
              <small>hello,</small>
              <h4>{`${user.fullname}`}</h4>
            </div>
          </div>
          <div className="profile-hl-linkcase">
            <div className="hl-linkcase-orders" onClick={handleOrders}>
              <span>
                <ScrollText color="#b76d3e" />
              </span>
              <h4>
                My Orders{" "}
                <span>
                  <ChevronRight />
                </span>
              </h4>
            </div>
            {navLinks.map((link, index) => (
              <div className="hl-linkcase-acc-edit" key={index}>
                <div className="acc-edit-head">
                  <span>
                    <User color="#b76d3e" />
                  </span>
                  <h4>{link.label}</h4>
                </div>
                <ul className="acc-edit-sublink">
                  <li>
                    <NavLink to={link.to} activeClassName="active-link">
                      {link.label}
                    </NavLink>
                  </li>
                </ul>
              </div>
            ))}
            <div className="hl-linkcase-logout" onClick={handleLogout}>
              <span>
                <LogOut color="#b76d3e" />
              </span>
              <h4>Log Out</h4>
            </div>
          </div>
        </div>
        <div className="profile-head-right">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Profile;
