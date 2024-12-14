import React, { useEffect, useState } from 'react'
import './profile.css';
import { ChevronRight, Import, LogOut, ScrollText, User, UserRound, Wallet } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { getUsername } from '../../helper/helper';
import { useUser } from '../../redux/context/UserContext';


function Profile() {
  const { user } = useUser();
  const navigate = useNavigate();
    const usernamePromise = getUsername();
  const [username, setUsername] = useState("");
  const handleOrders= () =>{
    navigate('/orders');
  }
  const handlelogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  useEffect(()=> {
    usernamePromise
      .then((data) => {
        setUsername(data.username); // Set the username state with the data
      })
      .catch((error) => {
        console.error("Error fetching username:", error);
      });
  },[usernamePromise])
  return (
    <div className="profile-wrapper">
      <div className="profile-container">
        <div className="profile-head-left">
          <div className="profile-hl-account">
            <span className="hl-account-circle">
              {user.avatar ? (
                <>
                  <UserRound color="#007bff">
                  <img
                    src={user.avatar}
                    alt="User Avatar"
                    className="user-avatar"
                  />
                </>
              ) : (
                <UserRound color="#007bff" />
              )}
            </span>
            <div className="hl-account-admin">
              <small>Hello,</small>
              <h4>{`${username.toUpperCase()}`}</h4>
            </div>
          </div>
          <div className="profile-hl-linkcase">
            <div className="hl-linkcase-orders" onClick={handleOrders}>
              <span>
                <ScrollText color="#007bff" />
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
                  <User color="#007bff" />
                </span>
                <h4>Account Settings</h4>
              </div>
              <ul className="acc-edit-sublink">
                <li>
                  <Link to="/profile/userinfo">Profile Information</Link>
                </li>
                <li>
                  <Link to="/profile/manage-address">Manage Address</Link>
                </li>
                <li>
                  <Link to="/profile/pan-upload">PAN Card Information</Link>
                </li>
              </ul>
            </div>
            <div className="hl-linkcase-pay-edit">
              <div className="pay-edit-head">
                <span>
                  <Wallet color="#007bff" />
                </span>
                <h4>Payments</h4>
              </div>
              <ul className="acc-edit-sublink">
                <li>
                  <Link to="/profile/saved-auth-payment-cards">Saved Card</Link>
                </li>
                <li>
                  <Link to="/profile/saved-auth-payment-upi">Saved UPI</Link>
                </li>
                <li>
                  <Link to="/profile/saved-auth-giftCards">Gift Card</Link>
                </li>
              </ul>
            </div>
            <div className="hl-linkcase-save-stuff">
              <div className="save-stuff-head">
                <span>
                  <Import color="#007bff" />
                </span>
                <h4>My Stuff</h4>
              </div>
              <ul className="acc-edit-sublink">
                <li>
                  <Link to="/profile/myCoupons">My coupons</Link>
                </li>
                <li>
                  <Link to="/profile/reviews-ratings">
                    My Ratings & Reviews
                  </Link>
                </li>
                <li>
                  <Link to="/profile/watchlist">My Watchlists</Link>
                </li>
              </ul>
            </div>
            <div className="hl-linkcase-logout" onClick={handlelogout}>
              <span>
                <LogOut color="#007bff" />
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

export default Profile