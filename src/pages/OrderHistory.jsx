import { useSelector } from "react-redux";
import Loader from "../components/UI/Loader";
import OrderHistoryItem from "../components/OrderHistory/OrderHistoryItem";

const OrderHistory = () => {
  const orders = useSelector((state) => state.orderHistory.orders);
  const loading = useSelector((state) => state.orderHistory.loading);
  const error = useSelector((state) => state.orderHistory.error);

  if (loading) return <Loader />;

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Order History</h2>
      {orders.map((order) => (
        <OrderHistoryItem key={order.id} order={order} />
      ))}
    </div>
  );
};

export default OrderHistory;
