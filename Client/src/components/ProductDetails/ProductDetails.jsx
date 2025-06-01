import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { RiArrowGoBackLine } from "react-icons/ri";
import { addToCart } from "../../features/cartSlice";
import { useSelector } from "react-redux";
import "./ProductDetails.css";
import { increaseQuantity, decreaseQuantity } from "../../features/cartSlice";

const ProductDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const product = location.state?.product;
  const cartItems = useSelector((state) => state.cart.cartItems);

  const [loading, setLoading] = useState(true);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="cube-loader">
          <div className="cube cube1"></div>
          <div className="cube cube2"></div>
          <div className="cube cube3"></div>
          <div className="cube cube4"></div>
        </div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!product) {
    return <p>No product details found.</p>;
  }

const handleAddToCart = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    setAlertMessage("Please login to add to cart ⚠️");
    setTimeout(() => setAlertMessage(""), 3000);
    return;
  }

  dispatch(addToCart(product._id));
  setAlertMessage(`${product.title} added successfully ✅`);
  setTimeout(() => setAlertMessage(""), 3000);
};


  return (
    <div className="productDetails-container">
      {alertMessage && (
        <div className="alert">
          <p>{alertMessage}</p>
        </div>
      )}

      <div className="product-details">
        <img src={product.image} alt={product.title} className="product-img" />
        <p>PRODUCT ID: {product._id}</p>
        <p>
          PRODUCT: <span>{product.title}</span>
        </p>
        <p>
          Price: <span>Rs {product.price}</span>
        </p>
        <p>
          Category: <span>{product.category}</span>
        </p>
        <h5 className="product-description">Description:</h5>
        <h5 className="product-descriptions">{product.description}</h5>
        <div className="details-icon">
  <RiArrowGoBackLine className="back" onClick={() => navigate(-1)} />

  {(() => {
    const cartItem = cartItems.find(
      (item) => item.product._id === product._id
    );
    if (cartItem) {
      return (
        <div className="qty-controls">
          <button onClick={() => dispatch(decreaseQuantity(cartItem._id))}>-</button>
          <span>{cartItem.quantity}</span>
          <button onClick={() => dispatch(increaseQuantity(cartItem._id))}>+</button>
        </div>
      );
    } else {
      return (
        <button className="add-btn" onClick={handleAddToCart}>
          ADD TO CART
        </button>
      );
    }
  })()}
</div>

      </div>
    </div>
  );
};

export default ProductDetails;
