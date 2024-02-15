import React, { useEffect, useState } from 'react'
import './itemdetails.css';
import { GanttChart, Star, Heart, Forward } from 'lucide-react';
import ItemDescriptionCard from './ItemDescriptionCard';
import RatingReview from '../ratings&reviews/RatingReview';
import RecommandProduct from './RecommandProduct';
import { Link, useParams } from 'react-router-dom';
import SizeChart from '../sizechart/SizeChart';

const API_PRODUCT = "https://dummyjson.com/products";

function ItemDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => {
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  const fetchProduct = async (url) => {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Failed to fetch data. Status: ${res.status}`);
      }
      const data = await res.json();

      // Find the product with the matching id
      const selectedProduct = data.products.find((p) => p.id === parseInt(id));

      if (selectedProduct) {
        setProduct(selectedProduct);
          // Set the first image as the default selected image
        setSelectedImage(selectedProduct.images[0]);
      } else {
        console.log(`Product with id ${id} not found`);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  useEffect(() => {
    fetchProduct(API_PRODUCT);
    useEffect(() => {
    if (isOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isOpen]);
  }, [id]);


  const handleImageClick = (img) => {
    // Update the selected image when a small image is clicked
    setSelectedImage(img);
  };
  if (!product) {
    // Render loading state or handle the case where the product is not found
    return <p>Loading...</p>;
  }
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
                <Heart className="item-watchlist-btn" />
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
            <h2 className="item-desc-pricing">{product.price}</h2>
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
              {isOpen && <>
              <div className="blur-overlay"></div>
                <SizeChart onClose={closePopup} />
              </>
                }
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
                <button type="button" className="item-move-cart">
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