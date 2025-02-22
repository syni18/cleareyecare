import React from "react";
import "./topitem.css";
import { Link } from "react-router-dom";

const TopItems = ({ item }) => {
  return (
    <div className="page-top-tdhead">
      <label htmlFor="" className="tdhead-label">
        You may also like
      </label>
      <div className="product-grids">
        {item.slice(0, 5).map((product) => {
          const itemDetailsLink = {
            pathname: `/item/${product.id}`,
            state: { item: product },
          };
          return (
            <Link key={product.id} to={itemDetailsLink}>
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
          );
        })}
      </div>
    </div>
  );
};

export default TopItems;
