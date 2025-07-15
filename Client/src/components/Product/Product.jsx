import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  setFilter,
  setPriceFilter,
  setSearchQuery,
  applyFilter,
  toggleLike,
  clearFilter,
} from "../../features/productSliceApi.js";
import { addToCart } from "../../features/cartSlice";
import { FaSearch } from "react-icons/fa";
import { TbCategoryPlus } from "react-icons/tb";
import { FaHeart } from "react-icons/fa6";
import Sorry from "../../assets/Sorry.png";
import { Link } from "react-router-dom";
import "./Product.css";
import { increaseQuantity, decreaseQuantity } from "../../features/cartSlice";

const Product = () => {
  const dispatch = useDispatch();
  const [alertMessage, setAlertMessage] = useState("");

  const { filteredProducts, filter, priceFilter, searchQuery, loading, error } =
    useSelector((state) => state.product);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const likedProducts = useSelector((state) => state.product.likedProducts);
  const [showServerDelayMsg, setShowServerDelayMsg] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (loading) {
        setShowServerDelayMsg(true);
      }
    }, 5000);

    return () => clearTimeout(timeout); 
  }, [loading]);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(applyFilter());
  }, [filter, priceFilter, searchQuery, dispatch]);

  const categories = [
    "All",
    "Clothes",
    "Electronics",
    "Furniture",
    "Shoes",
    "Miscellaneous",
    "Specs",
  ];

  const handleFilterChange = (category) => {
    dispatch(setFilter(category));
  };

  const handlePriceChange = (e) => {
    dispatch(setPriceFilter(e.target.value));
  };

  const handleSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleAddToCart = (product) => {
    const token = localStorage.getItem("token");

    if (!token) {
      setAlertMessage("Please login to add to cart ⚠️");
      setTimeout(() => setAlertMessage(""), 3000);
      return;
    }

    dispatch(addToCart(product._id));
    setAlertMessage(`${product.title} added successfully ✅`);

    setTimeout(() => setAlertMessage(""), 3000);
  };

  if (loading) {
    return (
      <div className="loader-container">
        <div className="cube-loader">
          <div className="cube cube1"></div>
          <div className="cube cube2"></div>
          <div className="cube cube3"></div>
          <div className="cube cube4"></div>
        </div>
        <p>Loading...</p>
        {showServerDelayMsg && (
          <p>
            ⚠️ Server may take 30 to 40 seconds to load first time.
          </p>
        )}
      </div>
    );
  }

  if (error) {
    return <p className="error-message">Error: {error}</p>;
  }

  const handleToggleLike = (productId) => {
    dispatch(toggleLike(productId));
  };

  return (
    <div className="main-container">
      {alertMessage && (
        <div className="alert">
          <p>{alertMessage}</p>
        </div>
      )}

      <div className="filter-container">
        <div className="category-container">
          <TbCategoryPlus className="category-icon" />
          <p>Categories</p>
        </div>
        <p className="clear" onClick={() => dispatch(clearFilter())}>
          Clear Filter
        </p>
        <ul className="filter-items">
          {categories.map((category) => (
            <li key={category} onClick={() => handleFilterChange(category)}>
              {category} {filter === category && "✔"}
            </li>
          ))}
        </ul>
      </div>

      <div className="parent-container">
        <div className="child-container">
          <div className="category-container">
            <TbCategoryPlus className="category-icon" />
            <p>Categories</p>
          </div>

          <select
            className="filter-dropdown"
            value={filter}
            onChange={(e) => handleFilterChange(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <div className="sort-container">
            <select
              id="sort-select"
              value={priceFilter}
              onChange={handlePriceChange}
            >
              <option value="default">Sort By Price:</option>
              <option value="highest">Highest Price</option>
              <option value="lowest">Lowest Price</option>
            </select>
          </div>

          <div className="search-cont">
            <FaSearch className="search-icon" />
            <input
              type="search"
              placeholder="Search Products"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        <div className="product-container">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product._id} className="grid-container">
                <div className="image-container">
                  <img src={product.image} alt={product.title} />
                  <div
                    className="heart"
                    onClick={() => handleToggleLike(product._id)}
                    style={{
                      color: likedProducts.includes(product._id)
                        ? "red"
                        : "gray",
                    }}
                  >
                    <FaHeart />
                  </div>
                </div>

                <div className="detail-container">
                  <h2 className="product-title">{product.title}</h2>
                  <p className="product-price">Price: Rs {product.price}</p>
                </div>

                <div className="add">
                  <span className="more">
                    <Link to={`/product/${product._id}`} state={{ product }}>
                      MORE DETAILS
                    </Link>
                  </span>

                  {(() => {
                    const token = localStorage.getItem("token");
                    const cartItem = cartItems.find(
                      (item) => item.product._id === product._id
                    );

                    if (!token) {
                      return (
                        <button
                          className="add-btn"
                          onClick={() => handleAddToCart(product)}
                        >
                          ADD TO CART
                        </button>
                      );
                    }

                    if (cartItem) {
                      return (
                        <div className="qty-controls">
                          <button
                            onClick={() =>
                              dispatch(decreaseQuantity(cartItem._id))
                            }
                          >
                            -
                          </button>
                          <span>{cartItem.quantity}</span>
                          <button
                            onClick={() =>
                              dispatch(increaseQuantity(cartItem._id))
                            }
                          >
                            +
                          </button>
                        </div>
                      );
                    }

                    return (
                      <button
                        className="add-btn"
                        onClick={() => handleAddToCart(product)}
                      >
                        ADD TO CART
                      </button>
                    );
                  })()}
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <img
                src={Sorry}
                alt="No products found"
                className="sorry-image"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
