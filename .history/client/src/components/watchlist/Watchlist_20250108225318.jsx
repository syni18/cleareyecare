import React, { useCallback, useEffect, useRef } from "react";
import "./watchlist.css";
import { Link } from "react-router-dom";
import { Trash } from "lucide-react";
import { getWishlists } from "../../helper/helper";
import { useWishlistStore } from '../../redux/store/watchlistStore';
import useCartStore from "../../redux/store/cartStore";

const Watchlist = () => {
  const hasFetched = useRef(false); // Track if fetch has already happened
  
  // Destructure the Zustand store states and actions
  const {wishlists, setWishlists, removeItemWishlists } = useWishlistStore();
  const { addToCart } = useCartStore((state) => ({
    addToCart: state.addToCart,
  }));

  useEffect(() => {
    const fetchWishlists = async () => {
      try {
        const response = await getWishlists("wishlist");
        // console.log(" recieved ", response);
        
        setWishlists(response.data.wishlist);
      } catch (error) {
        
      }
    };
    if (!hasFetched.current) {
      hasFetched.current = true; // Mark as fetched
      fetchWishlists();
    }
  }, [setWishlists])

  // Fetch watchlist items only if they are not already fetched
  // useEffect(() => {
  //   if (watchlistItems.length === 0) {
  //     fetchWatchlist();
  //   }
  // }, [watchlistItems.length, fetchWatchlist]);

  // console.log(watchlistItems);

  // Memoized handler for moving items to cart
  const handleMoveToCart = useCallback(
    (item) => {
      addToCart(item);
      removeItemWishlists(item._id);
    },
    [addToCart, removeItemWishlists]
  );

  // Memoized handler for removing items from watchlist
  const handleRemoveFromWatchlist = useCallback(
    (itemId) => {
      removeItemWishlists(itemId);
    },[removeItemWishlists]);

  return (
    <div className="watchlist-wrapper">
      <div className="watchlist-container">
        <div className="watchlist-head">
          <label>
            My Watchlist <span>({wishlists.length})</span>
          </label>
        </div>
        <ul className="watchlist-list">
          {wishlists.map((item) => (
            <li key={item._id} className="watchlist-list-item">
              <Link to={`/item/${item._id}`}>
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
                  onClick={() => handleRemoveFromWatchlist(item._id)}
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
};

export default React.memo(Watchlist);
