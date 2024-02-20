import React, { useState } from "react";
import Layout from "../../components/layouts/Layout";
import { useAuth } from "../../context/authProvider";
import UserMenu from "./UserMenu";
import Orders from "./Orders";
import Profile from "./Profile";
import "./style.css";

const UserDashboard = () => {
  const [auth, setAuth] = useAuth();
  const [selectedTab, setSlelectedTab] = useState("Orders");

  const setTabFunction = (event) => {
    setSlelectedTab(event.currentTarget.innerHTML);
  };
  return (
    <Layout title={"User-Dashboard-Emart"}>
      <div className="userPanel-mainWrapper">
        <div className="userPanel-leftSection">
          <UserMenu onClick={setTabFunction} active={selectedTab} />
        </div>
        <div className="userPanel-rightSection">
          {selectedTab === "Orders" && <Orders />}
          {selectedTab === "profile" && <Profile />}
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
