import { createSlice } from "@reduxjs/toolkit";
import { loadFromLocal, saveToLocal } from "../utils/localStorage";

const initialState = {
  items: loadFromLocal("cart")?.items || [],
  total: +loadFromLocal("cart")?.total || 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === newItem.id
      );

      if (existingItemIndex >= 0) {
        state.items[existingItemIndex].quantity += 1;
      } else {
        state.items.push({ ...newItem, quantity: 1 });
      }

      state.total = calculateTotal(state.items);

      saveToLocal("cart", { items: state.items, total: state.total });
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);

      if (state.items.length === 0) {
        state.total = 0;
        localStorage.removeItem("cart");
      } else {
        state.total = calculateTotal(state.items);
        saveToLocal("cart", { items: state.items, total: state.total });
      }
    },
    updateQuantity: (state, action) => {
      const { itemId, operation } = action.payload;
      const itemIndx = state.items.findIndex((i) => i.id === itemId);
      state.items[itemIndx].quantity +=
        operation === "increase" ? 1 : operation === "decrease" ? -1 : 0;

      state.total = calculateTotal(state.items);

      saveToLocal("cart", { items: state.items, total: state.total });
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      localStorage.removeItem("cart");
    },
  },
});

const calculateTotal = (items) => {
  return items
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);
};

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
