import React from "react";
import Layout from "../../components/layouts/Layout";
import AdminMenu from "./AdminMenu";

const CreateProduct = () => {
  return (
    <Layout title={`Dashboard - Product`}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">Product</div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
