import React from "react";
import './topitem.css';
import { Star } from "lucide-react";
import { Link } from "react-router-dom";

const TopItems = ({item}) => {
  const itemDetailsLink = {
    pathname: `/item/${item.id}`,
    state: { item: item },
  };

  return (
    <div className="page-top-tdhead">
      <label htmlFor="" className="tdhead-label">
        Top Smartphone Product
      </label>
      <div className="product-grid">
  
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
      </div>
    </div>
  );
}

export default TopItems;
