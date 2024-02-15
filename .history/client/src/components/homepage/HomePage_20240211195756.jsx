import React, { useEffect, useState } from 'react'
import './homepage.css';
import Slider from 'react-slick';
import TopItems from '../products/TopItems';


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
    var settings = {
      //  dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 1,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
  return (
    <div className="home-page-wrapper">
      <div className="home-page-container">
        {/* console.log({product}); */}
        <div className="page-top-cat">
          <div className="product-grid">
            <div className="static-products">
              <h2>Top Static Products</h2>
              <div className="products">
                {Array(4)
                  .fill(null)
                  .map((_, index) => (
                    <img
                      key={index}
                      src={'../'}
                      alt={`Product ${index + 1}`}
                    />
                  ))}
              </div>
            </div>

            <div className="rated-products">
              <h2>Top Rated Products</h2>
              <div className="products">
                {Array(4)
                  .fill(null)
                  .map((_, index) => (
                    <img
                      key={index}
                      src={`img${index + 5}.jpg`}
                      alt={`Product ${index + 5}`}
                    />
                  ))}
              </div>
            </div>

            {/* Add your CSS styles or import them from another file */}
          </div>
          {/* <label htmlFor="">Top Product of Eye Glasses</label> */}
          {/* <Slider {...settings}>
            {product.slice(0,10).map((item) => (
              <TopItems key={item.id} item={item} />
            ))}
          </Slider> */}
        </div>
        {/* <div className="page-top-cat">
          <label htmlFor="">Top Product of Hoodies</label>
          <Slider {...settings}>
            {product.slice(10,20).map((item) => (
              <TopItems key={item.id} item={item} />
            ))}
          </Slider>
        </div>
        <div className="page-top-cat">
          <label htmlFor="">Top Product of Beauty</label>
          <Slider {...settings}>
            {product.slice(20,30).map((item) => (
              <TopItems key={item.id} item={item} />
            ))}
          </Slider>
        </div> */}
      </div>
    </div>
  );
}

export default HomePage;