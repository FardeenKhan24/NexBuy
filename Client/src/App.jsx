import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Routes, Route, useLocation } from "react-router-dom";
import {Home,About,Login,Register,Product,ProductDetails,Cart,BuyNow,Profile,Order,Navbar,Footer,
  ProtectedRoutes,
  PublicRoutes,
} from "./routes";

const App = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const location = useLocation();
  const hide = location.pathname === "/login" || location.pathname === "/register";

  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "light-mode";
  }, [darkMode]);

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
          <Route path="/buy" element={<ProtectedRoutes><BuyNow /></ProtectedRoutes>} />
          <Route path="/profile" element={<ProtectedRoutes><Profile /></ProtectedRoutes>} />
          <Route path="/order" element={<Order />} />
        </Routes>
      </main>
      {!hide && <Footer />}
    </div>
  );
};

export default App;
