import React, { useEffect, useState } from "react";
import Layout from "../../components/layouts/Layout";
import { useAuth } from "../../context/authProvider";
import { useCart } from "../../context/cartProvider";
import { useNavigate } from "react-router-dom";
import "./style.css";
import axios from "axios";
import Chips from "../../components/chip/Chips";
import { Carousel } from "antd";
import ProductCard from "../../components/productCard/ProductCard";
import SectionHeader from "../../components/sectionHeader/SectionHeader";
import CategoryCard from "../../components/category/CategoryCard";

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);
  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/product/product-list/${page}`
      );
      console.log("product --", data);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/product/product-count`
      );
      // console.log("total --", data);
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/product/product-list/${page}`
      );
      // console.log("product load --", data);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/product/product-filters`,
        {
          checked,
          radio,
        }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={`Ecommerce app-all products`}>
      <div className="mainContaner">
        {/* category header start*/}
        <div className="cat-header">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
            <Chips name={"groceroy"} onSelect={() => alert(`hello`)} />
          ))}
        </div>
        {/* category header end */}
        {/* carousel start */}
        <div>
          <Carousel autoplay>
            <div>
              <img
                className="carousel-style"
                src="https://i.pinimg.com/564x/d6/e8/69/d6e8690bcc922224ace9cf1a2410c8a3.jpg"
              />
            </div>
            <div>
              <img
                className="carousel-style"
                src="https://i.pinimg.com/564x/9d/7b/1f/9d7b1f682cfddeb77d0a9f18f04973b4.jpg"
              />
            </div>
            <div>
              <img
                className="carousel-style"
                src="https://i.pinimg.com/564x/60/fc/d5/60fcd5c646686fc4550ab4097449cfb1.jpg"
              />
            </div>
            <div>
              <img
                className="carousel-style"
                src="https://i.pinimg.com/564x/ea/b3/1b/eab31b6f8f09f900447ce0ce1c169d47.jpg"
              />
            </div>
          </Carousel>
        </div>
        {/* carousel end */}
        {/* shop top category start*/}
        {categories.length > 0 ? (
          <div className="spacer-mainWrapper">
            <SectionHeader heading={`Shop from top Categories`} />
            <div className="category-header">
              {categories?.map((item) => (
                <CategoryCard name={item.name} image={item.photo} />
              ))}
            </div>
          </div>
        ) : (
          <></>
        )}
        {/* shop category ends */}
        {/* best deals start */}
        {products.length > 0 ? (
          <div className="spacer-mainWrapper">
            <SectionHeader heading={`Grab the best deals on spares`} />
            <div className="deals-header">
              {products?.map((item) => (
                <div key={item._id}>
                  <ProductCard
                    name={item.name}
                    price={item.price}
                    image={item.photo}
                    offer={item.offer}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <></>
        )}
        {/* best deals end */}
      </div>
    </Layout>
  );
};

export default HomePage;
