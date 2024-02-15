import React from 'react'
import './homepage.css';
import TopItems from '../products/TopItems';
import { Link } from 'react-router-dom';
import ProductPlaceholder from '../placeholder/Placeholder';
import useFetchProducts from '../../hooks/useFetechProducts';

function HomePage() {
  const { products, error, loading } = useFetchProducts();

  if (error) return <div>Error: {error}</div>;

  const placeholders = [...Array(6)].map((_, index) => <ProductPlaceholder key={index}/>)
  
  return (
    <div className="home-page-wrapper">
      <div className="home-page-container">
        {/* console.log({product}); */}
        <div className="page-top-cat">
          {loading ? (
            <div className='product-'
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;