import React from 'react'
import './watchlist.css';
import { useDispatch, useSelector } from "react-redux";
import { removeFromWatchlist } from "../../redux/action/watchlistAction";

import { Link } from 'react-router-dom';
import { Trash } from 'lucide-react';

function Watchlist() {
   const dispatch = useDispatch();
   const watchlistItems = useSelector(
     (state) => state.watchlist.watchlistItems
   );

   const handleRemoveFromWatchlist = (itemId) => {
     // Dispatch an action to remove the item from the watchlist
     dispatch(removeFromWatchlist(itemId));
   };
  // const watchlistItems = useSelector(state => state.watchlist.watchlistItems)
  return (
    <div className="watchlist-wrapper">
      <div className="watchlist-container">
        <div className="watchlist-head">
          <label htmlFor="">
            My Watchlist <span>({watchlistItems.length})</span>
          </label>
        </div>
        <ul className="watchlist-list">
          {watchlistItems.map((item, index) => (
            <li key={index} className="watchlist-list-item">
              <Link to={`/item/${item.id}`}>
                <div className="watchlist">
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
              <div className="watchlist-modify-btn">
                <button
                  className="watchlist-cart-btn"
                  onClick={() => handleMoveToCart(item)}
                >
                  Move To cart
                </button>
                <button
                  className="watchlist-trash-btn"
                  onClick={() => handleRemoveFromWatchlist(item.id)}
                >
                  <Trash size={18} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Watchlist;