import { Link } from "react-router-dom";
import Button from "../UI/Button";

const CartSummary = ({ cartItems, total }) => {
  return (
    <div className="p-4 grid gap-4 bg-light-green rounded-lg">
      <h2 className="text-2xl font-bold">Order Summary</h2>
      <ul className="grid gap-y-4">
        {cartItems.map((item) => (
          <li key={item.id} className="flex justify-between">
            <span>
              {item.title} x {item.quantity}
            </span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </li>
        ))}
      </ul>
      <h3 className="text-xl font-semibold text-end">Total: ${total}</h3>
      <Link to="/ecommerce-platform/checkout">
        <Button className="w-full">Proceed to Checkout</Button>
      </Link>
    </div>
  );
};

export default CartSummary;
