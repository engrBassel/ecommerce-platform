import { Link, NavLink } from "react-router-dom";
import { ShoppingCartIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useSelector } from "react-redux";

const Header = () => {
  const cartItems = useSelector((state) => state.cart.items);
  return (
    <header className="bg-dark-green text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link
          to="/ecommerce-platform"
          className="text-2xl font-bold hover:text-light-green"
        >
          E-Commerce Platform
        </Link>
        <nav className="flex items-center space-x-4">
          <div className="relative">
            <NavLink
              to="/ecommerce-platform/cart"
              className={({ isActive }) =>
                isActive
                  ? "text-light-green"
                  : "text-white hover:text-light-green"
              }
            >
              <ShoppingCartIcon className="h-8 w-8" />
            </NavLink>
            {cartItems.length > 0 && (
              <span className="flex justify-center items-center h-5 w-5 rounded-full bg-red-500 absolute top-[-5px] right-[-5px]">
                {cartItems.length}
              </span>
            )}
          </div>
          <NavLink
            to="/ecommerce-platform/order-history"
            className={({ isActive }) =>
              isActive
                ? "text-light-green"
                : "text-white hover:text-light-green"
            }
          >
            <UserCircleIcon className="h-8 w-8" />
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
