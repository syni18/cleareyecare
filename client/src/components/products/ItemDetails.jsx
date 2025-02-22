import React, { useEffect, useState, useCallback, useMemo } from "react";
import "./itemdetails.css";
import { GanttChart, Star, Heart, Forward } from "lucide-react";
import ItemDescriptionCard from "./ItemDescriptionCard";
import RatingReview from "../ratings&reviews/RatingReview";
import RecommandProduct from "./RecommandProduct";
import { useNavigate, useParams } from "react-router-dom";
import SizeChart from "../sizechart/SizeChart";
import { fetchProductsById } from "../../helper/helper";
import { useQuery } from "react-query";
import useWatchlistStore, {
  useWishlistStore,
} from "../../redux/store/watchlistStore";
import useCartStore from "../../redux/store/cartStore";

function ItemDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [buttonText, setButtonText] = useState("Add to Cart");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [isSharePopupVisible, setIsSharePopupVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { wishlists, addItemWishlists, removeItemWishlists } = useWishlistStore();
  const { cartItems, addToCart } = useCartStore();

  // Define color and size options
  const colorOptions = ["aquamarine", "green", "chocolate", "crimson"];
  const sizeOptions = ["S", "M", "L", "XL", "XXL"];

  const {
    isLoading,
    error,
    data: response,
  } = useQuery(["product", id], () => fetchProductsById(id), {
    staleTime: 60000,
    cacheTime: 300000,
    refetchOnWindowFocus: false,
  });

  

  const product = response?.item || {};

  const handleColorSelect = useCallback((color) => setSelectedColor(color), []);
  const handleSizeSelect = useCallback((size) => setSelectedSize(size), []);

  const handleIncreaseQuantity = useCallback(
    () => setQuantity((prevQuantity) => prevQuantity + 1),
    []
  );
  const handleDecreaseQuantity = useCallback(
    () =>
      setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1)),
    []
  );
  const handleShareClick = useCallback(
    () => setIsSharePopupVisible((prev) => !prev),
    []
  );
  const handleImageClick = useCallback((img) => setSelectedImage(img), []);
  const openPopup = useCallback(() => setIsOpen(true), []);
  const closePopup = useCallback(() => setIsOpen(false), []);

  const handleToggleWatchlist = useCallback(
    (product) => {
      if (!product || !product._id) return;
      const isItemInWatchlist = wishlists.some(
        (item) => item.productId === product._id
      );
      if (isItemInWatchlist) {
        console.log(`Removing product ${product._id} from watchlist`);
        removeItemWishlists(product._id);
      } else {
        console.log(`Adding product ${product._id} to watchlist`);
        addItemWishlists(product._id);
      }
    },
    [wishlists, addItemWishlists, removeItemWishlists]
  );

  const handleAddToCart = useCallback(() => {
    if (buttonText === "Add to Cart") {
      addToCart({
        ...product,
        quantity,
        color: selectedColor,
        size: selectedSize,
      });
      setButtonText("Move to Cart");
    } else {
      navigate("/cart");
    }
  }, [
    buttonText,
    addToCart,
    product,
    quantity,
    selectedColor,
    selectedSize,
    navigate,
  ]);

  const handleBuyNow = useCallback(() => {
    addToCart({ ...product, quantity: 1 });
    navigate("/cart");
  }, [addToCart, product, navigate]);

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setIsSharePopupVisible(false);
    });
  }, []);

  useEffect(() => {
    if (product.images) {
      setSelectedColor(product.color || colorOptions[0]);
      setSelectedSize(product.size || sizeOptions[0]);
      setSelectedImage(product.images[0]);
    }
  }, [product]);

  // useEffect to check if cartItems is empty and update state accordingly
  useEffect(() => {
    if (cartItems.length === 0) {
      setButtonText("Add to Cart");
    }
  }, [cartItems]);

  if (isLoading) return null; // Return null to avoid showing loading
  if (error) return <div>Error: {error.message}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="item-description-wrapper">
      <div className="item-description-container">
        <div className="item-route">
          <em>HomePage &gt; {product.category}</em>
        </div>
        <div className="item-images-desc">
          <div className="item-images">
            <div className="item-images-etc">
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt=""
                  className="images-etc-small"
                  onClick={() => handleImageClick(img)}
                />
              ))}
            </div>
            <img src={selectedImage} alt="" className="images-target" />
          </div>

          <div className="item-desc">
            <div className="item-category-watchlist">
              <em>{product.category}</em>
              <span>
                <Forward
                  className="item-share-btn"
                  onClick={handleShareClick}
                />
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
                  onClick={() => handleToggleWatchlist(product)}
                />
              </span>
              {isSharePopupVisible && (
                <div className="share-popup">
                  <div className="share-popup-content">
                    <p>Share this product:</p>
                    <input type="text" value={window.location.href} readOnly />
                    <div className="share-popup-buttons">
                      <button onClick={() => setIsSharePopupVisible(false)}>
                        Cancel
                      </button>
                      <button onClick={copyToClipboard}>Copy</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <h1 className="item-desc-heading">{product.title}</h1>
            <p className="item-desc-rating">
              {Array(5)
                .fill()
                .map((_, index) => (
                  <Star
                    key={index}
                    size={16}
                    fill="rgb(4, 148, 4)"
                    color="rgb(4, 148, 4)"
                  />
                ))}
              <span className="item-rating-review">6 Reviews</span>
            </p>
            <h2 className="item-desc-pricing">
              Rs. <span>{product.price}</span>
            </h2>
            <div className="item-color-variety">
              <h4>Color</h4>
              <ul className="color-variety-list">
                {colorOptions.map((color, index) => (
                  <li
                    key={index}
                    className={`color-palette ${
                      selectedColor === color ? "selected" : ""
                    }`}
                    onClick={() => handleColorSelect(color)}
                    style={{ backgroundColor: color }}
                  ></li>
                ))}
              </ul>
            </div>
            <div className="item-size-variety">
              <h4>Size</h4>
              <ul className="size-variety-list">
                {sizeOptions.map((size, index) => (
                  <li
                    key={index}
                    className={`size-palette ${
                      selectedSize === size ? "selected" : ""
                    }`}
                    onClick={() => handleSizeSelect(size)}
                  >
                    {size}
                  </li>
                ))}
              </ul>
              <small onClick={openPopup}>
                <GanttChart size={18} />
                size chart
              </small>
              {isOpen && (
                <>
                  <div className="blur-overlay"></div>
                  <SizeChart onClose={closePopup} />
                </>
              )}
            </div>
            <div className="item-availability">
              <h4>Availability</h4>
              <span>In Stock</span>
            </div>
            <div className="item-quantity-pick">
              <div className="bagitem-quantity">
                <button onClick={handleDecreaseQuantity}>-</button>
                <span>{quantity}</span>
                <button onClick={handleIncreaseQuantity}>+</button>
              </div>
              <div className="item-pick-btn">
                <button
                  type="button"
                  className="item-instant-buy"
                  onClick={handleBuyNow}
                >
                  Buy Now
                </button>
                <button
                  type="button"
                  className="item-move-cart"
                  onClick={handleAddToCart}
                >
                  {buttonText}
                </button>
              </div>
            </div>
            <ItemDescriptionCard product={product} />
            <RatingReview product={product} />
          </div>
        </div>
        {/* <TopItems item={product} /> */}
      </div>
    </div>
  );
}

export default ItemDetails;
