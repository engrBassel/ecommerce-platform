const CartItem = ({ item, onRemove, onIncrease, onDecrease }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-y-4 gap-x-2 p-4 border border-dark-green rounded">
      <div>
        <h2 className="text-xl font-semibold">{item.title}</h2>
        <p>Unit Price: ${item.price.toFixed(2)}</p>
        <p>Quantity: {item.quantity}</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => {
            if (item.quantity > 1) {
              onDecrease(item.id);
            }
          }}
          className="px-3 py-1 bg-gray-200 rounded text-gray-700 hover:bg-gray-300"
        >
          -
        </button>
        <button
          onClick={() => onIncrease(item.id)}
          className="px-3 py-1 bg-gray-200 rounded text-gray-700 hover:bg-gray-300"
        >
          +
        </button>
        <button
          onClick={() => onRemove(item.id)}
          className="py-2 px-4 rounded transition-colors text-white bg-red-500 hover:bg-white hover:text-red-500"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
