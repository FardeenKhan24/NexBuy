import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { FaYoutube } from "react-icons/fa";
import "./Footer.css";
import { useNavigate} from "react-router-dom";

const Footer = () => {

  const navigate = useNavigate()

  return (
    
    <>
    <div className="footer-container">
      <div className="head">
        <h1>
          NexBuy<span>“Shop Fast. Get It Faster.”</span>
        </h1>
        <p>
          Welcome to NexBuy, your one-stop destination for quality products at
          unbeatable prices. We’re more than just an online store — we’re a team
          of passionate people committed to making your shopping experience
          seamless, secure, and satisfying.
        </p>
      </div>
      <div className="head">
        <h3>QUICK LINKS</h3>
        <ul className="footer-link">
          <li onClick={() => navigate("/")}>Home</li>
          <li onClick={() => navigate("/about")}>About</li>
          <li onClick={() => navigate("/products")}>Products</li>
        </ul>
      </div>
      <div className="head">
        <h3>SHOP NOW</h3>
        <ul className="footer-link">
          <li>Collections</li>
          <li>Trending Products</li>
          <li>New Arrival Products</li>
          <li>Featured Products</li>
        </ul>
      </div>
      <div className="head">
        <h3>REACH US</h3>
        <div className="address">
          <FaLocationDot/>
          <p>Address : XYZ, Gujarat, Inida.Pin-Code : 110005</p>
        </div>
        <div className="phone-email">
          <div>
            <FaPhoneAlt/>
            <p>Phone : +91 123456789</p>
          </div>
          <div>
            <MdOutlineMail/>
            <p>Email: contact@gmail.com</p>
          </div>       
        </div>
        <div className="follow">
          <p>Follow us to get the latest updates on sales, new releases and more...</p>
        </div>
        <div className="iconss">
          <FaFacebook className="facebbok-icon"/>
          <FaInstagram className="instagram-icon"/>
          <FaTwitterSquare className="twitter-icon"/>
          <FaYoutube className="youtube-icon"/>
        </div>
      </div>
    </div>

    <div className="copyright">
      <p>All Rights Reserved </p>
      <p>© 2025 - Fardeen Khan</p>
    </div>

    </>
  );
};

export default Footer;
