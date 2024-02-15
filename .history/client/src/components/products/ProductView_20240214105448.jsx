import React, { useEffect, useState } from "react";
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
  const brands = [
    "Apple",
    "Samsung",
    "OPPO",
    "Huawei",
    "Microsoft Surface",
    "Infinix",
    "HP Pavilion",
    "Impression of Acqua Di Gio",
    "Royal_Mirage"
12
: 
"Fog Scent Xpressio"
13
: 
"Al Munakh"
14
: 
"Lord - Al-Rehab"
15
: 
"L'Oreal Paris"
16
: 
"Hemani Tea"
17
: 
"Dermive"
18
: 
"ROREC White Rice"
19
: 
"Fair & Clear"
20
: 
"Saaf & Khaas"
21
: 
"Bake Parlor Big"
22
: 
"Baking Food Items"
23
: 
"fauji"
24
: 
"Dry Rose"
25
: 
"Boho Decor"
26
: 
"Flying Wooden"
27
: 
"LED Lights"
28
: 
"luxury palace"
29
: 
"Golden"
30
: 
"Furniture Bed Set"
31
: 
"Ratttan Outdoor"
32
: 
"Kitchen Shelf"
33
: 
"Multi Purpose"
34
: 
"AmnaMart"
35
: 
"Professional Wear"
36
: 
"Soft Cotton"
37
: 
"Soft Cotton"
38
: 
"Top Sweater"
39
: 
"Top Sweater"
40
: 
"RED MICKY MOUSE.."
41
: 
"Digital Printed"
42
: 
"Ghazi Fabric"
43
: 
"Ghazi Fabric"
44
: 
"IELGY"
45
: 
"IELGY fashion"
46
: 
"Synthetic Leather"
47
: 
"Sandals Flip Flops"
48
: 
"Maasai Sandals"
49
: 
"Arrivals Genuine"
50
: 
"Vintage Apparel"
51
: 
"FREE FIRE"
52
: 
"Vintage Apparel"
53
: 
"The Warehouse"
54
: 
"The Warehouse"
55
: 
"Sneakers"
56
: 
"Rubber"
57
: 
"The Warehouse"
58
: 
"Sneakers"
59
: 
"Sneakers"
60
: 
"Naviforce"
61
: 
"SKMEI 9117"
62
: 
"SKMEI 9117"
63
: 
"Strap Skeleton"
64
: 
"Stainless"
65
: 
"Eastern Watches"
66
: 
"Eastern Watches"
67
: 
"Luxury Digital"
68
: 
"Watch Pearls"
69
: 
"Bracelet"
70
: 
"LouisWill"
71
: 
"LouisWill"
72
: 
"Bracelet"
73
: 
"Copenhagen Luxe"
74
: 
"Steal Frame"
75
: 
"Darojay",
"Copenhagen Luxe",
"Fashion Jewellery",
"Cuff Butterfly",
"Designer Sun Glasses",
"mastar watch",
"LouisWill",
"Car Aux",
"W1209 DC12V",
"TC Reusable",
"Neon LED Light",
"METRO 70cc Motorcycle - MR70",
"BRAVE BULL",
"shock absorber",
"JIEPOLLY",
"Xiangle",
"lightingbrilliance",
"Ifei Home",
"DADAWU",
"Ifei Home",
"YIOSI"
  ];
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
        return products; // By default, do not sort
    }
  };

  // Filter products based on selected categories, price range, and rating
  const filteredProducts = products.filter((product) => {
    const isCategoryMatch =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);
    const isPriceMatch =
      product.price >= values[0] && product.price <= values[1];
    const isRatingMatch =
      selectedRating === 0 || (product.rating >= selectedRating && product.rating <= selectedRating+1);
    return isCategoryMatch && isPriceMatch && isRatingMatch;
  });

  const sortedAndFilteredProducts = sortProducts(filteredProducts);

  // Calculate pagination details
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedAndFilteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(
    sortedAndFilteredProducts.length / productsPerPage
  );

  // Handlers for category and rating filters
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

  const handleRatingChange = (rating) => {
    setSelectedRating(rating);
    setCurrentPage(1); // Reset to the first page when filters change
  };

  // Function to render stars for the rating filter
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

  // Ensure the component displays all products initially without any filters applied
  useEffect(() => {
    setSortOption("");
    setSelectedCategories([]);
    setSelectedRating(0);
    setValues([MIN, MAX]);
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
                  id="rating-head"
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
