import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  setFilter,
  setPriceFilter,
  setSearchQuery,
  applyFilter,
  toggleLike
} from "../../features/productSliceApi.js";
import { addToCart, fetchCart } from "../../features/cartSlice";
import { FaSearch } from "react-icons/fa";
import { TbCategoryPlus } from "react-icons/tb";
import { FaHeart } from "react-icons/fa6";
import Sorry from "../../assets/Sorry.png";
import { Link } from "react-router-dom";
import "./Product.css";

const Product = () => {
  const dispatch = useDispatch();
  const [alertMessage, setAlertMessage] = useState("");

  const { filteredProducts, filter, priceFilter, searchQuery, loading, error } =
    useSelector((state) => state.product);
  const cartItems = useSelector((state) => Array.isArray(state.cart.cartItems) ? state.cart.cartItems : []);
  const likedProducts = useSelector((state) => state.product.likedProducts);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCart());
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
    "Specs"
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
    if (!Array.isArray(cartItems)) {
      console.error("cartItems is not an array", cartItems);
      return;
    }

    if (!product || !product._id) {
      console.error("Product is missing _id", product);
      return;
    }

    const isProductInCart = cartItems.some((item) => item.product._id === product._id);

    if (!isProductInCart) {
      dispatch(addToCart(product))  
        .unwrap()
        .then(() => {
          setAlertMessage(`${product.title} added successfully ✅`);
          dispatch(fetchCart());
        })
        .catch((error) => {
          setAlertMessage(error || "Failed to add to cart ⚠");
        });
    } else {
      setAlertMessage(`${product.title} is already in the cart ⚠`);
    }

    setTimeout(() => setAlertMessage(""), 3000);
  };

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
        <p>Loading...</p>
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
        <ul className="filter-items">
          {categories.map((category) => (
            <li
              key={category}
              onClick={() => handleFilterChange(category)}
            >
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
                    style={{ color: likedProducts.includes(product._id) ? "red" : "gray" }}
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
                  <button
                    className="add-btn"
                    onClick={() => handleAddToCart(product)}
                  >
                    ADD TO CART
                  </button>
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
