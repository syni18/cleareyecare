import React from "react";
import "./productcard.css";
import Img4 from '../../assets/img4.png'
import dummy from '../../assets/dummy.png';

function ProductCard({item}) {
  return (
    <div className="productcard-wrapper">
      
        <Link to={`/item/${product.id}`}>
          <div className="product">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="product-image"
            />
            <div className="product-info">
              <h3 className="product-title">{product.title}</h3>
              <p className="product-price">Rs {product.price}</p>
            </div>
          </div>
        </Link>
      <a href="" className="body-buy-btn">
        Buy
      </a>
      <a href="" className="body-cart-btn">
        Add to Cart
      </a>
    </div>
  );
}

export default ProductCard;
