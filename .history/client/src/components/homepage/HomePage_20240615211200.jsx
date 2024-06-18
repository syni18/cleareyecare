import React, { useCallback, useMemo } from "react";
import "./homepage.css";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import ProductPlaceholder from "../placeholder/Placeholder";
import { useQuery } from "react-query";
import {
  addToWatchlist,
  removeFromWatchlistAction,
} from "../../redux/action/watchlistAction";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../helper/helper";
import { createSelector } from "reselect";

const selectWatchlist = (state) => state.watchlist.watchlistItems;

export const selectWatchlistItems = createSelector(
  [selectWatchlist],
  (watchlistItems) => watchlistItems[0]?.watchlist || []
);

function HomePage() {
  const dispatch = useDispatch();

  // Fetch products using react-query
  const {
    isLoading,
    error,
    data: response,
  } = useQuery("products", fetchProducts);


  // Fetch watchlist items from redux state
  const watchlistItems = useSelector(
    (state) => state.watchlist.watchlistItems[0]?.watchlist || []
  );

  // Function to handle adding/removing from watchlist
  const handleToggleWatchlist = useCallback(
    (product) => {
      const isItemInWatchlist = watchlistItems.some(
        (item) => item._id === product._id
      );

      if (isItemInWatchlist) {
        dispatch(removeFromWatchlistAction(product._id));
      } else {
        dispatch(addToWatchlist({ ...product, quantity: 1 }));
      }
    },
    [dispatch, watchlistItems]
  );

  // Memoized placeholders
  const placeholders = useMemo(
    () =>
      Array.from({ length: 6 }).map((_, index) => (
        <ProductPlaceholder key={index} />
      )),
    []
  );

  // Ensure products are available and handle errors
  const products = useMemo(() => response?.data || [], [response]);

  if (error) return <div>Error: {error.message}</div>;

  const ProductGrid = ({ start, end, title }) => (
    <div className="page-top-tdhead">
      <label htmlFor="" className="tdhead-label">
        {title}
      </label>
      <div className="product-grids">
        {products.slice(start, end).map((product) => (
          <div className="product" key={product._id}>
            <span className="product-wishlist-add">
              <Heart
                fill={
                  watchlistItems.some((item) => item._id === product._id)
                    ? "red"
                    : "#666"
                }
                stroke={
                  watchlistItems.some((item) => item._id === product._id)
                    ? "red"
                    : "#666"
                }
                className="pd-wishlist-addicon"
                onClick={() => handleToggleWatchlist(product)}
              />
            </span>
            <Link to={`/item/${product._id}`}>
              <img
                src={product.thumbnail}
                alt={product.title}
                className="product-image"
              />
            </Link>
            <div className="product-info">
              <h3 className="product-title">{product.title}</h3>
              <p className="product-price">Rs {product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="home-page-wrapper">
      <div className="home-page-container">
        <div className="page-top-cat">
          {isLoading ? (
            <div className="product-grids">{placeholders}</div>
          ) : (
            <>
              <ProductGrid start={10} end={20} title="Explore Our Products" />
              <ProductGrid
                start={23}
                end={33}
                title="Top Eye Glasses Product"
              />
              <ProductGrid start={17} end={27} title="Top Shoes Product" />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
