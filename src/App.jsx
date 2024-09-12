import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchProducts } from "./state/productsSlice";
import Header from "./components/UI/Header";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderHistory from "./pages/OrderHistory";
import { useEffect } from "react";
import { fetchOrderHistory } from "./state/orderHistorySlice";
import { fetchCategories } from "./state/categoriesSlice";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts());
    dispatch(fetchOrderHistory());
  }, [dispatch]);

  return (
    <Router>
      <div className="bg-light-cream min-h-svh text-dark-green">
        <Header />
        <Routes>
          <Route path="/ecommerce-platform" element={<Home />} />
          <Route path="/ecommerce-platform/cart" element={<Cart />} />
          <Route path="/ecommerce-platform/checkout" element={<Checkout />} />
          <Route
            path="/ecommerce-platform/order-history"
            element={<OrderHistory />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
