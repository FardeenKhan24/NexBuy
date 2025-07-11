import React, { useState, useEffect } from "react";
import CartImage from "../../assets/cartimg.png";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from "../../features/cartSlice";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "./Cart.css";
import axios from "axios";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [modalProduct, setModalProduct] = useState(null);
  const [isBulkOrder, setIsBulkOrder] = useState(false);
  const isOrderLoading = useSelector((state) => state.order.isLoading);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const shipping = cartItems.length > 0 ? 5.0 : 0;
  const totalPrice = subtotal + shipping;

  const handleBuy = () => {
    if (cartItems.length === 0) {
      alert("No items in cart");
      return;
    }
    if (!user) {
      navigate("/login");
      return;
    }

    setModalProduct({ title: "All Cart Items" });
    setIsBulkOrder(true);
    setShowModal(true);
  };

  const handleBuyNow = (cartItem) => {
    if (!user) {
      navigate("/login");
      return;
    }

    setModalProduct(cartItem.product);
    setIsBulkOrder(false);
    setShowModal(true);
  };

const confirmBuy = async () => {
  setShowModal(false);

  try {
    const token = localStorage.getItem("token");

    const orderDate = new Date().toDateString();
    const arrivalDate = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toDateString();

    let cartData = [];
    let subtotal = 0;

    if (isBulkOrder) {
      cartData = cartItems;
      subtotal = cartItems.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
      );
    } else {
      const item = cartItems.find((i) => i.product._id === modalProduct._id);
      if (!item) {
        alert("Product not found in cart");
        return;
      }
      cartData = [item];
      subtotal = item.product.price * item.quantity;
    }

    const shipping = 5;
    const totalPrice = subtotal + shipping;

    const payload = {
      userId: user._id,
      userName: user.name,
      userEmail: user.email,
      cartItems: cartData,
    };

    await axios.post(
      `${import.meta.env.VITE_API_URL}/api/order/send-order-email`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    navigate("/buy", {
    state: {
      cartItems: cartData,
      subtotal,
      shipping,
      totalPrice,
      orderDate,
      arrivalDate,
  },
});

  } catch (error) {
    console.error("Order failed:", error);
    alert("Failed to place order. Try again.");
  }
};


  const handleIncrease = (id) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecrease = (id) => {
    dispatch(decreaseQuantity(id));
  };

  return (
    <>
      {isOrderLoading && (
        <div className="loader-container">
          <div className="cube-loader">
            <div className="cube cube1"></div>
            <div className="cube cube2"></div>
            <div className="cube cube3"></div>
            <div className="cube cube4"></div>
          </div>
          <p>Loading...</p>
        </div>
      )}
      {!isOrderLoading && (
        <>
          {cartItems.length > 0 && (
            <p onClick={() => dispatch(clearCart())} className="clear">
              Clear All Items
            </p>
          )}
          <div className="cart-container">
            <div className="cart-container2">
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <div key={item.product._id} className="cart-container1">
                    <div className="image-and-details">
                      <div className="img-cont">
                        <img
                          src={item.product.image}
                          alt={item.product.title}
                          className="cart-image"
                        />
                      </div>
                      <div className="product-desc">
                        <p className="cart-title">
                          Product: <span>{item.product.title}</span>
                        </p>
                        <p>
                          Price: <span>Rs {item.product.price}</span>
                        </p>
                        <p>
                          ID: <span>{item.product._id}</span>
                        </p>
                      </div>
                    </div>

                    <div className="cart-actions">
                      <div className="quantity">
                        <p>Quantity: </p>
                        <button onClick={() => handleDecrease(item._id)}>
                          -
                        </button>
                        <p>{item.quantity}</p>
                        <button onClick={() => handleIncrease(item._id)}>
                          +
                        </button>
                      </div>
                      <button
                        className="buy-now-btn"
                        onClick={() => handleBuyNow(item)}
                      >
                        Buy Now
                      </button>
                      <div className="delete-cont">
                        <MdDeleteOutline
                          onClick={() => dispatch(removeFromCart(item._id))}
                        />
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
              <button onClick={handleBuy} disabled={isOrderLoading}>
                Checkout
              </button>
            </div>
          </div>
        </>
      )}

      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>Are you sure you want to buy?</h3>
            <p>
              <strong>Product:</strong> {modalProduct?.title}
            </p>
            <div className="modal-actions">
              <button onClick={confirmBuy} className="yes-buy">
                Yes, Buy
              </button>
              <button onClick={() => setShowModal(false)} className="no-buy">
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
