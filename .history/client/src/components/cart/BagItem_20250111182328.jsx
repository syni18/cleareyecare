import React, { useCallback, useEffect, useRef } from "react";
import "./bagitem.css";
import useCartStore from "../../redux/store/cartStore";
import { getCartItems } from "../../helper/helper";

const BagItem = () => {
  const hasFetched = useRef(false);

  const {
    cartItems,
    setCartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCartStore();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await getCartItems();
        console.log("Fetched cart items:", response.cart);
        setCartItems(response.cart.items);
      } catch (error) {
        console.error("Failed to fetch cart items:", error);
        // Optionally set an error state here
      }
    };

    if (!hasFetched.current) {
      hasFetched.current = true;
      fetchCartItems();
    }
  }, [setCartItems]);

  const handleIncreaseQuantity = useCallback(
    (productId) => increaseQuantity(productId),
    [increaseQuantity]
  );

  const handleDecreaseQuantity = useCallback(
    (productId) => {
      // Prevent decreasing quantity below zero
      const item = cartItems.find((item) => item.productId._id === productId);
      if (item && item.productId.quantity > 1) {
        decreaseQuantity(productId);
      }
    },
    [decreaseQuantity, cartItems]
  );

  const handleRemoveFromCart = useCallback(
    (productId) => removeFromCart(productId),
    [removeFromCart]
  );

  if (cartItems.length === 0) {
    return <div>Your cart is empty.</div>; // Handle empty cart case
  }

  return (
    <>
      {cartItems.map(({ productId,  }) => (
        <div className="bagitem-wrapper" key={productId._id}>
          <div className="bagitem-container">
            <div className="bagitem-items">
              <img src={productId.thumbnail} alt={productId.title} />
              <div className="bagitem-item-det">
                <h4>{productId.title}</h4>
                <button
                  className="bagitem-remove-btn"
                  onClick={() => handleRemoveFromCart(productId._id)}
                >
                  Remove
                </button>
              </div>
            </div>
            <div className="bagitem-attr-cnt">
              <div className="attr-cnt-det">
                <span>Color: {productId.color || "white"}</span>
                <span>Size: {productId.size || "M"}</span>
              </div>
            </div>
            <div className="bagitem-quantity">
              <button
                onClick={() => handleDecreaseQuantity(productId._id)}
                disabled={productId.quantity <= 1} // Disable button if quantity is 1
              >
                -
              </button>
              <span>{productId.stock}</span>
              <button onClick={() => handleIncreaseQuantity(productId._id)}>
                +
              </button>
            </div>
            <div className="bagitem-shipcost">
              <span>
                {productId.price * productId.quantity <= 499
                  ? "Rs.15.00"
                  : "Free Delivery"}
              </span>
            </div>
            <div className="bagitem-price">
              <span>Rs.{productId.price}</span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default BagItem;
