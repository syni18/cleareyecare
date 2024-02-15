import React, { useState } from "react";
import "./productview.css";
import ReactSlider from "react-slider";
import { Grid2X2, Star, MoveRight } from "lucide-react";
import ProductCard from "./ProductCard";
import { useLocation } from "react-router-dom";

const MIN = 1;
const MAX = 12000;
function ProductView() {
  const location = useLocation();
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const categories = [
    "smartphones",
    "laptops",
    "fragrances",
    "skincare",
    "groceries",
    "home-decoration",
    "furniture",
    "tops",
    "womens-dresses",
    "mens-shirts",
    "mens-watches",
    "womens-watches",
    "womens-jewellery",
    "sunglasses",
    "automotive",
    "motorcycle",
    "lighting",
    "womens-bags",
  ]; // Example categories
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [selectedRating, setSelectedRating] = useState(0);
  const [productsPerPage] = useState(20);
  const [values, setValues] = useState([MIN, MAX]);
  const { products } = location.state || { products: [] };

  const sortProducts = (products) => {
    switch (sortOption) {
      case "Price-L/H":
        return [...products].sort((a, b) => a.price - b.price);
      case "Price-H/L":
        return [...products].sort((a, b) => b.price - a.price);
      case "Newest-First":
        return [...products].sort(
          (a, b) => new Date(b.added) - new Date(a.added)
        );
      case "Discount":
        return [...products].sort(
          (a, b) => b.discountPercentage - a.discountPercentage
        );
      default:
        return products; // Default case returns unsorted products
    }
  };

  const filteredProducts = products.filter((product) => {
    const isCategoryMatch =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);
    const isPriceMatch =
      product.price >= values[0] && product.price <= values[1];
    const isRatingMatch = product.rating >= selectedRating;
    return isCategoryMatch && isPriceMatch && isRatingMatch;
  });

  // Sort filtered products
  const sortedProducts = sortProducts(filteredProducts);

  // Paginate sorted and filtered products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleCategoryChange = (event) => {
    const { value, checked } = event.target;
    if (checked && !selectedCategories.includes(value)) {
      setSelectedCategories([...selectedCategories, value]);
    } else {
      setSelectedCategories(
        selectedCategories.filter((category) => category !== value)
      );
    }
  };

  // Function to handle rating filter change
  const handleRatingChange = (rating) => {
    setSelectedRating(rating);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  // Function to render stars
  const renderStars = (count) => {
    return [...Array(count)].map((_, index) => (
      <Star
        key={index}
        fill="rgb(4, 148, 4)"
        color="rgb(4, 148, 4)"
        size={16}
      />
    ));
  };
  return (
    <section className="product-wrapper">
      <div className="product-container">
        <div className="product-route">
          {/* name category and route */}
          <h1>Shop</h1>
          <em>HomePage &gt; Shop</em>
        </div>
        <div className="product-filter">
          <div className="filter-section">
            {/* design the filter lis */}
            <div className="filter-section-category">
              <label htmlFor="">Product Category</label>
              <ul className="category-list">
                {categories.map((category, index) => (
                  <li key={index}>
                    <input
                      type="checkbox"
                      value={category}
                      onChange={handleCategoryChange}
                      checked={selectedCategories.includes(category)}
                    />
                    {category}
                  </li>
                ))}
              </ul>
            </div>
            <div className="filter-section-price">
              <label htmlFor="">Price Range</label>
              <div className={"values"}>
                ${values[0]} - ${values[1]}
              </div>
              <ReactSlider
                className={"slider"}
                onChange={setValues}
                value={values}
                min={MIN}
                max={MAX}
              />
            </div>
            <div className="filter-section-rating">
              <label htmlFor="">Rating</label>
              <div className="rating-list">
                <div
                  id="rating-head"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleRatingChange(4)}
                >
                  {renderStars(5)}

                  <span>(85)</span>
                </div>
                <div
                  id="rating-head"
                  onClick={() => handleRatingChange(3)}
                  style={{ cursor: "pointer" }}
                >
                  {renderStars(4)}
                  <span>(7)</span>
                </div>
                <div
                  // id="rating-head"
                  onClick={() => handleRatingChange(2)}
                  style={{ cursor: "pointer" }}
                >
                  {renderStars(3)}
                  <span>(23)</span>
                </div>
              </div>
            </div>
            <div className="filter-section-brand">
              <label htmlFor="">Brand</label>
              <ul className="brand-list">
                <li>
                  <input type="checkbox" name="" id="" />
                  category 1
                </li>
                <li>
                  <input type="checkbox" name="" id="" />
                  category 1
                </li>
                <li>
                  <input type="checkbox" name="" id="" />
                  category 1
                </li>
                <li>
                  <input type="checkbox" name="" id="" />
                  category 1
                </li>
                <li>
                  <input type="checkbox" name="" id="" />
                  category 1
                </li>
                <li>
                  <input type="checkbox" name="" id="" />
                  category 1
                </li>
              </ul>
            </div>
          </div>
          <div className="product-grid">
            {/* design the product grid */}
            <div className="grid-right-top">
              {/* design the filter bar */}
              <div className="sorting-grid">
                <Grid2X2 className="grid-icon" size={18} />
                <ul name="li-sort" id="sort-value">
                  <li onClick={() => setSortOption("Popularity")}>
                    Popularity
                  </li>
                  <li onClick={() => setSortOption("Price-L/H")}>
                    Price Low - High
                  </li>
                  <li onClick={() => setSortOption("Price-H/L")}>
                    Price High - Low
                  </li>
                  <li onClick={() => setSortOption("Newest-First")}>
                    Newest First
                  </li>
                  <li onClick={() => setSortOption("Discount")}>Discount</li>
                </ul>
              </div>
              <em>
                showing {indexOfFirstProduct + 1}-
                {indexOfLastProduct > products.length
                  ? products.length
                  : indexOfLastProduct}{" "}
                of {products.length} results
              </em>
            </div>
            <div className="grid-right-body">
              {/* design the product grids */}
              {currentProducts.map((product) => (
                <ProductCard key={product.id} item={product} />
              ))}
            </div>
          </div>
        </div>
        <div className="next-page-slide">
          <ul className="page-slide-list">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (number) => (
                <li
                  key={number}
                  className={currentPage === number ? "active" : ""}
                  onClick={() => setCurrentPage(number)}
                >
                  {number}
                </li>
              )
            )}
            {currentPage < totalPages && (
              <li onClick={() => setCurrentPage(currentPage + 1)}>
                <MoveRight size={18} />
              </li>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default ProductView;
