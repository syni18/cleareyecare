import React, { useCallback, useMemo, useEffect } from "react";
import "./homepage.css";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import ProductPlaceholder from "../placeholder/Placeholder";
import { useQuery } from "react-query";
import { fetchProducts } from "../../helper/helper";
import useWatchlistStore from "../../stores/watchlistStore";

function HomePage() {
  const {
    watchlistItems,
    loading,
    error,
    addToWatchlist,
    removeFromWatchlist,
    fetchWatchlist,
  } = useWatchlistStor();

  // Fetch products using react-query
  const {
    isLoading,
    error: queryError,
    data: response,
  } = useQuery("products", fetchProducts);

  // Fetch watchlist items when component mounts
  useEffect(() => {
    fetchWatchlist();
  }, [fetchWatchlist]);

  // Function to handle adding/removing from watchlist
  const handleToggleWatchlist = useCallback(
    (product) => {
      if (!product || !product._id) return;
      const isItemInWatchlist = watchlistItems.some(
        (item) => item._id === product._id
      );

      if (isItemInWatchlist) {
        removeFromWatchlist(product._id);
      } else {
        addToWatchlist(product._id);
      }
    },
    [watchlistItems, addToWatchlist, removeFromWatchlist]
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

  if (queryError) return <div>Error: {queryError.message}</div>;

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
