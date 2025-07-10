import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrders } from "../../features/orderSlice";
import "./Order.css";

const Order = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const { orders, isLoading, error } = useSelector((state) => state.order);

  useEffect(() => {
    if (user) {
      dispatch(fetchOrders());
    }
  }, [user, dispatch]);

  return (
    <div className="order-page">
      {!user && (
        <div className="login-warning">
          <h3>Please log in to view your order history.</h3>
          <h1>
            <Link to="/login">Go to Login</Link>
          </h1>
        </div>
      )}

      {user && isLoading && (
        <div className="loader-container">
          <div className="cube-loader">
            <div className="cube cube1"></div>
            <div className="cube cube2"></div>
            <div className="cube cube3"></div>
            <div className="cube cube4"></div>
          </div>
          <p>Loading order history...</p>
        </div>
      )}

      {user && error && (
        <p style={{ color: "red", textAlign: "center" }}>{error}</p>
      )}

      {user && !isLoading && !error && orders.length === 0 && (
        <div className="order-history-container">
          <h2>Your Order History</h2>
          <p>No orders found.</p>
        </div>
      )}

      {user && !isLoading && !error && orders.length > 0 && (
        <div className="order-history-container">
          <h2>Your Order History</h2>
          {orders.map((order) => (
            <div className="order-card" key={order._id}>
              <p>
                <strong>Order Date:</strong> {order.orderDate}
              </p>
              <p>
                <strong>Arrival Date:</strong> {order.arrivalDate}
              </p>
              <div className="order-itemss">
                {order.items.map((item, index) => (
                  <div key={index} className="order-it">
                    <img
                      src={item.productId.image}
                      alt={item.productId.title}
                      className="order-item-image"
                    />
                    <div>
                      <p>
                        <strong>{item.productId.title}</strong>
                      </p>
                      <p>Price: Rs {item.productId.price}</p>
                      <p>Quantity: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="total">
                <strong>Total:</strong> Rs {order.total.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Order;
