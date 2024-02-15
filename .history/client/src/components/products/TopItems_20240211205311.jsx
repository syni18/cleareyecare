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
          <Link to={`/item/${item.id}`}>
            <div className="product">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="product-image"
              />
              <div className="product-info">
                <h3 className="product-title">{item.title}</h3>
                <p className="product-price">Rs {product.price}</p>
              </div>
            </div>
          </Link>
      </div>
    </div>
  );
}

export default TopItems;
