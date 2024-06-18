import React, { useState, useEffect } from "react";
import "./watchlist.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Trash } from "lucide-react";
import { addToCart } from "../../redux/action/cartAction";
import { fetchWatchlist, removeFromWatchlistAction } from "../../redux/action/watchlistAction";

function Watchlist() {
  const dispatch = useDispatch();
  // const [watchlistItems, setWatchlistItems] = useState([]);
  const watchlistItems = useSelector((state) => state.watchlist.watchlistItems);
  console.log("watchlistItems", watchlistItems);

  useEffect(() => {
    if (watchlistItems.length) {
      // Fetch watchlist only if it's empty
      dispatch(fetchWatchlist());
    }
  }, [ watchlistItems]);

  const handleMoveToCart = (item) => {
    dispatch(addToCart(item));
    console.log("item", item);
    dispatch(removeFromWatchlistAction(item._id));
  };

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
              <Link to={`/item/${item.data._id}`}>
                <div className="watchlist">
                  <img
                    src={item.data.thumbnail}
                    alt={item.data.title}
                    className="product-image"
                  />
                  <div className="product-info">
                    <h3 className="product-title">{item.data.title}</h3>
                    <p className="product-price">Rs {item.data.price}</p>
                  </div>
                </div>
              </Link>
              <div className="watchlist-modify-btn">
                <button
                  className="watchlist-cart-btn"
                  onClick={() => handleMoveToCart(item.data)}
                >
                  Move To cart
                </button>
                <button
                  className="watchlist-trash-btn"
                  onClick={() => dispatch(removeFromWatchlistAction(item.data._id))}
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
