import React from "react";
import "./styles.css";
import { FaWhatsapp } from "react-icons/fa";
import { MdAddCall } from "react-icons/md";
import google from "../../assets/googlePlay.jpg";
import apple from "../../assets/appleStore.jpg";

const Footer = () => {
  return (
    <div className="footer-mainWrapper">
      <div className="footer-container">
        <div className="sectionOne">
          <h2>Electro Mart</h2>
          <h5 className="space">Contact Us</h5>
          <div className="space">
            <FaWhatsapp />
            +971 123 123 123
          </div>
          <div className="space">
            <MdAddCall />
            +971 123 123 123
          </div>
          <div className="space">
            <img src={google} alt="google play store" />
            <img src={apple} alt="apple store" />
          </div>
        </div>
        <div className="sectionTwo space">
          <h4>Most Popular Categories</h4>
          <li>Heavy Tools</li>
          <li>Mechanical Tools</li>
          <li>Mechanical Protection</li>
        </div>
        <div className="sectionThree space">
          <h4>Customer Service</h4>
          <li>About Us</li>
          <li>FAQ</li>
          <li>Privacy Policy</li>
        </div>
      </div>
      <div id="bottom-footer">
        ©2024 All Rights Reserved. Naveen Mathramkott
      </div>
    </div>
  );
};

export default Footer;
