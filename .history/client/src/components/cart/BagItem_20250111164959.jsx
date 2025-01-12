import React, { useCallback, useEffect } from "react";
import "./bagitem.css";
import useCartStore from "../../redux/store/cartStore";

const BagItem = () => {
  const { 
    cartItems,
    setCartItems,
    increaseQuantity, 
    decreaseQuantity, 
    removeFromCart 
  } = useCartStore();

  useEffect(() => {
      const fetchWishlists = async () => {
        try {
          const response = await get("wishlist");
          setWishlistItem(response.wishlist);
        } catch (error) {
          console.error("Failed to fetch wishlists:", error);
        }
      };
  
      if (!hasFetched.current) {
        hasFetched.current = true;
        fetchWishlists();
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
