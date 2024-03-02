import React from 'react'

function CartLogin() {
  return (
    <div className="empty-cart-wrapper">
      <img src={emptycart} alt="" />
      <div className="cart-shop-wrap">
        <button type="button" onClick={navigateToHome}>
          Shop Now
        </button>
      </div>
    </div>
  );
}

export default CartLogin