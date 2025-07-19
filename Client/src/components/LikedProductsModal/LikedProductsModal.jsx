import React from "react";
import PropTypes from "prop-types";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./LikedProductsModal.css";

const LikedProductsModal = ({ products, onClose, user }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Liked Products</h2>
          <button className="close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        {user ? (
          products.length > 0 ? (
            <div className="modal-body">
              {products.map((product) => (
                <div key={product._id} className="liked-product">
                  <img src={product.image} alt={product.title} />
                  <div className="info">
                    <h4>{product.title}</h4>
                    <p>Price: Rs {product.price}</p>
                    <Link
                      to={`/product/${product._id}`}
                      state={{ product }}
                      onClick={onClose}
                      className="more-details"
                    >
                      More Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No liked products yet.</p>
          )
        ) : (
          <div className="please-login">
          <p>Please log in to view your favourite products.</p>
          <Link to="/login">Login</Link>
          </div>
        )}
      </div>
    </div>
  );
};

LikedProductsModal.propTypes = {
  products: PropTypes.array.isRequired,
  user: PropTypes.object, 
  onClose: PropTypes.func.isRequired,
};

export default LikedProductsModal;
