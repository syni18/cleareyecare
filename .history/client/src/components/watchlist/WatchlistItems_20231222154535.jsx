import React from 'react'
import './watchlistitem.css';
import img4 from '../../assets/img4.png';
import { Star, Trash } from 'lucide-react';
function WatchlistItems() {
  return (
    <div className="watchlist-item-wrapper">
      <div className="watchlist-item-wleft">
        <div className="item-wleft-img">
          <img src={img4} alt="" />
        </div>
        <div className="item-wleft-detail">
          <div className="wleft-detail-title">
            <span>
              Fastrack Revoltt FS1|1.83 Display|BT Calling|Fastcharge|110+
              Sports Mode|200+ WatchFaces Smartwatch (Black Strap, Free Size)
            </span>
          </div>
          <div className="wleft-detail-rating">
            <span>
              3.5
              <Star color="#fff" fill="#fff" size={18}/>
            </span>
          </div>
          <div className="wleft-detail-price">
            <span>
              $1300{" "}
              <span>
                <small>$1500</small>(50% off)
              </span>
            </span>
          </div>
        </div>
      </div>
      <div className="watchlist-item-wright">
        <span>
          <Trash />
        </span>
      </div>
    </div>
  );
}

export default WatchlistItems;