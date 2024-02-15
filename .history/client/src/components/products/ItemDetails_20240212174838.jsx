import React, { useState } from "react";
import "./itemdetails.css";
import { GanttChart, Star, Heart, Forward } from "lucide-react";
import ItemDescriptionCard from "./ItemDescriptionCard";
import RatingReview from "../ratings&reviews/RatingReview";
import RecommandProduct from "./RecommandProduct";
import { useParams } from "react-router-dom";
import SizeChart from "../sizechart/SizeChart";
import useFetchProducts from "../hooks/useFetchProducts"; // Make sure the path is correct

function ItemDetails() {
  const { id } = useParams();
  const { products, error, loading } = useFetchProducts();
  const product = products.find((p) => `${p.id}` === id);

  const [selectedImage, setSelectedImage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);

  useEffect(() => {
    if (product && product.images.length > 0) {
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
          <em>HomePage &gt; {product.category}</em>
        </div>
        <div className="item-images-desc">
          <div className="item-images">
            <div className="item-images-etc">
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Product image ${index + 1}`}
                  className="images-etc-small"
                  onClick={() => handleImageClick(img)}
                />
              ))}
            </div>
            <img
              src={selectedImage}
              alt="Selected product"
              className="images-target"
            />
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
            {/* Simplified rating display assuming static for example */}
            <p className="item-desc-rating">
              <Star size={16} fill="rgb(4, 148, 4)" color="rgb(4, 148, 4)" /> 6
              Reviews
            </p>
            <h2 className="item-desc-pricing">Rs. {product.price}</h2>
            {/* Additional product details as in your original code */}
            <div className="item-size-variety">
              <h4>Size</h4>
              {/* Sizes and Color Varieties */}
              <small onClick={openPopup}>
                <GanttChart size={18} /> size chart
              </small>
              {isOpen && (
                <>
                  <div className="blur-overlay"></div>
                  <SizeChart onClose={closePopup} />
                </>
              )}
            </div>
            {/* Quantity and Cart options */}
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
