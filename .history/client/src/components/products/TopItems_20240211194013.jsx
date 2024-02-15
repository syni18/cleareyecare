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
    <div className="product-grid">
      <div className="static-products">
        <h2>Top Static Products</h2>
        <div className="products">
          {Array(4)
            .fill(null)
            .map((_, index) => (
              <img
                key={index}
                src={`img${index + 1}.jpg`}
                alt={`Product ${index + 1}`}
              />
            ))}
        </div>
      </div>

      <div className="rated-products">
        <h2>Top Rated Products</h2>
        <div className="products">
          {Array(4)
            .fill(null)
            .map((_, index) => (
              <img
                key={index}
                src={`img${index + 5}.jpg`}
                alt={`Product ${index + 5}`}
              />
            ))}
        </div>
      </div>

      {/* Add your CSS styles or import them from another file */}
    </div>
  );
}

export default TopItems;
