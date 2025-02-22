import React, { useCallback, useState } from "react";
import "./bagitem.css";
import { Heart, Star, Trash, Trash2 } from "lucide-react";
import { editItemsInCart, removeProductFromCart } from "../../helper/helper";

const BagItem = ({
  key,
  item,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
}) => {
  const [options, setOptions] = useState({
    size: "XL",
    color: "Blue",
    quantity: item.quantity || 1,
  });

  const handleIncreaseQuantity = useCallback(
    async (id) => {
      increaseQuantity(id);
      await editItemsInCart({ id, quantity: +1 });
      setOptions((prev) => ({ ...prev, quantity: prev.quantity + 1 }));
    },
    [increaseQuantity, options.quantity]
  );

  const handleDecreaseQuantity = useCallback(
    async (id) => {
      if (options.quantity > 1) {
        decreaseQuantity(id);
        await editItemsInCart({ id, quantity: -1 });
        setOptions((prev) => ({ ...prev, quantity: prev.quantity - 1 }));
      }
    },
    [decreaseQuantity, options.quantity]
  );

  const handleRemoveFromCart = useCallback(
    async (item) => {
      removeFromCart(item);
      await removeProductFromCart(item);
    },
    [removeFromCart, item]
  );

  return (
    <div className="bgt-wrapper">
      <div className="bgt-container">
        {/* Left Side: Product Image */}
        <div className="bgt-ct-left">
          <img
            src={item.productId.thumbnail}
            alt={item.productId.title.slice(0, 1)}
            className="ct-lt-imgcard"
          />
        </div>
        {/* Right Side: Product Details */}
        <div className="bgt-ct-right">
          {/* Top Section: Name and Price */}
          <div className="ct-rt-top">
            <div className="rt-top-left">
              <span className="top-lt-name">{item.productId.title}</span>
              <div className="top-lt-det">
                <span className="lt-det-price">${item.price}</span>
                <span className="lt-det-break">|</span>
                <span className="lt-det-rating">
                  {item.productId.rating}
                  <Star
                    fill="rgb(85, 180, 8)"
                    color="rgb(85, 180, 8)"
                    size={16}
                  />
                </span>
                <span className="lt-det-break">|</span>
                <span className="lt-det-stock">In Stock</span>
              </div>
            </div>
            <span className="rt-top-right">${item.price}</span>
          </div>
          {/* Bottom Section: Options */}
          <div className="ct-rt-bottom">
            <div className="rt-bottom-left">
              {/* Size Dropdown */}
              <div className="rtb-left-size">
                <select
                  className="btl-size-dropdown"
                  value={options.size}
                  onChange={(e) =>
                    setOptions({ ...options, size: e.target.value })
                  }
                >
                  {["S", "M", "L", "XL", "XXL"].map((sizeOption) => (
                    <option key={sizeOption} value={sizeOption}>
                      {sizeOption}
                    </option>
                  ))}
                </select>
              </div>
              {/* Color Dropdown */}
              <div className="rtb-left-color">
                <select
                  className="btl-color-dropdown"
                  value={options.color}
                  onChange={(e) =>
                    setOptions({ ...options, color: e.target.value })
                  }
                >
                  {["Red", "Blue", "Green", "Black", "White"].map(
                    (colorOption) => (
                      <option key={colorOption} value={colorOption}>
                        {colorOption}
                      </option>
                    )
                  )}
                </select>
              </div>
              {/* Quantity Selector */}
              <div className="btl-qty-selector">
                <button
                  className="qty-btn"
                  onClick={() => handleDecreaseQuantity(item.productId._id)}
                >
                  -
                </button>
                <span className="qty-display">{options.quantity}</span>
                <button
                  className="qty-btn"
                  onClick={() => handleIncreaseQuantity(item.productId._id)}
                >
                  +
                </button>
              </div>
            </div>
            <div className="rt-bottom-right">
              <div className="bt-rt-save">
                <span>
                  <Heart fill="#ddd" size={18} />
                </span>
                <button className="bt-save" onClick={() => {}}>
                  save
                </button>
              </div>
              <div
                className="bt-rt-delete"
                onClick={() => handleRemoveFromCart(item)}
              >
                <span>
                  <Trash2 fill="#ddd" size={18} />
                </span>
                <button className="bt-delete">delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BagItem;
