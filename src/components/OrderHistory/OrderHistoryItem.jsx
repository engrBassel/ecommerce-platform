const OrderHistoryItem = ({
  order: { id, orderDate = "2024-01-01", products, total },
}) => {
  return (
    <div className="border p-4 rounded-lg shadow-sm bg-light-green mb-4">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h3 className="text-lg font-bold">Order #{id}</h3>
          <p className="text-sm text-gray-500">Placed on: {orderDate}</p>
        </div>
        <div>
          <p className="text-lg font-semibold">Total: ${(+total).toFixed(2)}</p>
        </div>
      </div>

      <div className="space-y-2">
        {products.map((item) => (
          <div key={item.id} className="flex justify-between items-center">
            <div className="text-sm">
              <p>{item.title}</p>
              <p className="text-gray-500">Quantity: {item.quantity}</p>
            </div>
            <div className="text-sm font-semibold">
              <p>${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistoryItem;
