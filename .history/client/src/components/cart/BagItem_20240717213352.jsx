import React from "react";
import "./bagitem.css";
import useCartStore from "../../redux/store/cartStore";

function BagItem() {
  const cartItems = useCartStore((state) => state.cartItems);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  return (
    <>
      {cartItems.map((item, index) => (
        <div className="bagitem-wrapper" key={index}>
          <div className="bagitem-container">
            <div className="bagitem-items">
              <img src={item.thumbnail} alt="" />
              <div className="bagitem-item-det">
                <h4>{item.title}</h4>
                <button
                  className="bagitem-remove-btn"
                  onClick={() => removeFromCart(item._id)}
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
              <button onClick={() => decreaseQuantity(item._id)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => increaseQuantity(item._id)}>+</button>
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
}

export default BagItem;
