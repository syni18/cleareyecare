import React from 'react'
import './profile.css';
import { ChevronRight, Import, LogOut, ScrollText, User, UserRound, Wallet } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
// import ProfileInfo from './ProfileInfo';
// import AddressForm from '../address/ManageAddress';
// import PANUpload from '../PANupload/PANUpload';
// import PaymentCard from '../paymentcard/PaymentCard';
// import PaymentUPI from '../paymentcard/PaymentUPI';
// import GiftCard from '../giftcard/GiftCard';
// import Coupons from '../coupons-offers/Coupons';
// import Watchlist from '../watchlist/Watchlist';

function Profile() {
  const navigate = useNavigate();
  // const handleProfileinfo = ()=>{
  //   navigate('/profile/userinfo');
  // }
  const handleOrders= () =>{
    navigate('/orders');
  }
  return (
    <div className="profile-wrapper">
      <div className="profile-container">
        <div className="profile-head-left">
          <div className="profile-hl-account">
            <span className="hl-account-circle">
              <UserRound color="#490B3D" />
            </span>
            <div className="hl-account-admin">
              <small>Hello,</small>
              <h4>Administrator</h4>
            </div>
          </div>
          <div className="profile-hl-linkcase">
            <div className="hl-linkcase-orders" onClick={handleOrders}>
              <span>
                <ScrollText color="#490B3D" />
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
                  <User color="#490B3D" />
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
                  <Wallet color="#490B3D" />
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
                  <Import color="#490B3D" />
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
            <div className="hl-linkcase-logout">
              <span>
                <LogOut color="#490B3D" />
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