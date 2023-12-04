import React from "react";
import UserMenu from "./UserMenu";
import Layout from "../../components/layouts/Layout";

const Orders = () => {
  return (
    <Layout title={`Dashboard - Product`}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">Orders</div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
