import React, { useEffect, useState } from 'react'
import './homepage.css';
import Slider from 'react-slick';
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
    // const products = [
    //   {
    //     id: 1,
    //     imgSrc: img1,
    //     title: "Product 1",
    //     price: "$19.99",
    //   },
    //   {
    //     id: 2,
    //     imgSrc: img1,
    //     title: "Product 2",
    //     price: "$29.99",
    //   },
    //   {
    //     id: 3,
    //     imgSrc: img1,
    //     title: "Product 3",
    //     price: "$39.99",
    //   },
    //   {
    //     id: 4,
    //     imgSrc: img1,
    //     title: "Product 4",
    //     price: "$49.99",
    //   },
    //   {
    //     id: 5,
    //     imgSrc: img1,
    //     title: "Product 4",
    //     price: "$49.99",
    //   },
    //   {
    //     id: 6,
    //     imgSrc: img1,
    //     title: "Product 4",
    //     price: "$49.99",
    //   },
    // ];
  return (
    <div className="home-page-wrapper">
      <div className="home-page-container">
        {/* console.log({product}); */}
        <div className="page-top-cat">
          <TopItems item={}
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