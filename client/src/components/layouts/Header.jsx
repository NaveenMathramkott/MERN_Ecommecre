import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authProvider";
import toast from "react-hot-toast";
import webIcon from "../../assets/emartIcon.png";
import { IoIosArrowDropupCircle, IoIosPersonAdd } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { CiFilter } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import { TbTruckDelivery } from "react-icons/tb";
import { BiSolidOffer } from "react-icons/bi";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { RiMenu3Line } from "react-icons/ri";
import { MdOutlineClose } from "react-icons/md";

import "./style.css";

const Header = () => {
  const navigation = useNavigate();
  const [showOpen, setShowOpen] = useState(false);
  const [showSideMenu, setShowSideMenu] = useState(false);
  const [auth, setAuth] = useAuth();
  const handleLogout = () => {
    setShowOpen(false);
    setShowSideMenu(false);
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

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
          <span>E Mart</span>
        </Link>
        <div className="right-nav">
          <div className="search-box">
            <div className="search-input">
              <IoIosSearch />
              <input placeholder="Search products" />
            </div>
            <CiFilter />
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
                      navigation(
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
          <Link className="linkBtn">
            <FaShoppingCart />
            <span>Cart</span>
          </Link>
        </div>
        <>
          <div className="onMobile-view">
            {!auth.user ? (
              <NavLink className="linkBtn" to="/login">
                <IoIosPersonAdd /> <span>SignUp / SignIn</span>
              </NavLink>
            ) : (
              <div className="onMobileView">
                <NavLink
                  className="linkBtn"
                  onClick={() => setShowSideMenu(!showSideMenu)}
                >
                  {showSideMenu ? (
                    <IoIosArrowDropupCircle />
                  ) : (
                    <IoIosArrowDropdownCircle />
                  )}
                  <span style={{ color: showSideMenu ? "#80bcbd" : "#666666" }}>
                    {auth?.user?.name}
                  </span>
                </NavLink>
                <Link className="linkBtn">
                  <FaShoppingCart />
                  <span>Cart</span>
                </Link>

                {showSideMenu && (
                  <div className="dropDownList">
                    <button>Profile</button>
                    <button>Dashboard</button>
                    <button onClick={handleLogout}>Logout</button>
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      </nav>
    </>
  );
};

export default Header;
