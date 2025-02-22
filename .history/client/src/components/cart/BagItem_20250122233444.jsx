import React, { useState } from "react";
import "./bagitem.css";
import IMG from "../../assets/img1.png";
import { Heart, Trash } from "lucide-react";

const BagItem = ({key,item,increaseQuantity,decreaseQuantity,removeFromCart}) => {

  const [size, setSize] = useState("XL");
  const [color, setColor] = useState("Blue");
  const [quantity, setQuantity] = useState(1);

  console.log("rtr", item);
  
  const handleQuantityChange = (type) => {
    setQuantity((prev) =>
      type === "increment" ? prev + 1 : Math.max(prev - 1, 1)
    );
  };

  return (
    <div className="bgt-wrapper">
      <div className="bgt-container">
        {/* Left Side: Product Image */}
        <div className="bgt-ct-left">
          <img
            src={item.productId.thumbnail}
            alt="Product"
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
                <span className="lt-det-rating">{item.productId.rating}<Star/></></span>
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
              <select
                className="btl-size-dropdown"
                value={size}
                onChange={(e) => setSize(e.target.value)}
              >
                {["S", "M", "L", "XL", "XXL"].map((sizeOption) => (
                  <option key={sizeOption} value={sizeOption}>
                    {sizeOption}
                  </option>
                ))}
              </select>

              {/* Color Dropdown */}
              <select
                className="btl-color-dropdown"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              >
                {["Red", "Blue", "Green", "Black", "White"].map(
                  (colorOption) => (
                    <option key={colorOption} value={colorOption}>
                      {colorOption}
                    </option>
                  )
                )}
              </select>

              {/* Quantity Selector */}
              <div className="btl-qty-selector">
                <button
                  className="qty-btn"
                  onClick={() => handleQuantityChange("decrement")}
                >
                  -
                </button>
                <span className="qty-display">{item.quantity}</span>
                <button
                  className="qty-btn"
                  onClick={() => handleQuantityChange("increment")}
                >
                  +
                </button>
              </div>
            </div>
            <div className="rt-bottom-right">
              <div className="bt-rt-save">
                <span>
                  <Heart fill="#888" size={18} />
                </span>
                <button className="bt-save" onClick={""}>
                  save
                </button>
              </div>
              <div className="bt-rt-delete">
                <span>
                  <Trash fill="#888" size={18} />
                </span>

                <button className="bt-delete" onClick={""}>
                  delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BagItem;
