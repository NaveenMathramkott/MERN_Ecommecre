import React, { useEffect, useState } from "react";
import "./style.css";
import { useAuth } from "../../context/authProvider";
import axios from "axios";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/order/all-orders`
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <div className="product-list-mainWrapper">
      <table className="product-box-container">
        <tr className="product-box-header">
          <div className="product-box-header-left">
            <h3>All Orders</h3>
            <span>{`Number of orders : ${orders?.length} `}</span>
          </div>
          <div className="product-box-header-right">
            <button>Get Report</button>
          </div>
        </tr>
        <tr className="product-list-heading">
          <th className="id">id</th>
          <th className="photo">Photo</th>
          <th className="description">Status</th>
          <th className="name">Name</th>
          <th className="price">Price</th>
          <th className="category">Category</th>
          <th className="quantity">Quantity</th>
        </tr>
        {orders.length > 0 ? (
          <>
            {orders?.map((item, index) => (
              <tr className="product-list-data">
                <td className="id">{index + 1}</td>
                <td className="photo">
                  <img src={item.photo} alt={item.name} width={"100px"} />
                </td>
                <td className="description">
                  <select>
                    <option value={"Not Process"}>Not Process</option>
                    <option value={"Processing"}>Processing</option>
                    <option value={"Shipped"}>Shipped</option>
                    <option value={"Deliverd"}>Delivered</option>
                    <option value={"Cancel"}>Cancel</option>
                  </select>
                </td>
                <td className="name">Name</td>
                <td className="price">Price</td>
                <td className="category">Category</td>
                <td className="quantity">Quantity</td>
              </tr>
            ))}
          </>
        ) : (
          <span>No Orders yet</span>
        )}
      </table>
    </div>
  );
};

export default OrderList;
