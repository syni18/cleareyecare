import React from 'react'
import CartLogin from '../../assets/no'
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