import React, { useState } from "react";
import Img3 from "../../assets/img3.png";
import "./rateproductform.css";
import { ImagePlus, MessageCircleX } from "lucide-react";
import StarRating from "../stars/StarRating";

function RateProductForm() {
  const [imagePreviews, setImagePreviews] = useState([]);
  const [hoveredImage, setHoveredImage] = useState(null);
  const [rating, setRating] = useState(0);
  const [ratingText, setRatingText] = useState("");
  const [ratingColor, setRatingColor] = useState("");
  const handleImageChange = (event) => {
    const selectedImages = event.target.files;
    if (selectedImages) {
      const previews = Array.from(selectedImages).map((image) =>
        URL.createObjectURL(image)
      );
      setImagePreviews((prevPreviews) => [...prevPreviews, ...previews]);
    }
  };
  const handleDeleteImage = (index) => {
    const updatedPreviews = [...imagePreviews];
    updatedPreviews.splice(index, 1);
    setImagePreviews(updatedPreviews);
  };

  const handleRatingChange = (value) => {
    setRating(value);
    // Set the rating text based on the selected value
    switch (value) {
      case 5:
        setRatingText("Excellent");
        setRatingColor("green");
        break;
      case 4:
        setRatingText("Good");
        setRatingColor("Black");
        break;
      case 3:
        setRatingText("Neutral");
        setRatingColor("black");
        break;
      case 2:
        setRatingText("Fair");
        setRatingColor("Black");
        break;
      case 1:
        setRatingText("Poor");
        setRatingColor("red");
        break;
      default:
        setRatingText("");
        setRatingColor("");
    }
  };
  return (
    <div className="rate-prod-form-wrapper">
      <div className="rate-prod-form-container">
        <div className="rate-form-head">
          <div className="rate-form-head-left">
            <label htmlFor="">Rating & Review</label>
            <small>Your Review Matters the most</small>
          </div>
          <div className="rate-form-head-right">
            <h5>Fastrack Revoltt X|1.83'' HD </h5>
            <img src={Img3} alt="" />
          </div>
        </div>
        <div className="rate-form-card">
          <form action="" className="rate-prod-form">
            <div className="prod-form-star">
              <label htmlFor="">Rate this product</label>
              <StarRating initialValue={rating} onChange={handleRatingChange} />
              {ratingText && (
                <p style={{ color: ratingColor, fontWeight: 600 }}>
                  {ratingText}
                </p>
              )}
            </div>
            <div className="prod-form-review">
              <label htmlFor="text-desc">Review this product</label>
              <textarea
                name="Description"
                id="text-desc"
                cols="30"
                rows="8"
                placeholder="Description"
              ></textarea>
            </div>
            <div className="prod-form-title">
              <label htmlFor="">Title</label>
              <input
                type="text"
                name="form-title"
                id="form-title"
                placeholder="Review title (Optional) "
              />
            </div>

            <div className="image-preview-container">
              <div className="rate-prod-user-image">
                <input
                  type="file"
                  name="user-image"
                  id="choose-image"
                  onChange={handleImageChange}
                  multiple
                />
                <label htmlFor="choose-image">
                  <ImagePlus />
                </label>
              </div>
              {imagePreviews.map((preview, index) => (
                <div
                  key={index}
                  className="image-preview-wrapper"
                  onMouseEnter={() => setHoveredImage(index)}
                  onMouseLeave={() => setHoveredImage(null)}
                >
                  <img
                    src={preview}
                    alt={`Image Preview ${index + 1}`}
                    className="image-preview"
                  />
                  {hoveredImage === index && (
                    <div
                      className="delete-icon"
                      onClick={() => handleDeleteImage(index)}
                    >
                      <MessageCircleX size={18} fill="red" />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <button type="button" className="rate-submit-btn">
              Submit Review
            </button>
          </form>
          <div className="rate-form-faq">
            <label htmlFor="">Can you tell us this?</label>
            <div className="rate-faq-container">
              <div className="rate-faq-1">
                <span className="faq-1-ques">Have you used this product?</span>
                <span>
                  Your review should be about your experience with the product.
                </span>
              </div>
              <div className="rate-faq-1">
                <span className="faq-1-ques">Why review a product?</span>
                <span>
                  Your valuable feedback will help fellow shoppers decide!
                </span>
              </div>
              <div className="rate-faq-1">
                <span className="faq-1-ques">How to review a product?</span>
                <span>
                  "Your review should include facts. An honest opinion is always
                  appreciated. If you have an issue with the product or service
                  please contact us from the
                  <a href=""> help center.</a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RateProductForm;
