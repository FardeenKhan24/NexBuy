import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cartSlice";
import productReducer from "../features/productSliceApi";
import userReducer from "../features/userSlice"
import themeReducer from '../features/themeSlice';

const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    user: userReducer,
    theme: themeReducer
  },
});

export default store;
