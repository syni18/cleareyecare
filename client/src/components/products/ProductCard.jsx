import React from "react";
import "./productcard.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/action/cartAction";



function ProductCard({item}) {
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent the default anchor action
    // Dispatch the addToCart action with the item as its payload
    dispatch(
      addToCart({
        ...item,
        quantity: 1, // Assuming you want to add 1 quantity of the item, adjust accordingly
      })
    );
  };
  
  return (
    <div className="productcard-wrapper">
        <Link to={`/item/${item._id}`}>
          <div className="product">
            <img
              src={item.thumbnail}
              alt={item.title}
              className="product-image"
            />
            <div className="product-info">
              <h3 className="product-title">{item.title}</h3>
              <p className="product-price">Rs {item.price}</p>
            </div>
          </div>
        </Link>
      <a href="" className="body-buy-btn">
        Buy Now
      </a>
      <a href="#" className="body-cart-btn" onClick={handleAddToCart}>
        {/* Add to Cart */}
      </a>
    </div>
  );
}

export default ProductCard;
