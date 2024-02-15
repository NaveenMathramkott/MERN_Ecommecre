import React from "react";
import "./style.css";

const ProductCard = ({ image, price, offer, name, onClick }) => {
  const data = (offer * price) / 100;
  return (
    <div className="productCard-mainWrapper">
      <div className="productCard-container">
        <div className="productCard-image-container">
          <img src={image} alt={name} />
        </div>
        <div id="detail-section">
          <span id="name">{`${name.slice(0, 32)}${
            name.length > 31 ? "..." : "."
          }`}</span>
          <span id="price">AED {price}</span>
          {offer && <span id="offer">Save - AED {data}</span>}
        </div>
      </div>
      {offer && (
        <div className="offer-tag">
          <span>{`${offer}% off`}</span>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
