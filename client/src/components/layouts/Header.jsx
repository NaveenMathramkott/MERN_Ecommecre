import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authProvider";
import toast from "react-hot-toast";
import webIcon from "../../assets/emartIcon.png";
import { IoIosArrowDropupCircle, IoIosPersonAdd } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { CiLocationOn } from "react-icons/ci";
import { TbTruckDelivery } from "react-icons/tb";
import { BiSolidOffer } from "react-icons/bi";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { Badge, AutoComplete } from "antd";
import axios from "axios";

import "./style.css";
import { useCart } from "../../context/cartProvider";
import DrawerTab from "../drawer/DrawerTab";
import { debounce, textShorter } from "../../utils/utils";

const Header = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [showOpen, setShowOpen] = useState(false);
  const [showSideMenu, setShowSideMenu] = useState(false);
  const [productList, setProductList] = useState([]);
  const [auth, setAuth] = useAuth();

  const handleLogout = () => {
    setShowOpen(false);
    setShowSideMenu(false);
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
    navigate("/");
  };

  const searchProduct = async (event) => {
    let response = [];
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/product/search/${event}`
      );
      response = data?.map((item) => ({
        value: item.name,
        label: item.name,
        item,
      }));
      setProductList(response);
    } catch (error) {
      setProductList(response);
      console.log(error);
    }
  };
  const onChangeSearchInput = debounce(searchProduct, 1000);
  const toProductDetailPage = (item) => {
    navigate("/product", { state: item });
  };
  console.log("search product", productList);
  return (
    <>
      <nav className="navbar-secondary">
        <span>Welcome to World Wide E Mart</span>
        <div className="right-sec-navbar">
          <div className="status-view-bar">
            <CiLocationOn color="#80bcbd" /> <span>Deliver to 680516</span>
          </div>
          <div className="divider" />
          <div className="status-view-bar">
            <TbTruckDelivery color="#80bcbd" />
            <span>Track your Order</span>
          </div>
          <div className="divider" />
          <div className="status-view-bar">
            <BiSolidOffer color="#80bcbd" />
            <span>All Offers</span>
          </div>
        </div>
      </nav>
      <nav className="navbar-main">
        <Link className="left-nav" to={"/"}>
          <img src={webIcon} alt="webIcon" width={50} height={50} />
          <span>Electro Mart</span>
        </Link>
        <div className="right-nav">
          <div className="search-box">
            <div className="search-input">
              <AutoComplete
                suffixIcon={<IoIosSearch />}
                allowClear
                className="autoComplete"
                onSearch={onChangeSearchInput}
                placeholder="Search products"
                options={productList}
                onSelect={(e, option) => toProductDetailPage(option.item)}
              />
            </div>
          </div>
          {!auth.user ? (
            <NavLink className="linkBtn" to="/login">
              <IoIosPersonAdd /> <span>SignUp / SignIn</span>
            </NavLink>
          ) : (
            <div className="profile-options">
              <NavLink
                className="linkBtn"
                onClick={() => setShowOpen(!showOpen)}
              >
                {showOpen ? (
                  <IoIosArrowDropupCircle />
                ) : (
                  <IoIosArrowDropdownCircle />
                )}
                <span style={{ color: showOpen ? "#80bcbd" : "#666666" }}>
                  {auth?.user?.name}
                </span>
              </NavLink>

              {showOpen && (
                <div className="profile-option-list">
                  <button>Profile</button>
                  <button
                    onClick={() =>
                      navigate(
                        `/dashboard/${auth.user.admin ? "admin" : "user"}`
                      )
                    }
                  >
                    Dashboard
                  </button>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          )}

          <div className="divider" />
          <Badge count={cart.length}>
            <Link className="linkBtn" to={"/cart"}>
              <FaShoppingCart />
              <span>Cart</span>
            </Link>
          </Badge>
        </div>
        <>
          <div className="onMobile-view">
            {!auth.user ? (
              <NavLink className="linkBtn" to="/login">
                <IoIosPersonAdd /> <span>SignUp / SignIn</span>
              </NavLink>
            ) : (
              <div className="mobileView-header">
                <div className="search-box-mobileView">
                  <div className="search-input">
                    <AutoComplete
                      suffixIcon={<IoIosSearch />}
                      allowClear
                      className="autoComplete"
                      onSearch={onChangeSearchInput}
                      placeholder="Search products"
                      options={productList}
                      onSelect={(e, option) => toProductDetailPage(option.item)}
                    />
                  </div>
                </div>
                <div className="drawer-mobileView">
                  <DrawerTab
                    nav={
                      <Badge count={cart.length}>
                        <Link className="linkBtn" to={"/cart"}>
                          <FaShoppingCart />
                          <span>Cart</span>
                        </Link>
                      </Badge>
                    }
                    title={
                      <span style={{ color: "#80bcbd" }}>
                        {auth?.user?.name}
                      </span>
                    }
                  >
                    <div className="onMobileView">
                      <button>Profile</button>

                      <button
                        onClick={() =>
                          navigate(
                            `/dashboard/${auth.user.admin ? "admin" : "user"}`
                          )
                        }
                      >
                        Dashboard
                      </button>
                      <button onClick={handleLogout}>Logout</button>
                    </div>
                  </DrawerTab>
                </div>
              </div>
            )}
          </div>
        </>
      </nav>
    </>
  );
};

export default Header;
