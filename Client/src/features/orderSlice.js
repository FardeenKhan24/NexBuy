import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const placeOrder = createAsyncThunk(
  "order/placeOrder",
  async ({ user, cartItems, modalProduct, isBulkOrder }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const orderDate = new Date().toDateString();
      const arrivalDate = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toDateString();

      let cartData = [];
      let subtotal = 0;

      if (isBulkOrder) {
        cartData = cartItems;
        subtotal = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
      } else {
        const item = cartItems.find((i) => i.product._id === modalProduct._id);
        if (!item) return rejectWithValue("Product not found in cart");
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

      await axios.post("http://localhost:5000/api/order/send-order-email", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return {
        cartItems: cartData,
        subtotal,
        shipping,
        totalPrice,
        orderDate,
        arrivalDate,
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to place order");
    }
  }
);

export const fetchOrders = createAsyncThunk(
  "order/fetchOrders",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/order/get-orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch orders");
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    isLoading: false,
    orderDetails: null,
    orders: [],
    error: null,
  },
  reducers: {
    clearOrderDetails: (state) => {
      state.orderDetails = null;
    }},
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.orderDetails = null;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearOrderDetails } = orderSlice.actions;
export default orderSlice.reducer;
