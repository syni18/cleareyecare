import React, { useState } from "react";
import "./shoppingbag.css";
import ShoppingBag from "./ShoppingBag";
import CartLogin from "../";
import { useSelector } from "react-redux";

function Cart() {
  const isAuthorized = localStorage.getItem("token"); // Check if user is logged in

  return (
    <div className="cart-wrapper">
      {isAuthorized ? <ShoppingBag /> : <CartLogin />}
    </div>
  );
}

export default Cart;
