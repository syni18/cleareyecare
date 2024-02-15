import React from "react";
import './topitem.css';
import { Link } from "react-router-dom";

const TopItems = ({item}) => {
  

  return (
    <div className="page-top-tdhead">
      <label htmlFor="" className="tdhead-label">
        Top Smartphone Product
      </label>
      <div className="product-grids">
        {item.slice(0, 6).map((product) => {
          const itemDetailsLink = {
            pathname: `/item/${product.id}`,
            state: { item: product },
          };
          
        })}
      </div>
    </div>
  );
}

export default TopItems;
