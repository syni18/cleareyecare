import React, { useEffect, useState } from 'react'
import './itemdetails.css';
import { GanttChart, Star, Heart, Forward } from 'lucide-react';
import ItemDescriptionCard from './ItemDescriptionCard';
import RatingReview from '../ratings&reviews/RatingReview';
import RecommandProduct from './RecommandProduct';
import { useParams } from 'react-router-dom';
import SizeChart from '../sizechart/SizeChart';
import useFetchProducts from '../../hooks/useFetechProducts';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/action/cartAction';
import { addToWatchlist, removeFromWatchlist } from '../../redux/action/watchlistAction';


function ItemDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
   const { products, error, loading } = useFetchProducts();
   const product = products.find((p) => `${p.id}` === id);

   const [selectedImage, setSelectedImage] = useState("");
   const [isOpen, setIsOpen] = useState(false);

   const openPopup = () => setIsOpen(true);
   const closePopup = () => setIsOpen(false);

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
    dispatch(addToCart({...product, quantity: 1}));
   }
   useEffect(() => {
     if (product && product.images.length > 0) {
       setSelectedImage(product.images[0]);
     }
   }, [product]);

   const handleImageClick = (img) => setSelectedImage(img);

  //  if (loading) return <div>Loading...</div>;
  //  if (error) return <div>Error: {error}</div>;
  //  if (!product) return <div>Product not found</div>;

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
                <Forward className="item-share-btn" />
                <Heart
                  className={`item-watchlist-btn-${isItemInWatchlist ? "active" : ""}`}
                  onClick={handleToggleWatchlist}
                />
              </span>
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
                <li id="clp1" className="color-palette"></li>
                <li id="clp2" className="color-palette"></li>
                <li id="clp3" className="color-palette"></li>
                <li id="clp4" className="color-palette"></li>
              </ul>
            </div>
            <div className="item-size-variety">
              <h4>Size</h4>
              <ul className="size-variety-list">
                <li id="clp1" className="size-palette">
                  S
                </li>
                <li id="clp2" className="size-palette">
                  M
                </li>
                <li id="clp3" className="size-palette">
                  L
                </li>
                <li id="clp4" className="size-palette">
                  XL
                </li>
                <li id="clp4" className="size-palette">
                  XXL
                </li>
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
              <div className="item-quantity">
                <div className="quantity-decrease-btn">-</div>
                <input
                  type="number"
                  name="quantity"
                  className="quantity-field"
                  defaultValue={1}
                />
                <div className="quantity-increase-btn">+</div>
              </div>
              <div className="item-pick-btn">
                <button type="button" className="item-instant-buy">
                  Buy Now
                </button>
                <button
                  type="button"
                  className="item-move-cart"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>
              </div>
            </div>
            <ItemDescriptionCard product={product} />
            <RatingReview product={product} />
          </div>
        </div>
        <RecommandProduct product={product} />
      </div>
    </div>
  );
}

export default ItemDetails;