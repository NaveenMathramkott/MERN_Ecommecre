import React, { useEffect } from "react";
import "./style.css";
import Layout from "../../components/layouts/Layout";
import { useCart } from "../../context/cartProvider";
import ImageViewer from "../../components/imageViewer/ImageViewer";
import { textShorter } from "../../utils/utils";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const count = 1;
  const navigate = useNavigate();
  const [cart, setCart] = useCart();

  const addItem = (id) => {
    const selectedProduct = cart.filter((itm) => {
      if (itm._id === id) {
        itm.total += count;
      }
      return itm;
    });
    setCart(selectedProduct);
  };
  const removeItem = (id) => {
    const filteredData = cart?.filter((itm) => {
      if (itm._id === id && itm.total !== 1) {
        itm.total -= count;
        return itm;
      } else if (itm._id !== id) return itm;
    });
    setCart(filteredData);
  };
  useEffect(() => {}, [cart]);
  return (
    <Layout title={`Cart Ecommerce`}>
      <div className="cart-mainWrapper">
        <div className="cart-container-left">
          <div className="cart-section-header">
            <h3>Shopping Cart</h3>
          </div>
          <table className="cart-table-data">
            <tr className="cart-list-heading">
              <th className="id">id</th>
              <th className="photo">Photo</th>
              <th className="name">Name</th>
              <th className="quantity">Quantity</th>
              <th className="price">Price</th>
            </tr>
            <>
              {cart?.map((item, index) => (
                <tr className="cart-list-data" key={item._id}>
                  <td className="id">{index + 1}</td>
                  <td className="photo">
                    <ImageViewer src={item.photo} alt={item.name} />
                  </td>
                  <td className="name">{textShorter(item.name)}</td>
                  <td className="quantity">
                    <button onClick={() => removeItem(item._id)}>-</button>
                    <span>{item.total}</span>
                    <button onClick={() => addItem(item._id)}>+</button>
                  </td>
                  <td className="total">AED {item.total * item.price}</td>
                </tr>
              ))}
            </>
          </table>
          <button
            id="countinue-shop-button"
            onClick={() => navigate("/")}
          >{`<- Continue Shopping`}</button>
        </div>
        <div className="cart-wrapper-onMobile">
          <div className="cart-section-header">
            <h3>Shopping Cart</h3>
          </div>
          <div className="cart-card-container">
            {cart?.map((item) => (
              <div className="cart-mobile-container">
                <div className="cart-mobile-image">
                  <ImageViewer src={item.photo} alt={item.name} />
                </div>
                <div>{item.name}</div>
                <div className="cart-mobile-total">
                  <div className="cart-mobile-quantity">
                    <button onClick={() => removeItem(item._id)}>-</button>
                    <span>{item.total}</span>
                    <button onClick={() => addItem(item._id)}>+</button>
                  </div>
                  <div className="total">{item.total * item.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="cart-container-right">
          <div className="cart-section-header">
            <h3>Order Summary</h3>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
