import CartItem from "../components/Cart/CartItem";
import CartSummary from "../components/Cart/CartSummary";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateQuantity } from "../state/cartSlice";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const cartTotal = useSelector((state) => state.cart.total);
  const dispatch = useDispatch();

  const handleRemove = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const handleIncrease = (itemId) => {
    dispatch(updateQuantity({ itemId, operation: "increase" }));
  };

  const handleDecrease = (itemId) => {
    dispatch(updateQuantity({ itemId, operation: "decrease" }));
  };

  return (
    <div
      className={
        cartItems.length === 0
          ? "min-h-[500px] flex justify-center items-center"
          : ""
      }
    >
      {cartItems.length === 0 ? (
        <p className="text-4xl font-bold">Your cart is empty!</p>
      ) : (
        <div className="container mx-auto p-4 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="w-full md:w-2/3">
            <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
            <ul className="space-y-4">
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onRemove={handleRemove}
                  onIncrease={handleIncrease}
                  onDecrease={handleDecrease}
                />
              ))}
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <CartSummary cartItems={cartItems} total={cartTotal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
