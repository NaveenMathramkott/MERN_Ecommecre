import React from "react";
import "./style.css";

const ProductCard = ({ image, price, offer, name, onClick }) => {
  const data = (offer / price) * 100;
  return (
    <div className="productCard-mainWrapper">
      <div className="productCard-container">
        <img src={image} alt={name} />
        <div id="detail-section">
          <span id="name">{name}</span>
          <span id="price">AED {price}</span>
          <span id="offer">Save - AED {price}</span>
        </div>
      </div>
      <div className="offer-tag">
        <span>{`${data}% off`}</span>
      </div>
    </div>
  );
};

export default ProductCard;
