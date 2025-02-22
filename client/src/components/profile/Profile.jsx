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
import { NavLink, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import useUserStore from "../../redux/store/userStore";

function Profile() {
  const { user, loading, error } = useUserStore((state) => ({
    user: state.user,
    loading: state.loading,
    error: state.error,
  }));
  
  // console.log("ryj", user);
  
  const navigate = useNavigate();

  const handleOrders = () => {
    navigate("/orders");
  };
  const handlelogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  if (error) {
    return <div>{error}</div>; // Show error message
  }

  if (!user) {
    return <div>No user data available.</div>; // Handle the case where user is null
  }
  

  return (
    <div className="profile-wrapper">
      <div className="profile-container">
        <div className="profile-head-left">
          <div className="profile-hl-account">
            <span
              className={`hl-account-circle ${
                user && !user.avatar ? "with-padding" : ""
              }`}
            >
              {user ? (
                <img src={user.avatar} alt="UA" className="user-avatar" />
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
            <div className="hl-linkcase-acc-edit">
              <div className="acc-edit-head">
                <span>
                  <User color="#b76d3e" />
                </span>
                <h4>Account Settings</h4>
              </div>
              <ul className="acc-edit-sublink">
                <li>
                  <NavLink to="/profile/userinfo">Profile Information</NavLink>
                </li>
                <li>
                  <NavLink to="/profile/manage-address">Manage Address</NavLink>
                </li>
                <li>
                  <NavLink to="/profile/pan-upload">
                    PAN Card Information
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className="hl-linkcase-pay-edit">
              <div className="pay-edit-head">
                <span>
                  <Wallet color="#b76d3e" />
                </span>
                <h4>Payments</h4>
              </div>
              <ul className="acc-edit-sublink">
                <li>
                  <NavLink to="/profile/saved-auth-payment-cards">
                    Saved Card
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/profile/saved-auth-payment-upi">
                    Saved UPI
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/profile/saved-auth-giftCards">
                    Gift Card
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className="hl-linkcase-save-stuff">
              <div className="save-stuff-head">
                <span>
                  <Import color="#b76d3e" />
                </span>
                <h4>My Stuff</h4>
              </div>
              <ul className="acc-edit-sublink">
                <li>
                  <NavLink to="/profile/myCoupons">My coupons</NavLink>
                </li>
                <li>
                  <NavLink to="/profile/reviews-ratings">
                    My Ratings & Reviews
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/profile/watchlist">My Watchlists</NavLink>
                </li>
              </ul>
            </div>
            <div className="hl-linkcase-logout" onClick={handlelogout}>
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
