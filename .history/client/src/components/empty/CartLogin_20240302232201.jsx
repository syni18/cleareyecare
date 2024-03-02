import React from 'react'
import './cartlogin.css';

import NoCart from '../../assets/no-cart.png';
import { useNavigate } from 'react-router-dom';
function CartLogin() {
    const navigate = useNavigate(); // Initialize useNavigate hook

    const navigateToLogin = () => {
      navigate("/login"); // Navigate to the homepage
    };
  return (
    <div className="no-cart-wrapper">
      <img src={NoCart} alt="" />
      <p>Login to see the items you added previously</p>
      <div className="cart-login-wrap">
        <button type="button" onClick={navigateToLogin}>
          Login
        </button>
      </div>
    </div>
  );
}

export default CartLogin