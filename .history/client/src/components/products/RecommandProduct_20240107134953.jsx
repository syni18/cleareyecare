import React from 'react'
import './recommandproduct.css';
import RecommandData from './RecommandData';
import Slider from 'react-slick';


function RecommandProduct({product}) {
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
            //  infinite: true,
            //  dots: true,
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
    <div className="recommand-product-wrapper">
      <div className="recommand-product-container">
        <label htmlFor="">You may also like</label>
        <Slider {...settings}> 
          <RecommandData product={product}/>
        </Slider>
      </div>
    </div>
  );
}

export default RecommandProduct