import React, { useEffect, useState, useCallback, useMemo } from "react";
import "./itemdetails.css";
import { GanttChart, Star, Heart, Forward } from "lucide-react";
import ItemDescriptionCard from "./ItemDescriptionCard";
import RatingReview from "../ratings&reviews/RatingReview";
import RecommandProduct from "./RecommandProduct";
import { useNavigate, useParams } from "react-router-dom";
import SizeChart from "../sizechart/SizeChart";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/action/cartAction";
import {
  addToWatchlist,
  removeFromWatchlistAction,
} from "../../redux/action/watchlistAction";
import { fetchProductsById } from "../../helper/helper";
import { useQuery } from "react-query";

function ItemDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [buttonText, setButtonText] = useState("Add to Cart");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [isSharePopupVisible, setIsSharePopupVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Define color and size options
  const colorOptions = ["aquamarine", "green", "chocolate", "crimson"];
  const sizeOptions = ["S", "M", "L", "XL", "XXL"];

  // Fetch product data
  const {
    isLoading,
    error,
    data: response,
  } = useQuery(["product", id], () => fetchProductsById(id), {
    staleTime: 60000, // Cache the data for 1 minute
    cacheTime: 300000, // Keep cached data for 5 minutes
    refetchOnWindowFocus: false, // Prevent refetching when the window gains focus
  });

  const product = response?.data || {};

  const watchlistItems = useSelector((state) => state.watchlist.watchlistItems);
  const isItemInWatchlist = useMemo(
    () => watchlistItems.some((item) => item.id === product?.id),
    [watchlistItems, product?.id]
  );

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

  const handleToggleWatchlist = useCallback(() => {
    if (isItemInWatchlist) {
      dispatch(removeFromWatchlistAction(product.id));
    } else {
      dispatch(addToWatchlist({ ...product, quantity: 1 }));
    }
  }, [isItemInWatchlist, dispatch, product]);

  const handleAddToCart = useCallback(() => {
    if (buttonText === "Add to Cart") {
      dispatch(
        addToCart({
          ...product,
          quantity,
          color: selectedColor,
          size: selectedSize,
        })
      );
      setButtonText("Move to Cart");
    } else {
      navigate("/cart");
    }
  }, [
    buttonText,
    dispatch,
    product,
    quantity,
    selectedColor,
    selectedSize,
    navigate,
  ]);

  const handleBuyNow = useCallback(() => {
    dispatch(addToCart({ ...product, quantity: 1 }));
    navigate("/cart");
  }, [dispatch, product, navigate]);

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
                  className={`item-watchlist-btn-${
                    isItemInWatchlist ? "active" : ""
                  }`}
                  onClick={handleToggleWatchlist}
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
            <h2 className="item-desc-pricing">Rs. {product.price}</h2>
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
