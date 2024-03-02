import React from 'react'
import './watchlist.css';
import WatchlistItems from './WatchlistItems';
import { useSelector } from 'react-redux';
import TopItems from '../products/TopItems';
import { Link } from 'react-router-dom';
import { Trash } from 'lucide-react';

function Watchlist() {
  const watchlistItems = useSelector(state => state.watchlist.watchlistItems)
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
              <div className="watchlist-modify-btn">
                <button className='watchlist-cart-btn'>Move To cart</button>
                <button className='watchlist-trash-btn'><Trash size={18}/></button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Watchlist;