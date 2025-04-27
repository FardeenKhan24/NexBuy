import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route, useLocation ,useNavigate} from 'react-router-dom';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Product from './components/Product/Product';
import Cart from './components/Cart/Cart';
import Footer from './components/Footer/Footer';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Profile from './components/Profile/Profile';
import ProductDetails from './components/ProductDetails/ProductDetails.jsx';
import BuyNow from './components/BuyNow/BuyNow.jsx';
import About from './components/About/About.jsx';
import { fetchProducts } from '../src/features/productSliceApi.js';
import { fetchCart } from '../src/features/cartSlice.js';

const AppContent = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      if (window.location.pathname === '/login' || window.location.pathname === '/register') {
        return;  
      } else {
        navigate("/login");
      }
    } 
  }, [navigate]);

  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : 'light-mode';
  }, [darkMode]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    const user = localStorage.getItem("user")
    if (user) {
      dispatch(fetchCart());
    }
  }, [dispatch]);

  const hide = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className='App'>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/buy" element={<BuyNow />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </main>
      {!hide && <Footer />}
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
