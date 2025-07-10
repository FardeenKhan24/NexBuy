import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaShoppingCart, FaRegUser, FaMoon } from "react-icons/fa";
import { TbShoppingBagSearch } from "react-icons/tb";
import { MdWbSunny } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../../features/themeSlice";
import { logoutSuccess } from "../../features/userSlice";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdOutlineClose } from "react-icons/md";
import { FaHeart } from "react-icons/fa6";
import LikedProductsModal from "../LikedProductsModal/LikedProductsModal";
import "./Navbar.css";

const Navbar = () => {
  const [profile, setProfile] = useState(false);
  const [hamburger, setHamburger] = useState(false);
  const [showLikedModal, setShowLikedModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();
  const likedProducts = useSelector((state) => state.product.likedProducts);
  const allProducts = useSelector((state) => state.product.products);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const user = useSelector((state) => state.user.user);

  const likedProductDetails = Array.isArray(allProducts)
    ? allProducts.filter((product) => likedProducts.includes(product._id))
    : [];

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  const handleLogout = () => {
    dispatch(logoutSuccess());
    navigate("/login");
  };

  const handleHam = () => {
    setHamburger(!hamburger);
  };

  return (
    <>
      <nav className="navbar-container">
        <div className="bag">
          <div className="ham" onClick={handleHam}>
            {hamburger ? <MdOutlineClose /> : <RxHamburgerMenu />}
          </div>
          <Link to="/">
            <TbShoppingBagSearch className="bag-icon" />
          </Link>
          <ul className={`navbar-title ${hamburger ? "mobile-menu" : ""}`}>
            <Link
              to="/"
              className={location.pathname === "/" ? "nav-active" : ""}
            >
              <li onClick={() => setHamburger(false)}>Home</li>
            </Link>
            <Link
              to="/about"
              className={location.pathname === "/about" ? "nav-active" : ""}
            >
              <li onClick={() => setHamburger(false)}>About</li>
            </Link>
            <Link
              to="/products"
              className={location.pathname === "/products" ? "nav-active" : ""}
            >
              <li onClick={() => setHamburger(false)}>Products</li>
            </Link>
          </ul>
        </div>

        <div>
          <ul className="navbar-icon">
            <li className="moon" onClick={handleThemeToggle}>
              {darkMode ? <FaMoon /> : <MdWbSunny />}
            </li>
            <li onClick={() => setShowLikedModal(true)}>
              <FaHeart
                className="hearts"
                style={{ color: likedProducts.length > 0 ? "red" : "" }}
              />
            </li>
            <Link to="/cart">
              <li className="cart-icon">
                <FaShoppingCart />
                {cartItems.length > 0 && (
                  <span className="cart-badge">{cartItems.length}</span>
                )}
              </li>
            </Link>
            <li onClick={() => setProfile(!profile)} className="profile-icon">
              {user ? (
                <img
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
                  alt="Profile"
                  className="nav-profile-pic"
                />
              ) : (
                <FaRegUser />
              )}
            </li>
          </ul>
        </div>

        {profile && (
          <div className="profile">
            {user ? (
              <>
                <li>
                  <Link to="/profile" onClick={() => setProfile(false)}>
                    My Profile
                  </Link>
                </li>
                <li>
                  <Link to="/order" onClick={() => setProfile(false)}>
                    My Orders
                  </Link>
                </li>
                <li
                  onClick={() => {
                    handleLogout();
                    setProfile(false);
                  }}
                >
                  <Link to="/login">Log Out</Link>
                </li>
              </>
            ) : (
              <li>
                <Link to="/login" onClick={() => setProfile(false)}>
                  Log In
                </Link>
              </li>
            )}
          </div>
        )}
      </nav>

      {showLikedModal && (
        <LikedProductsModal
          products={likedProductDetails}
          onClose={() => setShowLikedModal(false)}
          user={user}
        />
      )}
    </>
  );
};

export default Navbar;
