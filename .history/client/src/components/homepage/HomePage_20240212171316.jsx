import React, { useEffect, useState } from 'react'
import './homepage.css';
import TopItems from '../products/TopItems';
import { Link } from 'react-router-dom';


const API_PRODUCT = "https://dummyjson.com/products";

function HomePage() {
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

  useEffect(()=> {
    fetchProduct(API_PRODUCT);
  },[]);
  
  return (
    <div className="home-page-wrapper">
      <div className="home-page-container">
        {/* console.log({product}); */}
        <div className="page-top-cat">
          {/* <TopItems item={product}/> */}
          <div className="page-top-tdhead">
            <label htmlFor="" className="tdhead-label">
              Top clothing Product
            </label>
            <div className="product-grid">
              {product.slice(10, 16).map((product) => (
                <Link to={`/item/${product.id}`}>
                  <div className="product">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="product-image"
                    />
                    <div className="product-info">
                      <h3 className="product-title">{product.title}</h3>
                      <p className="product-price">Rs {product.price}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="page-top-tdhead">
            <label htmlFor="" className="tdhead-label">
              Top Eye Glasses Product
            </label>
            <div className="product-grid">
              {product.slice(23, 29).map((product) => (
                <Link to={`/item/${product.id}`}>
                  <div className="product">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="product-image"
                    />
                    <div className="product-info">
                      <h3 className="product-title">{product.title}</h3>
                      <p className="product-price">Rs {product.price}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="page-top-tdhead">
            <label htmlFor="" className="tdhead-label">
              Top Shoes Product
            </label>
            <div className="product-grid">
              {product.slice(17, 23).map((product) => (
                <Link to={`/item/${product.id}`}>
                  <div className="product">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="product-image"
                    />
                    <div className="product-info">
                      <h3 className="product-title">{product.title}</h3>
                      <p className="product-price">Rs {product.price}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;