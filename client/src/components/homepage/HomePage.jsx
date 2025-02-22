import React, { useCallback, useEffect, useMemo, useRef } from "react";
import "./homepage.css";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import ProductPlaceholder from "../placeholder/Placeholder";
import { useQuery } from "react-query";
import { fetchProducts, addToWishlists, removeFromWishlists, getWishlists } from "../../helper/helper";
import useWishlistStore from "../../redux/store/watchlistStore";

const ProductGrid = React.memo(
  ({
    products,
    isLoading,
    placeholders,
    start,
    end,
    title,
    wishlists,
    handleToggleWishlist,
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
                      wishlists.some((item) => item === product._id)
                        ? "red"
                        : "#666"
                    }
                    stroke={
                      wishlists.some((item) => item === product._id)
                        ? "red"
                        : "#666"
                    }
                    className="pd-wishlist-addicon"
                    onClick={() => handleToggleWishlist(product)}
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
    const hasFetched = useRef(false); // Track if fetch has already happened
  
  const { wishlists, setWishlists, addItemWishlists, removeItemWishlists } =
    useWishlistStore();

  useEffect(() => {
   const fetchWishlists = async () => {
     try {
       const response = await getWishlists("homepage");
       setWishlists(response.wishlist);
     } catch (error) {
       console.error("Error fetching wishlists: ", error);
     }
   };

   if (!hasFetched.current) {
     hasFetched.current = true; // Mark as fetched
       fetchWishlists(); // Delay the call by 3 seconds
   }
     }, [setWishlists]);
  const {
    isLoading: isFetchingProducts,
    error: queryError,
    data: products,
  } = useQuery("products", fetchProducts, {
    staleTime: 5 * 60 * 1000, // Data will be considered fresh for 5 minutes
    cacheTime: 10 * 60 * 1000, // Data will be cached for 10 minutes
    refetchOnWindowFocus: false, // Avoid refetching on window focus
  });

  const handleToggleWishlist = useCallback(
    (product) => {
      if (!product || !product._id) return;
      const isItemInWishlist = wishlists.some(
        (item) => item === product._id
      );
      if (isItemInWishlist) {
        const removeResponse = removeFromWishlists(product._id);
        removeItemWishlists(product._id);
      } else {
        const addResponse = addToWishlists(product._id);
        addItemWishlists(product._id);
      }
    },
    [wishlists, addItemWishlists, removeItemWishlists]
  );

  const placeholders = useMemo(
    () =>
      Array.from({ length: 10 }).map((_, index) => (
        <ProductPlaceholder key={index} />
      )),
    []
  );

  if (queryError) return <div>Error: {queryError.message}</div>;

  const isLoading = isFetchingProducts;

  const productGridProps = useMemo(
    () => ({
      products: products || [],
      isLoading,
      placeholders,
      wishlists,
      handleToggleWishlist,
    }),
    [products, isLoading, placeholders, wishlists, handleToggleWishlist]
  );

  return (
    <div className="home-page-wrapper">
      <div className="home-page-container">
        <div className="page-top-cat">
          <ProductGrid
            start={0}
            end={15}
            title="Explore Our Products"
            {...productGridProps}
          />
          <ProductGrid
            start={16}
            end={31}
            title="Top Eye Glasses Product"
            {...productGridProps}
          />
          <ProductGrid
            start={32}
            end={47}
            title="Top Shoes Product"
            {...productGridProps}
          />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
