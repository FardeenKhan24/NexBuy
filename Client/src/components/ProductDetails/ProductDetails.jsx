import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RiArrowGoBackLine } from "react-icons/ri";
import { addToCart } from "../../features/cartSlice";  
import './ProductDetails.css';

const ProductDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [alertMessage, setAlertMessage] = useState("");
  const product = location.state?.product;

  const [loading, setLoading] = useState(true);
  const cartItems = useSelector((state) => state.cart.cartItems);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAlertMessage("")
    },3000)

    return () => clearTimeout(timer)
  },[alertMessage])

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
        <p>Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return <p>No product details found.</p>;
  }

  const handleAddToCart = () => {
    const isProductInCart = cartItems.some((item) => item.product._id === product._id);

    if (!isProductInCart) {
      dispatch(addToCart({
        _id: product._id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
        product: product,
      }))
        .unwrap()
        .then(() => {
          setAlertMessage(`${product.title} added to cart successfully! ✅`);
        })
        .catch((error) => {
          setAlertMessage(error || "Failed to add to cart");
        });
    } else {
      setAlertMessage(`${product.title} is already in the cart ⚠️`);
    }
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
        <p>PRODUCT ID: {product._id || product.id}</p>
        <p>PRODUCT: <span>{product.title}</span></p>
        <p>Price: <span>Rs {product.price}</span></p>
        <p>Category: <span>{product.category}</span></p>
        <h5 className="product-description">Description:</h5>
        <h5 className="product-descriptions">{product.description}</h5>
        <div className="details-icon">
          <RiArrowGoBackLine className="back" onClick={() => navigate(-1)} />
          <button
            className="add-btn"
            onClick={handleAddToCart}
          >
            ADD To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
