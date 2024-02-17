import React, { useEffect } from "react";
import "./style.css";
import Layout from "../../components/layouts/Layout";
import { useCart } from "../../context/cartProvider";
import ImageViewer from "../../components/imageViewer/ImageViewer";
import { textShorter } from "../../utils/utils";

const Cart = () => {
  const [cart, setCart] = useCart();

  const addItem = (itm) => {
    console.log("add item --", itm);
  };
  const removeItem = (itm) => {
    const filteredData = cart?.filter((item, index) => item._id !== itm);
    setCart(filteredData);
    console.log("remove item", itm);
  };
  useEffect(() => {
    // console.log("current cart", cart);
  }, [cart]);
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
                    <span>1</span>
                    <button onClick={() => addItem(item._id)}>+</button>
                  </td>
                  <td className="total">{item.price}</td>
                </tr>
              ))}
            </>
          </table>
          <button>Continue Shopping</button>
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
