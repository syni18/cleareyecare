import React, { useCallback, useMemo, useEffect, useState } from "react";
import "./homepage.css";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import ProductPlaceholder from "../placeholder/Placeholder";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../helper/helper";
import { createSelector } from "reselect";
import {
  addToWatchlist,
  removeFromWatchlist,
  fetchWatchlist,
} from "../../redux/reducer/watchlistReducer";

// Selector for watchlist items
const selectWatchlist = (state) => state.watchlist.watchlistItems;

export const selectWatchlistItems = createSelector(
  [selectWatchlist],
  (watchlistItems) => watchlistItems.filter((item) => item != null)
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
  const watchlistItems = useSelector(selectWatchlistItems);
  const [localWatchlist, setLocalWatchlist] = useState([]);

  useEffect(() => {
    dispatch(fetchWatchlist());
  }, [dispatch]);

  useEffect(() => {
    setLocalWatchlist(watchlistItems.map((item) => item.data._id));
  }, [watchlistItems]);

  const handleToggleWatchlist = useCallback(
    (product) => {
      if (!product || !product._id) return;

      const isItemInWatchlist = localWatchlist.includes(product._id);

      if (isItemInWatchlist) {
        setLocalWatchlist((prevState) =>
          prevState.filter((id) => id !== product._id)
        );
        dispatch(removeFromWatchlist(product._id));
      } else {
        setLocalWatchlist((prevState) => [...prevState, product._id]);
        dispatch(addToWatchlist(product._id));
      }
    },
    [dispatch, localWatchlist]
  );

  const placeholders = useMemo(
    () =>
      Array.from({ length: 6 }).map((_, index) => (
        <ProductPlaceholder key={index} />
      )),
    []
  );

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
                fill={localWatchlist.includes(product._id) ? "red" : "#666"}
                stroke={localWatchlist.includes(product._id) ? "red" : "#666"}
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
