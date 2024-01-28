import React from "react";
import Layout from "../../components/layouts/Layout";
import { useAuth } from "../context/auth";
import "./style.css";

const HomePage = () => {
  const [auth, setAuth] = useAuth();
  return (
    <Layout title={`Ecommerce app`}>
      <div className="mainContaner">
        <h4>HomePage</h4>
        <pre>{JSON.stringify(auth, null, 4)}</pre>
      </div>
    </Layout>
  );
};

export default HomePage;
