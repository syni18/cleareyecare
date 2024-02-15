import React, { useEffect, useMemo, useState } from "react";
import "./productview.css";
import ReactSlider from "react-slider";
import {  Grid2X2, Star, MoveRight } from "lucide-react";
import ProductCard from "./ProductCard";
import { useLocation } from "react-router-dom";

const MIN = 100;
const MAX = 12000;
function ProductView() {
  const location = useLocation();
  const [productsPerPage] = useState(20);
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [values, setValues] = useState([MIN, MAX]);
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
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
        return products;
    }
  };

  const handleCategoryChange = (event) => {
    const { value } = event.target;
    setSelectedCategories((prevCategories) =>
      prevCategories.includes(value)
        ? prevCategories.filter((category) => category !== value)
        : [...prevCategories, value]
    );
  };

  const sortedAndFilteredProducts = useMemo(() => {
    let sortedProducts = sortProducts(products);
    let filteredProducts = sortedProducts.filter(
      (p) =>
        (selectedCategories.length === 0 ||
          selectedCategories.includes(p.category)) &&
        p.price >= values[0] &&
        p.price <= values[1]
    );
    return filteredProducts;
  }, [products, sortOption, selectedCategories, values]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedAndFilteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(
    sortedAndFilteredProducts.length / productsPerPage
  );

  useEffect(() => {
    const categories = products.map((product) => product.category);
    const unique = [...new Set(categories)]; // Remove duplicates
    setUniqueCategories(unique);
  }, [products]); // This effect runs whenever the 'products' array changes

  console.log();
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
                {uniqueCategories.map((category, index) => (
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
              <ul className="rating-list">
                <li id="rating-head">
                  <Star
                    size={16}
                    fill="rgb(4, 148, 4)"
                    color="rgb(4, 148, 4)"
                    id="rating-star-icon"
                    className="star-icon-1"
                  />
                  <Star
                    size={16}
                    fill="rgb(4, 148, 4)"
                    color="rgb(4, 148, 4)"
                    id="rating-star-icon"
                    className="star-icon-2"
                  />
                  <Star
                    size={16}
                    fill="rgb(4, 148, 4)"
                    color="rgb(4, 148, 4)"
                    id="rating-star-icon"
                    className="star-icon-3"
                  />
                  <Star
                    size={16}
                    fill="rgb(4, 148, 4)"
                    color="rgb(4, 148, 4)"
                    id="rating-star-icon"
                    className="star-icon-4"
                  />
                  <Star
                    size={16}
                    fill="rgb(4, 148, 4)"
                    color="rgb(4, 148, 4)"
                    id="rating-star-icon"
                    className="star-icon-5"
                  />
                  <span>(85)</span>
                </li>
                <li id="rating-head">
                  <Star
                    size={16}
                    fill="rgb(4, 148, 4)"
                    color="rgb(4, 148, 4)"
                    id="rating-star-icon"
                    className="star-icon-1"
                  />
                  <Star
                    size={16}
                    fill="rgb(4, 148, 4)"
                    color="rgb(4, 148, 4)"
                    id="rating-star-icon"
                    className="star-icon-2"
                  />
                  <Star
                    size={16}
                    fill="rgb(4, 148, 4)"
                    color="rgb(4, 148, 4)"
                    id="rating-star-icon"
                    className="star-icon-3"
                  />
                  <Star
                    size={16}
                    fill="rgb(4, 148, 4)"
                    color="rgb(4, 148, 4)"
                    id="rating-star-icon"
                    className="star-icon-4"
                  />
                  <span>(7)</span>
                </li>
                <li id="rating-head">
                  <Star
                    size={16}
                    fill="rgb(4, 148, 4)"
                    color="rgb(4, 148, 4)"
                    id="rating-star-icon"
                    className="star-icon-1"
                  />
                  <Star
                    size={16}
                    fill="rgb(4, 148, 4)"
                    color="rgb(4, 148, 4)"
                    id="rating-star-icon"
                    className="star-icon-2"
                  />
                  <Star
                    size={16}
                    fill="rgb(4, 148, 4)"
                    color="rgb(4, 148, 4)"
                    id="rating-star-icon"
                    className="star-icon-3"
                  />
                  <span>(23)</span>
                </li>
              </ul>
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
