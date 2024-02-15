import React, { useEffect, useState } from "react";
import "./productview.css";
import ReactSlider from "react-slider";
import {  Grid2X2, Star, ChevronDown, MoveRight } from "lucide-react";
import ProductCard from "./ProductCard";

const MIN = 100;
const MAX = 12000;
const API_PRODUCT = "https://dummyjson.com/products";
function ProductView() {
  const [values, setValues] = useState([MIN, MAX]);
  const [product, setProducts] = useState([]);
  const fetchProduct = async (url) => {
    try {
      const res = await fetch(url);

      if (!res.ok) {
        throw new Error(`Failed to fetch data. Status: ${res.status}`);
      }

      const data = await res.json();

      if (
        data.products &&
        Array.isArray(data.products) &&
        data.products.length > 0
      ) {
        setProducts(data.products);
        console.log("Products array:", data.products);
      } else {
        console.log("Empty or invalid products array:", data.products);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchProduct(API_PRODUCT);
  }, []);
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
                    size={16} fill="rgb(4, 148, 4)" color="rgb(4, 148, 4)"
                    id="rating-star-icon"
                    className="star-icon-1"
                  />
                  <Star
                    size={16} fill="rgb(4, 148, 4)" color="rgb(4, 148, 4)"
                    id="rating-star-icon"
                    className="star-icon-2"
                  />
                  <Star
                    size={16} fill="rgb(4, 148, 4)" color="rgb(4, 148, 4)"
                    id="rating-star-icon"
                    className="star-icon-3"
                  />
                  <Star
                    size={16} fill="rgb(4, 148, 4)" color="rgb(4, 148, 4)"
                    id="rating-star-icon"
                    className="star-icon-4"
                  />
                  <Star
                    size={16} fill="rgb(4, 148, 4)" color="rgb(4, 148, 4)"
                    id="rating-star-icon"
                    className="star-icon-5"
                  />
                  <span>(85)</span>
                </li>
                <li id="rating-head">
                  <Star
                    size={16} fill="rgb(4, 148, 4)" color="rgb(4, 148, 4)"
                    id="rating-star-icon"
                    className="star-icon-1"
                  />
                  <Star
                    size={16} fill="rgb(4, 148, 4)" color="rgb(4, 148, 4)"
                    id="rating-star-icon"
                    className="star-icon-2"
                  />
                  <Star
                    size={16} fill="rgb(4, 148, 4)" color="rgb(4, 148, 4)"
                    id="rating-star-icon"
                    className="star-icon-3"
                  />
                  <Star
                    size={16} fill="rgb(4, 148, 4)" color="rgb(4, 148, 4)"
                    id="rating-star-icon"
                    className="star-icon-4"
                  />
                  <span>(7)</span>
                </li>
                <li id="rating-head">
                  <Star
                    size={16} fill="rgb(4, 148, 4)" color="rgb(4, 148, 4)"
                    id="rating-star-icon"
                    className="star-icon-1"
                  />
                  <Star
                    size={16} fill="rgb(4, 148, 4)" color="rgb(4, 148, 4)"
                    id="rating-star-icon"
                    className="star-icon-2"
                  />
                  <Star
                    size={16} fill="rgb(4, 148, 4)" color="rgb(4, 148, 4)"
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
                <Grid2X2 className="grid-icon" size={18}/>

                <ul
                  name="li-sort"
                  id="sort-value"
                >
                  <li value="Popularity">Popularity</li>
                  <li value="Price-L/H">Price Low - High</li>
                  <li value="Price-H/L">Price High - Low</li>
                  <li value="Newest-First">Newest First</li>
                  <li value="Discount">Discount</li>
                </ul>
              </div>
              <em>showing 1-12 of 32 results</em>
            </div>
            <div className="grid-right-body">
              {/* design the product grids */}
              {/* {product.map((product)=> (
                <ProductCard item={product}/>
              ))} */}
              {/* <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard /> */}
            </div>
          </div>
        </div>
        <div className="next-page-slide">
          <ul className="page-slide-list">
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
            <li>
              <MoveRight size={18} />
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default ProductView;
