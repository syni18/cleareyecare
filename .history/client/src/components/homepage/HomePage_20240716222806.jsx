import React, { useCallback, useMemo, useEffect } from "react";
import "./homepage.css";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import ProductPlaceholder from "../placeholder/Placeholder";
import { useQuery } from "react-query";
import { fetchProducts } from "../../helper/helper";
import useWatchlistStore from "../../redux/store/watchlistStore";

const ProductGrid = React.memo(
  ({
    products,
    isLoading,
    placeholders,
    start,
    end,
    title,
    watchlistItems,
    handleToggleWatchlist,
  }) => (
    <div className="page-top-tdhead">
      <label htmlFor="" className="tdhead-label">
        {title}
      </label>
      <div className="product-grids">
        {isLoading
          ? placeholders
          : products.slice(start, end).map((product) => (
              <div className="product" key={product._id}>
                <span className="product-wishlist-add">
                  <Heart
                    fill={
                      watchlistItems.some(
                        (item) => item.productId === product._id
                      )
                        ? "red"
                        : "#666"
                    }
                    stroke={
                      watchlistItems.some(
                        (item) => item.productId === product._id
                      )
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
  )
);

function HomePage() {
  const {
    watchlistItems,
    addToWatchlist,
    removeFromWatchlist,
    fetchWatchlist,
  } = useWatchlistStore(
    (state) => ({
      watchlistItems: state.watchlistItems,
      addToWatchlist: state.addToWatchlist,
      removeFromWatchlist: state.removeFromWatchlist,
      fetchWatchlist: state.fetchWatchlist,
    }),
    (prev, next) => prev.watchlistItems === next.watchlistItems
  );

  const {
    isLoading,
    error: queryError,
    data: products,
  } = useQuery("products", fetchProducts, {
    staleTime: 5 * 60 * 1000, // Data will be considered fresh for 5 minutes
    cacheTime: 10 * 60 * 1000, // Data will be cached for 10 minutes
  });

  useEffect(() => {
    fetchWatchlist();
  }, [fetchWatchlist]);

  const handleToggleWatchlist = useCallback(
    (product) => {
      if (!product || !product._id) return;
      const isItemInWatchlist = watchlistItems.some(
        (item) => item.productId === product._id
      );
      if (isItemInWatchlist) {
        console.log(`Removing product ${product._id} from watchlist`);
        removeFromWatchlist(product._id);
      } else {
        console.log(`Adding product ${product._id} to watchlist`);
        addToWatchlist(product._id);
      }
    },
    [watchlistItems, addToWatchlist, removeFromWatchlist]
  );

  const placeholders = useMemo(
    () =>
      Array.from({ length: 10 }).map((_, index) => (
        <ProductPlaceholder key={index} />
      )),
    []
  );

  if (queryError) return <div>Error: {queryError.message}</div>;

  return (
    <div className="home-page-wrapper">
      <div className="home-page-container">
        <div className="page-top-cat">
          <ProductGrid
            start={0}
            end={10}
            title="Explore Our Products"
            products={products || []}
            isLoading={isLoading}
            placeholders={placeholders}
            watchlistItems={watchlistItems}
            handleToggleWatchlist={handleToggleWatchlist}
          />
          <ProductGrid
            start={23}
            end={33}
            title="Top Eye Glasses Product"
            products={products || []}
            isLoading={isLoading}
            placeholders={placeholders}
            watchlistItems={watchlistItems}
            handleToggleWatchlist={handleToggleWatchlist}
          />
          <ProductGrid
            start={17}
            end={27}
            title="Top Shoes Product"
            products={products || []}
            isLoading={isLoading}
            placeholders={placeholders}
            watchlistItems={watchlistItems}
            handleToggleWatchlist={handleToggleWatchlist}
          />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
