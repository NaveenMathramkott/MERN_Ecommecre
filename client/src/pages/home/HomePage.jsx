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
      console.log("category --", data);
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
                src="https://i.pinimg.com/236x/ce/a2/d4/cea2d4993e8cb414b8235972fd4b0115.jpg"
              />
            </div>
            <div>
              <img
                className="carousel-style"
                src="https://i.pinimg.com/236x/d5/7e/b9/d57eb9966a19b3bf3b6ef36128234fe4.jpg"
              />
            </div>
            <div>
              <img
                className="carousel-style"
                src="https://i.pinimg.com/236x/b6/8e/2c/b68e2cf6e46522ce889d84854014fab0.jpg"
              />
            </div>
            <div>
              <img
                className="carousel-style"
                src="https://i.pinimg.com/564x/c1/ea/15/c1ea15ff1cd6e2711c09d8d82571bc0b.jpg"
              />
            </div>
          </Carousel>
        </div>
        {/* carousel end */}
        {/* shop top category start*/}
        <div className="spacer-mainWrapper">
          <SectionHeader heading={`Shop from top Categories`} />
          <div className="category-header">
            {categories.map((item) => (
              <CategoryCard
                name={item.name}
                image={
                  "https://i.pinimg.com/564x/c1/ea/15/c1ea15ff1cd6e2711c09d8d82571bc0b.jpg"
                }
              />
            ))}
          </div>
        </div>
        {/* shop category ends */}
        {/* best deals start */}
        <div className="spacer-mainWrapper">
          <SectionHeader heading={`Grab the best deals on spares`} />
          <div className="deals-header">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
              <div>
                <ProductCard
                  name={`iphone 14 (pro max) `}
                  price={100000}
                  offer={45000}
                  image={`https://i.pinimg.com/564x/30/77/21/3077219cbbfc70d5411d39f642820032.jpg`}
                />
              </div>
            ))}
          </div>
        </div>
        {/* best deals end */}
      </div>
    </Layout>
  );
};

export default HomePage;
