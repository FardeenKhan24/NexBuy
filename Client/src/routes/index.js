import Home from "../components/Home/Home";
import About from "../components/About/About";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import Product from "../components/Product/Product";
import ProductDetails from "../components/ProductDetails/ProductDetails";
import Cart from "../components/Cart/Cart";
import BuyNow from "../components/BuyNow/BuyNow";
import Profile from "../components/Profile/Profile";
import Order from "../components/Order/Order";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import ProtectedRoutes from "../components/ProtectedRoutes/ProtectedRoutes";
import PublicRoutes from "../components/PublicRoutes/PublicRoutes";
import { fetchCart } from "../features/cartSlice";
import { fetchProducts } from "../features/productSliceApi";

export {
  Home,
  About,
  Login,
  Register,
  Product,
  ProductDetails,
  Cart,
  BuyNow,
  Profile,
  Order,
  Navbar,
  Footer,
  ProtectedRoutes,
  PublicRoutes,
  fetchCart,
  fetchProducts
};
