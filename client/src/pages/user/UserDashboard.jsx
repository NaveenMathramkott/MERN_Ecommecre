import React from "react";
import Layout from "../../components/layouts/Layout";
import { useAuth } from "../../context/authProvider";
import UserMenu from "./UserMenu";

const UserDashboard = () => {
  const [auth, setAuth] = useAuth();
  return (
    <Layout title={"User Dashboard - Ecommerce"}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h2>{auth?.user?.name}</h2>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
