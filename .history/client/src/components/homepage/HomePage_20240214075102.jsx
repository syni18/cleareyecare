import React from 'react'
import './homepage.css';
import TopItems from '../products/TopItems';
import { Link } from 'react-router-dom';
import ProductPlaceholder from '../placeholder/Placeholder';
import useFetchProducts from '../../hooks/useFetechProducts';

function HomePage() {
  const { products, error, loading } = useFetchProducts();

  if (error) return <div>Error: {error}</div>;

  const placeholders = [...Array]
  
  return (
    <div className="home-page-wrapper">
      <div className="home-page-container">
        {/* console.log({product}); */}
        <div className="page-top-cat">
          <TopItems item={products}/>
          <div className="page-top-tdhead">
            <label htmlFor="" className="tdhead-label">
              Top clothing Product
            </label>
            <div className="product-grids">
              {products.slice(10, 16).map((product) => (
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
              {products.slice(23, 29).map((product) => (
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
        </div>
      </div>
    </div>
  );
}

export default HomePage;