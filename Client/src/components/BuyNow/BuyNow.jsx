import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './BuyNow.css'; 

const BuyNow = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    navigate('/');
    return null;
  }

  const { cartItems, totalPrice, orderDate, shipping, subtotal, arrivalDate } = state;

  return (
    <div className="buy-container">
      <div className="orders">
        <h2 className='summary'>Your Order Has Been Placed</h2>
        <h3 className='summary'>Order Summary</h3>
        <p className='date'><strong>Order Date:</strong> {orderDate}</p>
        <p className='date'><strong>Estimated Arrival:</strong> <span style={{ color: 'green' }}>{arrivalDate}</span></p>

        {cartItems.map((item, index) => {
          const product = item.product ? item.product : item; 
          return (
            <div key={index} className="buy-item">
              <img src={product.image} alt={product.title} className="buy-image" />
              <div className="buy-details">
                <p><strong>Title:</strong> {product.title}</p>
                <p><strong>Quantity:</strong> {item.quantity}</p>
                <p><strong>Price:</strong> Rs {product.price.toFixed(2)}</p>
              </div>
            </div>
          );
        })}

        <div className='total'>
          <h3>
            Total: Rs {subtotal?.toFixed(2)} + Shipping: Rs {shipping?.toFixed(2)} = Rs {totalPrice?.toFixed(2)}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default BuyNow;
