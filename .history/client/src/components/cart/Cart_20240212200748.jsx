import React from 'react'
import './cart.css';
import { MapPin, PackagePlus } from "lucide-react";
import CartCalculation from './CartCalculation';
import UPImode from '../paymentsmode/UPImode';
import Cardmode from '../paymentsmode/Cardmode';
import CartItem from '../products/CartItem';
import EmptyCart from '../empty/EmptyCart';
import { useSelector } from 'react-redux';

function Cart() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  return (
    <div className="cart-wrapper">
      <div className="cart-container">
        {cartItems.length > 0 ? ():()}
        
        <div className="cart-right-checkout">
          {/* total price summary and checkout btn */}
          <CartCalculation />
        </div>
      </div>
      <EmptyCart/>
    </div>
  );
}

export default Cart