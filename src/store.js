import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./state/productsSlice";
import cartSlice from "./state/cartSlice";
import orderHistorySlice from "./state/orderHistorySlice";
import categoriesSlice from "./state/categoriesSlice";

const store = configureStore({
  reducer: {
    products: productsSlice,
    cart: cartSlice,
    orderHistory: orderHistorySlice,
    categories: categoriesSlice,
  },
});

export default store;
