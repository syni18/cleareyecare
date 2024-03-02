import React from 'react'
import NoCart from '../../assets/no-cart.png';
function CartLogin() {
    const navigate = useNavigate(); // Initialize useNavigate hook

    const navigateToHome = () => {
      navigate("/login"); // Navigate to the homepage
    };
  return (
    <div className="empty-cart-wrapper">
      <img src={NoCart} alt="" />
      <div className="cart-shop-wrap">
        <button type="button" onClick={navigateToLogin}>
          Shop Now
        </button>
      </div>
    </div>
  );
}

export default CartLogin