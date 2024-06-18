import React, { useEffect, useState } from 'react'
import './itemdetails.css';
import { GanttChart, Star, Heart, Forward } from 'lucide-react';
import ItemDescriptionCard from './ItemDescriptionCard';
import RatingReview from '../ratings&reviews/RatingReview';
import RecommandProduct from './RecommandProduct';
import { useNavigate, useParams } from 'react-router-dom';
import SizeChart from '../sizechart/SizeChart';
import useFetchProducts from '../../hooks/useFetechProducts';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/action/cartAction';
import { addToWatchlist, removeFromWatchlist } from '../../redux/action/watchlistAction';
import TopItems from './TopItems';
import { getProductsById } from '../../../../server/controllers/appController';


function ItemDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [buttonText, setButtonText] = useState("Add to Cart");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [product, setProduct] = useState(null); // State to hold the product details
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // console.log("id", id);
  // Define color and size options
  const colorOptions = ["aquamarine", "green", "chocolate", "crimson"];
  const sizeOptions = ["S", "M", "L", "XL", "XXL"];

  const handleColorSelect = (color) => {
    console.log(color);
    setSelectedColor(color);
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };


  const [isSharePopupVisible, setIsSharePopupVisible] = useState(false);
  //  const { products, error, loading } = useFetchProducts();
  //  const product = products.find((p) => `${p.id}` === id);

   const [selectedImage, setSelectedImage] = useState("");
   const [isOpen, setIsOpen] = useState(false);

   const openPopup = () => setIsOpen(true);
   const closePopup = () => setIsOpen(false);

   const handleShareClick = () => {
     setIsSharePopupVisible(!isSharePopupVisible);
   };

   const handleIncreaseQuantity = () => {
     setQuantity((prevQuantity) => prevQuantity + 1);
   };

   const handleDecreaseQuantity = () => {
     setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
   };

   const shareLink = window.location.href;

   const copyToClipboard = () => {
     navigator.clipboard.writeText(shareLink).then(() => {
      //  alert("Link copied to clipboard!");
       setIsSharePopupVisible(false); // Optionally close the popup after copying
     });
   };


   const watchlistItems = useSelector(
     (state) => state.watchlist.watchlistItems
   );
   const isItemInWatchlist = watchlistItems.some(
     (item) => item.id === product?.id
   );

   const handleToggleWatchlist = () => {
     if (isItemInWatchlist) {
       dispatch(removeFromWatchlist(product.id));
     } else {
       dispatch(addToWatchlist({ ...product, quantity: 1 })); // Assuming a quantity field is needed; adjust as necessary
     }
   };

   const handleAddToCart = () => {
     if (buttonText === "Add to Cart") {
       dispatch(addToCart({ ...product, quantity: quantity, color:selectedColor, size:selectedSize }));
       setButtonText("Move to Cart"); // Update the button text
      //  navigate("/cart"); // Navigate to the cart page
     }
     else {
      navigate("/cart");
     }
   };

   const handleBuyNow = () => {
     dispatch(addToCart({ ...product, quantity: 1 })); // Add the product with quantity 1
     navigate("/cart"); // Navigate to the cart page
   };


   useEffect(() => {
    const fetchProductDetails = async () => {
      try{
        const response = await getProductsById(id);
      setProduct(response);
      setLoading(false);
    } catch (error){
      setError(error.message);
      setLoading(false);
    }
  };
    
     if (product && product.images.length > 0) {
       setSelectedColor(product.color || colorOptions[0]); // Set default color if not selected
       setSelectedSize(product.size || sizeOptions[1]); // Set default size if not selected
       setSelectedImage(product.images[0]);
     }
   }, [product]);

   const handleImageClick = (img) => setSelectedImage(img);

   if (loading) return <div>Loading...</div>;
   if (error) return <div>Error: {error}</div>;
   if (!product) return <div>Product not found</div>;

  return (
    <div className="item-description-wrapper">
      <div className="item-description-container">
        <div className="item-route">
          {/* name category and route */}
          <em>HomePage &gt;{product.category}</em>
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
                    <input type="text" value={shareLink} readOnly />
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
              <Star size={16} fill="rgb(4, 148, 4)" color="rgb(4, 148, 4)" />
              <Star size={16} fill="rgb(4, 148, 4)" color="rgb(4, 148, 4)" />
              <Star size={16} fill="rgb(4, 148, 4)" color="rgb(4, 148, 4)" />
              <Star size={16} fill="rgb(4, 148, 4)" color="rgb(4, 148, 4)" />
              <Star size={16} fill="rgb(4, 148, 4)" color="rgb(4, 148, 4)" />
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
                <button onClick={handleDecreaseQuantity}>
                  -
                </button>
                <span>{quantity}</span>
                <button onClick={handleIncreaseQuantity}>
                  +
                </button>
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
        <TopItems item={products} />
      </div>
    </div>
  );
}

export default ItemDetails;