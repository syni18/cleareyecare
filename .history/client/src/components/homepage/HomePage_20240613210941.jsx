import React, { useEffect } from "react";
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

function HomePage() {
  const dispatch = useDispatch();

  // Fetch products using react-query
  const {
    isLoading,
    error,
    data: response,
  } = useQuery("products", fetchProducts);

  // Fetch watchlist items from redux state
  const watchlistItems = useSelector((state) => state.watchlist.watchlistItems);

  // Function to handle adding/removing from watchlist
  const handleToggleWatchlist = (product) => {
    const isItemInWatchlist = watchlistItems.some(
      (item) => item._id === product._id
    );

    if (isItemInWatchlist) {
      dispatch(removeFromWatchlistAction(product._id));
    } else {
      dispatch(addToWatchlist({ ...product, quantity: 1 }));
    }
  };

  // Display placeholders while loading
  const placeholders = Array.from({ length: 6 }).map((_, index) => (
    <ProductPlaceholder key={index} />
  ));

  // Render products or placeholders based on loading state
  const renderProducts = (start, end) => {
    return (
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
                className="pd-wishlist-addicon"
                onClick={() => handleToggleWatchlist(product)}
              />
              <Heart
                fill={
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
    );
  };

  // Ensure products are available and handle errors
  const products = response?.data || [];

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="home-page-wrapper">
      <div className="home-page-container">
        <div className="page-top-cat">
          {isLoading ? (
            <div className="product-grids">{placeholders}</div>
          ) : (
            <>
              <div className="page-top-tdhead">
                <label htmlFor="" className="tdhead-label">
                  Explore Our Products
                </label>
                {renderProducts(10, 20)}
              </div>
              <div className="page-top-tdhead">
                <label htmlFor="" className="tdhead-label">
                  Top Eye Glasses Product
                </label>
                {renderProducts(23, 33)}
              </div>
              <div className="page-top-tdhead">
                <label htmlFor="" className="tdhead-label">
                  Top Shoes Product
                </label>
                {renderProducts(17, 27)}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
