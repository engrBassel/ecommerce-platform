import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loadFromLocal, saveToLocal } from "../utils/localStorage";

const initialState = {
  array: [],
  loading: true,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.array.unshift(action.payload);

      const existingProducts = loadFromLocal("products") || [];
      const updatedProducts = [action.payload, ...existingProducts];
      saveToLocal("products", updatedProducts);
    },
    editProduct: (state, action) => {
      const updatedProduct = action.payload;
      const index = state.array.findIndex((p) => p.id === updatedProduct.id);
      if (index !== -1) {
        state.array[index] = updatedProduct;

        if ("inLocal" in updatedProduct) {
          let localProducts = loadFromLocal("products") || [];
          const indx = localProducts.findIndex(
            (p) => p.id === updatedProduct.id
          );
          localProducts[indx] = updatedProduct;
          saveToLocal("products", localProducts);
        }
      }
    },
    deleteProduct: (state, action) => {
      const productId = action.payload;
      state.array = state.array.filter((p) => p.id !== productId);

      let localProducts = loadFromLocal("products") || [];
      localProducts = localProducts.filter((p) => p.id !== productId);

      if (localProducts.length === 0) {
        localStorage.removeItem("products");
      } else {
        saveToLocal("products", localProducts);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.array = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();

      const apiProducts = data;

      const localProducts = loadFromLocal("products") || [];

      const combinedProducts = [...localProducts, ...apiProducts];

      return combinedProducts;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const { addProduct, editProduct, deleteProduct } = productsSlice.actions;
export default productsSlice.reducer;
