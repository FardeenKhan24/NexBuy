import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './BuyNow.css';

const BuyNow = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!state) {
      navigate('/');  
      return;
    }

    const { cartItems, subtotal, shipping, totalPrice, orderDate } = state;

    if (!cartItems || cartItems.length === 0) {
      alert("No items in your cart.");
      navigate('/');  
      return;
    }

    setOrderData({
      cartItems,
      subtotal,
      shipping,
      totalPrice,
      orderDate
    });

    setLoading(false);
  }, [state, navigate]);

  if (loading) {
    return <div>Loading order details...</div>;
  }

  if (!orderData) {
    return <div>No order details available.</div>;
  }

  const { cartItems, totalPrice, orderDate, shipping, subtotal } = orderData;

  return (
    <div className="buy-container">
      <div className="orders">
        <h2 className='summary'>Your Order Has Been Placed</h2>
        <h3 className='summary'>Order Summary</h3>
        <p className='date'><strong>Order Date:</strong> {orderDate}</p>

        {cartItems && cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item.product._id} className="buy-item">
              <img src={item.product.image} alt={item.product.title} className="buy-image" />
              <div className="buy-details">
                <p><strong>Title:</strong> {item.product.title}</p>
                <p><strong>Quantity:</strong> {item.quantity}</p>
                <p><strong>Price:</strong> Rs {(item.product.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No items in the cart.</p>
        )}
        
        <div className='total'>
          <h3>Total: {`Rs ${subtotal.toFixed(2)} + Shipping Charges: Rs ${shipping.toFixed(2)} = Rs ${totalPrice.toFixed(2)}`}</h3>
        </div>
      </div>
    </div>
  );
};

export default BuyNow;
