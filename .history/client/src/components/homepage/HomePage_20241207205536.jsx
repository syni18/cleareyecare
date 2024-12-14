import React, { useCallback, useMemo, useEffect, useState } from "react";
import "./homepage.css";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import ProductPlaceholder from "../placeholder/Placeholder";
import { useQuery } from "react-query";
import { fetchProducts } from "../../helper/helper";
import useWatchlistStore from "../../redux/store/watchlistStore";

// Memoize ProductGrid to prevent unnecessary re-renders
const ProductGrid = React.memo(
  ({
    products,
    isLoading,
    placeholders,
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
          : (Array.isArray(products) ? products : []).map((product) => (
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
  } = useWatchlistStore((state) => ({
    watchlistItems: state.watchlistItems,
    addToWatchlist: state.addToWatchlist,
    removeFromWatchlist: state.removeFromWatchlist,
    fetchWatchlist: state.fetchWatchlist,
  }));

  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(15); // Number of products to fetch
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true); // To track if more products are available

  const fetchMoreProducts = async () => {
    if (!hasMore) return; // If no more products, exit

    setIsLoading(true);
    const newProducts = await fetchProducts(offset, limit); // Adjust your fetchProducts to accept offset and limit
    setProducts((prev) => [...prev, ...newProducts]);
    setOffset((prev) => prev + limit);
    setIsLoading(false);
    if (newProducts.length < limit) {
      setHasMore(false); // No more products to load
    }
  };

  useEffect(() => {
    fetchMoreProducts();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 5 >=
        document.documentElement.offsetHeight
      ) {
        fetchMoreProducts();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasMore]);

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
      Array.from({ length: limit }).map((_, index) => (
        <ProductPlaceholder key={index} />
      )),
    [limit]
  );

  return (
    <div className="home-page-wrapper">
      <div className="home-page-container">
        <div className="page-top-cat">
          <ProductGrid
            products={products}
            isLoading={isLoading}
            placeholders={placeholders}
            title="Explore Our Products"
            watchlistItems={watchlistItems}
            handleToggleWatchlist={handleToggleWatchlist}
          />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
