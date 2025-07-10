import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const token = localStorage.getItem("token");

export const fetchProducts = createAsyncThunk("product/fetchProducts", async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/product`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
});

const initialState = {
  products: [],
  filteredProducts: [],
  filter: "All",
  priceFilter: "default",
  searchQuery: "",
  likedProducts: JSON.parse(localStorage.getItem("likedProducts")) || [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setPriceFilter: (state, action) => {
      state.priceFilter = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    toggleLike: (state, action) => {
      const productId = action.payload;
      if (state.likedProducts.includes(productId)) {
        state.likedProducts = state.likedProducts.filter(id => id !== productId);
      } else {
        state.likedProducts.push(productId);
      }

      localStorage.setItem("likedProducts", JSON.stringify(state.likedProducts));
    },
    applyFilter: (state) => {
      let filtered = state.products;

      if (state.filter !== "All") {
        filtered = filtered.filter(
          (product) => product.category?.toLowerCase() === state.filter.toLowerCase()
        );
      }

      if (state.priceFilter === "highest") {
        filtered = [...filtered].sort((a, b) => b.price - a.price);
      } else if (state.priceFilter === "lowest") {
        filtered = [...filtered].sort((a, b) => a.price - b.price);
      }

      if (state.searchQuery) {
        filtered = filtered.filter((product) =>
          product.title.toLowerCase().startsWith(state.searchQuery.toLowerCase())
        );
      }

      state.filteredProducts = filtered;
    },
    clearFilter: (state) => {
      state.filter = "All";
      state.priceFilter = "default";
      state.searchQuery = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.filteredProducts = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  setFilter,
  setPriceFilter,
  setSearchQuery,
  applyFilter,
  toggleLike,
  clearFilter,
} = productSlice.actions;

export default productSlice.reducer;
