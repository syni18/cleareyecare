import React from "react";
import "./homepage.css";
import TopItems from "../products/TopItems";
import { Link } from "react-router-dom";
import ProductPlaceholder from "../placeholder/Placeholder";
import useFetchProducts from "../../hooks/useFetechProducts";

function HomePage() {
  const { products, error, loading } = useFetchProducts();

  if (error) return <div>Error: {error}</div>;

  const placeholders = [...Array(6)].map((_, index) => (
    <ProductPlaceholder key={index} />
  ));

  return (
    <div className="home-page-wrapper">
      <div className="home-page-container">
        {/* console.log({product}); */}
        <div className="page-top-cat">
          {loading ? (
            <div className="product-grids">{placeholders}</div>
          ) : (
            <>
              {/* <TopItems item={products} /> */}
              <div className="page-top-tdhead">
                <label htmlFor="" className="tdhead-label">
                  Explore Our Products
                </label>
                <div className="product-grids">
                  {products.slice(10, 20).map((product) => (
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
                <div className="product-grids">
                  {products.slice(23, 33).map((product) => (
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
                <div className="product-grids">
                  {products.slice(17, 23).map((product) => (
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
