import React from "react";
import PropTypes from "prop-types"; 
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./LikedProductsModal.css";

const LikedProductsModal = ({ products, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Liked Products</h2>
          <button className="close-btn" onClick={onClose}><FaTimes /></button>
        </div>
        {products.length > 0 ? (
          <div className="modal-body">
            {products.map(product => (
              <div key={product._id} className="liked-product">
                <img src={product.image} alt={product.title} />
                <div className="info">
                  <h4>{product.title}</h4>
                  <p>Price: Rs {product.price}</p>
                  <Link to={`/product/${product._id}`} state={{ product }} onClick={onClose} className="more-details">More Details</Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No liked products yet.</p>
        )}
      </div>
    </div>
  );
};

LikedProductsModal.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired
    }).isRequired
  ).isRequired,
  onClose: PropTypes.func.isRequired
};

export default LikedProductsModal;
