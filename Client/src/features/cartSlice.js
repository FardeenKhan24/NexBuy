import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const token = localStorage.getItem("token");

export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/cart/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.items;
  } catch (err) {
    throw new Error(err.response?.data?.message || err.message);
  }
});

export const addToCart = createAsyncThunk("cart/addToCart", async (productId) => {
  try {
    const res = await axios.post(
      "http://localhost:5000/api/cart/add",
      { productId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data.items;
  } catch (err) {
    throw new Error(err.response?.data?.message || err.message);
  }
});

export const removeFromCart = createAsyncThunk("cart/removeFromCart", async (itemId) => {
  try {
    const res = await axios.delete(`http://localhost:5000/api/cart/remove/${itemId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.items;
  } catch (err) {
    throw new Error(err.response?.data?.message || err.message);
  }
});

export const increaseQuantity = createAsyncThunk("cart/increaseQuantity", async (itemId) => {
  try {
    const res = await axios.put(
      `http://localhost:5000/api/cart/increase/${itemId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data.items;
  } catch (err) {
    throw new Error(err.response?.data?.message || err.message);
  }
});

export const decreaseQuantity = createAsyncThunk("cart/decreaseQuantity", async (itemId) => {
  try {
    const res = await axios.put(
      `http://localhost:5000/api/cart/decrease/${itemId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data.items;
  } catch (err) {
    throw new Error(err.response?.data?.message || err.message);
  }
});

export const clearCart = createAsyncThunk("cart/clearCart", async () => {
  try {
    const res = await axios.delete("http://localhost:5000/api/cart/clear", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.items || [];
  } catch (err) {
    throw new Error(err.response?.data?.message || err.message);
  }
});

const initialState = {
  cartItems: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cartItems = action.payload;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cartItems = action.payload;
      })
      .addCase(increaseQuantity.fulfilled, (state, action) => {
        state.cartItems = action.payload;
      })
      .addCase(decreaseQuantity.fulfilled, (state, action) => {
        state.cartItems = action.payload;
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.cartItems = [];
      });
  },
});

export default cartSlice.reducer;
