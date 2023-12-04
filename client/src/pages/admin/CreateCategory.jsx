import React from "react";
import Layout from "../../components/layouts/Layout";
import AdminMenu from "./AdminMenu";

const CreateCategory = () => {
  return (
    <Layout title={`Dashboard - Category`}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">Category</div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
