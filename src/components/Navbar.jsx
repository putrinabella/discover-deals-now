import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  // Access cart items from Redux state
  const cartItems = useSelector((state) => state.cart.items);
  // Calculate total quantity of items in the cart
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  // Calculate subtotal price
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Format subtotal as currency
  const formattedSubtotal = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(subtotal); // Format to dollar currency

  useEffect(() => {
    console.log("UseEffect yang harus jalan di awal");
  }, []);

  function handleCartRedirect() {
    console.log("mau pindah");
    navigate("/cart");
  }

  const handleLogoutRedirect = () => {
    console.log("Logging out...");
    // Remove the specific item from local storage
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  const handleHomeRedirect = () => {
    navigate("/");
  };

  const token = localStorage.getItem("token");

  return (
    <div className="navbar bg-SageGreen fixed top-0 left-0 right-0 z-50 shadow-lg">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl text-white">Discover Deals Now</a>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div
            className="btn btn-ghost btn-circle"
            aria-label="Home"
            role="button"
            onClick={handleHomeRedirect}
          >
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
            </div>
          </div>
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
              <span className="badge badge-sm indicator-item">
                {totalQuantity}
              </span>
            </div>
          </div>
          <div
            tabIndex={0}
            className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow"
          >
            <div className="card-body">
              <span className="text-lg font-bold">{totalQuantity} Items</span>
              <span className="text-info">Subtotal: {formattedSubtotal}</span>
              <div className="card-actions">
                <button
                  onClick={handleCartRedirect}
                  className="btn btn-primary btn-block"
                >
                  View cart
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            {token ? ( // Conditional rendering based on token
              <li>
                <a onClick={handleLogoutRedirect}>Logout</a>
              </li>
            ) : (
              <li>
                <a onClick={handleLoginRedirect}>Login</a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
