import React, { useState, useEffect } from 'react';
import CartImage from '../../assets/cartimg.png';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, increaseQuantity, decreaseQuantity, clearCart, fetchCart } from '../../features/cartSlice';
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import './Cart.css';
import emailjs from '@emailjs/browser';

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const cartItems = useSelector((state) => state.cart.cartItems || []);
  const user = useSelector((state) => state.user.user);

  const subtotal = cartItems.reduce((total, item) => total + (item.product.price || 0) * (item.quantity || 0), 0);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const shipping = cartItems.length > 0 ? 5.00 : 0;
  const totalPrice = subtotal + shipping;

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleBuy = async () => {
    if (cartItems.length === 0) {
      alert("No items in cart");
      return;
    }

    if (!user) {
      navigate("/login");
      return;
    }

    const orderDate = new Date().toDateString();
    const arrivalDate = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toDateString();

    const itemsList = cartItems
    .map((item, i) => `${i + 1}. ${item.product.title} - Qty: ${item.quantity} - Rs${item.product.price}`)
    .join('\n');
  
    setIsLoading(true);

    try {
      await emailjs.send('service_2me6g24', 'template_0pwwjbd', {
        user_name: user.name,
        email: user.email,
        order_date: orderDate,
        arrival_date: arrivalDate,
        items: itemsList,
        subtotal: subtotal.toFixed(2),
        shipping: shipping.toFixed(2),
        total: totalPrice.toFixed(2),
      }, 'RwRJqSD6wlFvHXwJN');
      console.log("Email sent via EmailJS");
    } catch (err) {
      console.error("Error sending email:", err);
      alert("Failed to send email. Please try again.");
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
    navigate("/buy", {
      state: {
        cartItems,
        subtotal,
        shipping,
        totalPrice,
        orderDate
      }
    });
  };

  const handleBuyNow = async (product) => {
    if (!user) {
      navigate("/login");
      return;
    }

    const orderDate = new Date().toDateString();
    const arrivalDate = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toDateString();
    const singleSubtotal = (product.product.price || 0) * (product.quantity || 0);
    const shipping = 5.00;
    const totalPrice = singleSubtotal + shipping;

    const itemsList = `1. ${product.product.title} - Qty: ${product.quantity} - Rs${product.product.price}`;
    
    setIsLoading(true);

    try {
      await emailjs.send('service_2me6g24', 'template_0pwwjbd', {
        user_name: user.name,
        email: user.email,
        order_date: orderDate,
        arrival_date: arrivalDate,
        items: itemsList,
        subtotal: singleSubtotal.toFixed(2),
        shipping: shipping.toFixed(2),
        total: totalPrice.toFixed(2),
      }, 'RwRJqSD6wlFvHXwJN');
      console.log("Email sent via EmailJS");
    } catch (err) {
      console.error("Error sending email:", err);
      alert("Failed to send email. Please try again.");
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
    navigate("/buy", {
      state: {
        cartItems: [product],
        subtotal: singleSubtotal,
        shipping,
        totalPrice,
        orderDate
      }
    });
  };

  const handleIncrease = (id) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecrease = (id) => {
    dispatch(decreaseQuantity(id));
  };

  return (
    <>
      {cartItems.length > 0 && (
        <p onClick={() => dispatch(clearCart())} className='clear'>Clear All Items</p>
      )}
      <div className="cart-container">
        {isLoading ? (
          <div className="loader-container">
            <div className="loader"></div>
            <p>Placing your order... Please wait.</p>
          </div>
        ) : (
          <div className="cart-container2">
            {cartItems.length > 0 ? (
              cartItems.map((p) => (
                <div key={p._id} className="cart-container1">
                  <div className="image-and-details">
                    <div className="img-cont">
                      <img src={p.product.image} alt={p.product.title} className="cart-image" />
                    </div>
                    <div className="product-desc">
                      <p className="cart-title">Product: <span>{p.product.title}</span></p>
                      <p>Price: <span>Rs {p.product.price}</span></p>
                      <p>ID: <span>{p._id}</span></p>
                    </div>
                  </div>

                  <div className="cart-actions">
                    <div className="quantity">
                      <p>Quantity: </p>
                      <button onClick={() => handleDecrease(p._id)}>-</button>
                      <p>{p.quantity}</p>
                      <button onClick={() => handleIncrease(p._id)}>+</button>
                    </div>
                    <button className="buy-now-btn" onClick={() => handleBuyNow(p)}>Buy Now</button>
                    <div className="delete-cont">
                      <MdDeleteOutline onClick={() => dispatch(removeFromCart(p._id))} />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-items">
                <img src={CartImage} alt="No items in cart" />
              </div>
            )}
          </div>
        )}

        {!isLoading && (
          <div className="order-container">
            <h1 className="order">ORDER SUMMARY</h1>
            <div className="order-item">
              <p>Total Items:</p>
              <p>{totalItems}</p>
            </div>
            <div className="order-item">
              <p>Subtotal:</p>
              <p>Rs {subtotal.toFixed(2)}</p>
            </div>
            <div className="order-items">
              <p>Estimated Shipping:</p>
              <p>Rs {shipping.toFixed(2)}</p>
            </div>
            <div className="order-item">
              <p className="sub">Total:</p>
              <p>Rs {totalPrice.toFixed(2)}</p>
            </div>
            <button onClick={handleBuy} disabled={isLoading}>
              {isLoading ? "Processing..." : "Checkout"}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
