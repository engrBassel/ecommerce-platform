import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loadFromLocal, saveToLocal } from "../utils/localStorage";

const initialState = {
  orders: [],
  loading: true,
  error: null,
};

const orderHistorySlice = createSlice({
  name: "orderHistory",
  initialState,
  reducers: {
    addOrder: (state, action) => {
      state.orders.unshift(action.payload);

      const existingOrders = loadFromLocal("orderHistory") || [];
      const updatedOrders = [action.payload, ...existingOrders];
      saveToLocal("orderHistory", updatedOrders);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderHistory.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.loading = false;
      })
      .addCase(fetchOrderHistory.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const fetchOrderHistory = createAsyncThunk(
  "orderHistory/fetchOrderHistory",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("https://dummyjson.com/carts?limit=5");

      if (!response.ok) {
        throw new Error("Failed to fetch Order History");
      }

      const data = await response.json();

      const apiOrders = data.carts;

      const localOrders = loadFromLocal("orderHistory") || [];

      const combinedOrders = [...localOrders, ...apiOrders];

      return combinedOrders;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const { addOrder } = orderHistorySlice.actions;
export default orderHistorySlice.reducer;
