import React from 'react'
import './itemdescriptioncard.css';
import { ChevronUp } from 'lucide-react';

function ItemDescriptionCard({product}) {
  return (
    <div className="description-card-wrapper">
      <div className="description-card-container">
        <label htmlFor="">
          Product Details{" "}
          <span>
            <ChevronUp />
          </span>
        </label>
        <div className="card-container-desc">
          {product.description}
        </div>
        <div className="card-container-bullets">
          <div className="bullet-container-fit">
            <div className="bullet-head">Fit</div>
            <div className="bullet-head-val">Slim fit</div>
          </div>
          <div className="bullet-container-fit">
            <div className="bullet-head">Occasion</div>
            <div className="bullet-head-val">Formal</div>
          </div>
          <div className="bullet-container-fit">
            <div className="bullet-head">Color</div>
            <div className="bullet-head-val">Black</div>
          </div>
          <div className="bullet-container-fit">
            <div className="bullet-head">Fit</div>
            <div className="bullet-head-val">Slim fit</div>
          </div>
          <div className="bullet-container-fit">
            <div className="bullet-head">Pack of</div>
            <div className="bullet-head-val">1</div>
          </div>
          <div className="bullet-container-fit">
            <div className="bullet-head">Type</div>
            <div className="bullet-head-val">Formal Trouser</div>
          </div>
          <div className="bullet-container-fit">
            <div className="bullet-head">Suitable for</div>
            <div className="bullet-head-val">Western Wear</div>
          </div>
          <div className="bullet-container-fit">
            <div className="bullet-head">Belt Loops</div>
            <div className="bullet-head-val">Yes</div>
          </div>
          <div className="bullet-container-fit">
            <div className="bullet-head">Rise</div>
            <div className="bullet-head-val">Mid</div>
          </div>
          <div className="bullet-container-fit">
            <div className="bullet-head">Pattern</div>
            <div className="bullet-head-val">Solid</div>
          </div>
          <div className="bullet-container-fit">
            <div className="bullet-head">Fabric</div>
            <div className="bullet-head-val">Lycra Blend</div>
          </div>
          <div className="bullet-container-fit">
            <div className="bullet-head">Fabric Care</div>
            <div className="bullet-head-val">Gentle Machine Wash</div>
          </div>
          <div className="bullet-container-fit">
            <div className="bullet-head">Fly</div>
            <div className="bullet-head-val">Zipper</div>
          </div>
          <div className="bullet-container-fit">
            <div className="bullet-head">Fabric Details</div>
            <div className="bullet-head-val">
              Poly Viscose Lycra Blended Fabric
            </div>
          </div>
          <div className="bullet-container-fit">
            <div className="bullet-head">Net Quantity</div>
            <div className="bullet-head-val">1</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemDescriptionCard