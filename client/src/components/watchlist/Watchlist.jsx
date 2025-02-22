import React, { useCallback, useEffect, useRef, useState } from "react";
import "./watchlist.css";
import { Link } from "react-router-dom";
import { Trash } from "lucide-react";
import { addProductToCart, getWishlists, removeFromWishlists } from "../../helper/helper";
import { useWishlistStore } from "../../redux/store/watchlistStore";
import useCartStore from "../../redux/store/cartStore";

const Watchlist = () => {
  const hasFetched = useRef(false);
  const [wishListItem, setWishlistItem] = useState([]);

  // Destructure the Zustand store states and actions
  const { wishlists, setWishlists, removeItemWishlists } = useWishlistStore();
  const { addToCart } = useCartStore();

  useEffect(() => {
    const fetchWishlists = async () => {
      try {
        const response = await getWishlists("wishlist");
        setWishlistItem(response.wishlist);
      } catch (error) {
        console.error("Failed to fetch wishlists:", error);
      }
    };

    if (!hasFetched.current) {
      hasFetched.current = true;
      fetchWishlists();
    }
  }, []);

  const handleMoveToCart = useCallback(
    async (item) => {      
      console.log("watchlist :", item);
      
      addToCart(item);
      const items = await removeFromWishlists(item._id);
        setWishlistItem(items.updatedWishlist);
      removeItemWishlists(item._id);
      const data = {
        productId: item._id,
        title: item.title,
        price: item.price,
        quantity: 1,
        thumbnail: item.thumbnail,
        category: item.category,
        description: item.description,
      }
      const cartItems = await addProductToCart(data);
    },
    [addToCart, removeItemWishlists]
  );

  const handleRemoveFromWatchlist = useCallback(
    async (itemId) => {
      try {
        const item = await removeFromWishlists(itemId);
        setWishlistItem(item.updatedWishlist);
        removeItemWishlists(itemId);
      } catch (error) {
        console.error("Failed to remove item from wishlist:", error);
      }
    },
    [removeItemWishlists]
  );

  return (
    <div className="watchlist-wrapper">
      <div className="watchlist-container">
        <div className="watchlist-head">
          <label>
            My Wishlist{" "}
            <span>
              {wishListItem.length} <span>Items</span>
            </span>
          </label>
        </div>
        <ul className="watchlist-list">
          {wishListItem.map((item) => (
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
                  Move To Cart
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
