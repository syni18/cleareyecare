import React from 'react'
import './emptycart.css';
import emptycart from '../../assets/empty-cart.svg';
import { useNavigate } from 'react-router-dom';

function EmptyCart() {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const navigateToHome = () => {
    navigate("/"); // Navigate to the homepage
  };
  return (
    <div className="empty-cart-wrapper">
        <img src={emptycart} alt="" />
        <div className="cart-shop-wrap">
            <button type="button" onClick={navigateToHome}>Shop Now</button>
        </div>
    </div>
  )
}

export default EmptyCart;