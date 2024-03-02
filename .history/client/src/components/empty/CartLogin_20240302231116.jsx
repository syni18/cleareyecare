import React from 'react'
import No from '../../assets/no-cart.png';
function CartLogin() {
  return (
    <div className="empty-cart-wrapper">
      <img src={CartLogin} alt="" />
      <div className="cart-shop-wrap">
        <button type="button" onClick={navigateToHome}>
          Shop Now
        </button>
      </div>
    </div>
  );
}

export default CartLogin