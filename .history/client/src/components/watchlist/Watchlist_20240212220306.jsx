import React from 'react'
import './watchlist.css';
import WatchlistItems from './WatchlistItems';
import { useSelector } from 'react-redux';

function Watchlist() {
  const watchlistItems = useSelector(state => state.watchlist.watchlistItems)
  return (
    <div className="watchlist-wrapper">
      <div className="watchlist-container">
        <div className="watchlist-head">
          <label htmlFor="">
            My Watchlist <span>(17)</span>
          </label>
        </div>
        <ul className="watchlist-list">
          <li className="watchlist-list-item">
            <WatchlistItems />
          </li>
          <li className="watchlist-list-item">
            <WatchlistItems />
          </li>
          <li className="watchlist-list-item">
            <WatchlistItems />
          </li>
          <li className="watchlist-list-item">
            <WatchlistItems />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Watchlist;