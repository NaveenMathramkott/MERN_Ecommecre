import React, { useState } from "react";
import "./style.css";

const TAB_DATA = [
  {
    to: "/dashboard/admin/orders",
    name: "Orders",
  },
  {
    to: "/dashboard/admin/create-category",
    name: "Categories",
  },
  {
    to: "/dashboard/admin/create-product",
    name: "Products",
  },
  // {
  //   to: "/dashboard/admin/users",
  //   name: "Users",
  // },
];
const AdminMenu = ({ onClick, active }) => {
  return (
    <div className="adminMenu-group">
      {TAB_DATA.map((tabItem) => (
        <ul
          className={`list-group-item ${
            active === tabItem.name ? "onSelect-adminMenu" : ""
          }`}
          onClick={onClick}
        >
          {tabItem.name}
        </ul>
      ))}
    </div>
  );
};

export default AdminMenu;
