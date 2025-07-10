import React, { useEffect} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import {Routes,Route,useLocation} from 'react-router-dom';
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
import Order from './components/Order/Order.jsx';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes.jsx';
import { fetchProducts } from '../src/features/productSliceApi.js';
import { fetchCart } from '../src/features/cartSlice.js';
import PublicRoutes from './components/PublicRoutes/PublicRoutes.jsx';

const App = () => {
  const dispatch = useDispatch()
  const darkMode = useSelector((state) => state.theme.darkMode);
  const location = useLocation();

  const hide = location.pathname === '/login' || location.pathname === '/register';

  useEffect(() => {
  document.body.className = darkMode ? 'dark-mode' : 'light-mode';

  if (localStorage.getItem('token')) {
    dispatch(fetchCart());
  }

  dispatch(fetchProducts());
}, [dispatch, darkMode]);

  return (
    <div className="App">
      {!hide && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<PublicRoutes><Login /></PublicRoutes>} />
          <Route path="/register" element={<PublicRoutes><Register /></PublicRoutes>} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/products" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/buy" element={
            <ProtectedRoutes>
              <BuyNow />
            </ProtectedRoutes>
          } />
          <Route path="/profile" element={
            <ProtectedRoutes>
              <Profile />
            </ProtectedRoutes>
          } />
          <Route path="/order" element={
            <ProtectedRoutes>
              <Order />
            </ProtectedRoutes>
          } />
        </Routes>
      </main>
      {!hide && <Footer />}
    </div>
  );
};

export default App;
