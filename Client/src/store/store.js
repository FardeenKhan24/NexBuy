import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cartSlice";
import productReducer from "../features/productSliceApi";
import userReducer from "../features/userSlice"
import themeReducer from '../features/themeSlice';
import orderReducer from "../features/orderSlice";

const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    user: userReducer,
    order: orderReducer,
    theme: themeReducer
  },
});

export default store;
