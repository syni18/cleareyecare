import React, { useCallback, useEffect, useRef } from "react";
import "./bagitem.css";
import useCartStore from "../../redux/store/cartStore";
import { getItemsInCart } from "../../../../server/controllers/appController";

const BagItem = () => {
  const hasFetched = useRef(false);
  
  const { 
    cartItems,
    setCartItems,
    increaseQuantity, 
    decreaseQuantity, 
    removeFromCart 
  } = useCartStore();

  useEffect(() => {
      const fetchCartItems = async () => {
        try {
          const response = await getItemsInCart();
          console.log("rg", response.cart);
          
          setWishlistItem(response.cart);
        } catch (error) {
          console.error("Failed to fetch cart Items:", error);
        }
      };
  
      if (!hasFetched.current) {
        hasFetched.current = true;
        fetchCartItems();
      }
    }, []);
  console.log("fdbd", cartItems);
  

  const handleIncreaseQuantity = useCallback(
    (productId) => increaseQuantity(productId),
    [increaseQuantity]
  );

  const handleDecreaseQuantity = useCallback(
    (productId) => decreaseQuantity(productId),
    [decreaseQuantity]
  );

  const handleRemoveFromCart = useCallback(
    (productId) => removeFromCart(productId),
    [removeFromCart]
  );

  return (
    <>
      {cartItems.map((item) => (
        <div className="bagitem-wrapper" key={item._id}>
          <div className="bagitem-container">
            <div className="bagitem-items">
              <img src={item.thumbnail} alt={item.title} />
              <div className="bagitem-item-det">
                <h4>{item.title}</h4>
                <button
                  className="bagitem-remove-btn"
                  onClick={() => handleRemoveFromCart(item._id)}
                >
                  Remove
                </button>
              </div>
            </div>
            <div className="bagitem-attr-cnt">
              <div className="attr-cnt-det">
                <span>Color: {item.color || "white"}</span>
                <span>Size: {item.size || "M"}</span>
              </div>
            </div>
            <div className="bagitem-quantity">
              <button onClick={() => handleDecreaseQuantity(item._id)}>
                -
              </button>
              <span>{item.quantity}</span>
              <button onClick={() => handleIncreaseQuantity(item._id)}>
                +
              </button>
            </div>
            <div className="bagitem-shipcost">
              <span>
                {item.price * item.quantity <= 499
                  ? "Rs.15.00"
                  : "Free Delivery"}
              </span>
            </div>
            <div className="bagitem-price">
              <span>Rs.{item.price}</span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default BagItem;
