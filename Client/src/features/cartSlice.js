import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getToken = () => {
  return localStorage.getItem("token");
};

const loadCartFromLocalStorage = () => {
  const savedCart = localStorage.getItem("cartItems");
  return savedCart ? JSON.parse(savedCart) : [];
};

const saveCartToLocalStorage = (cartItems) => {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

export const fetchCart = createAsyncThunk("cart/fetchCart", async (_, thunkAPI) => {
  try {
    const token = getToken();
    const { data } = await axios.get("http://localhost:5000/api/cart/", {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });
    return data.items || data.cart?.items || [];
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "An error occurred");
  }
});

export const addToCart = createAsyncThunk("cart/addToCart", async (product, thunkAPI) => {
  try {
    const token = getToken();
    const { data } = await axios.post(
      "http://localhost:5000/api/cart/add",
      { product },
      {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      }
    );
    return data.items;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "An error occurred");
  }
});

export const removeFromCart = createAsyncThunk("cart/removeFromCart", async (itemId, thunkAPI) => {
  try {
    const token = getToken();
    const { data } = await axios.delete(`http://localhost:5000/api/cart/remove/${itemId}`, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });
    return data.items;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "An error occurred");
  }
});

export const increaseQuantity = createAsyncThunk("cart/increaseQuantity", async (itemId, thunkAPI) => {
  try {
    const token = getToken();
    const { data } = await axios.put(
      `http://localhost:5000/api/cart/increase/${itemId}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      }
    );
    return data.items;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "An error occurred");
  }
});

export const decreaseQuantity = createAsyncThunk("cart/decreaseQuantity", async (itemId, thunkAPI) => {
  try {
    const token = getToken();
    const { data } = await axios.put(
      `http://localhost:5000/api/cart/decrease/${itemId}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      }
    );
    return data.items;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "An error occurred");
  }
});

export const clearCart = createAsyncThunk("cart/clearCart", async (_, thunkAPI) => {
  try {
    const token = getToken();
    const { data } = await axios.delete("http://localhost:5000/api/cart/clear", {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });
    return data.items;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "An error occurred");
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: loadCartFromLocalStorage(),
    loading: false,
    error: null,
  },
  reducers: {
    clearLocalCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem("cartItems");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
        saveCartToLocalStorage(state.cartItems);
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cartItems = action.payload;
        saveCartToLocalStorage(state.cartItems);
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cartItems = action.payload;
        saveCartToLocalStorage(state.cartItems);
      })
      .addCase(increaseQuantity.fulfilled, (state, action) => {
        state.cartItems = action.payload;
        saveCartToLocalStorage(state.cartItems);
      })
      .addCase(decreaseQuantity.fulfilled, (state, action) => {
        state.cartItems = action.payload;
        saveCartToLocalStorage(state.cartItems);
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.cartItems = [];
        saveCartToLocalStorage(state.cartItems);
      });
  },
});

export const { clearLocalCart } = cartSlice.actions;
export default cartSlice.reducer;
