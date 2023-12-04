import React from "react";
import Layout from "../../components/layouts/Layout";
import { NavLink } from "react-router-dom";
import AdminMenu from "./AdminMenu";
import { useAuth } from "../context/auth";

const AdminDashboard = () => {
  const [auth, setAuth] = useAuth();
  return (
    <Layout title={`Admin Panel - Ecommerce`}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h2>{auth?.user?.name}</h2>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
