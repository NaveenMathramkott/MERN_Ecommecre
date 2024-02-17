import React, { useEffect, useState } from "react";
import Layout from "../../components/layouts/Layout";
import "./style.css";
import { useLocation } from "react-router-dom";
import { getOffer } from "../../utils/utils";
import { useCart } from "../../context/cartProvider";
import toast from "react-hot-toast";

const Product = () => {
  const location = useLocation();
  const [cart, setCart] = useCart();
  const [product, setProduct] = useState(location.state);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onAddToCart = (prod) => {
    setCart([...cart, prod]);
    localStorage.setItem("cart", JSON.stringify([...cart, prod]));
    toast.success("Item Added to cart");
  };

  return (
    <Layout title={`Product Ecommerce app`}>
      <div className="product-detail-mainWrapper">
        <div className="product-detail-left">
          <img src={product.photo} alt={product.name} />
        </div>
        <div className="product-detail-right">
          <h2>{product.name}</h2>
          <span>{product.description}</span>
          <div className="price-offer">
            <span id="price-mrp-detail">{`AED ${getOffer(
              product.price,
              product.offer
            )}`}</span>
            <span>{`AED ${product.price}`}</span>
            <span>{`${product.offer}% off`}</span>
          </div>
          <div className="quantity">
            <span>Quantity</span>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              style={{ width: "50px" }}
            />
          </div>
          <div className="button-buy-cart">
            <button onClick={() => onAddToCart(product)}>Add to Cart</button>
            <button>Buy Now</button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Product;
