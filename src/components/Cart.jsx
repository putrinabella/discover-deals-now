import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductsAPI } from "../api/api-product"; // API call for fetching product data
import {
  removeItem,
  clearCart,
  updateQuantity,
} from "../features/cart/cartSlice"; // Redux actions for cart management
import {
  setProducts,
  setLoading,
  setError,
  reduceStock,
} from "../features/product/productSlice"; // Redux actions for products management
import { useNavigate } from "react-router-dom"; // Hook for navigation

const Cart = () => {
  const dispatch = useDispatch(); // Dispatches actions to the Redux store
  const navigate = useNavigate(); // Used to navigate between pages
  const items = useSelector((state) => state.cart.items); // Retrieves cart items from Redux state

  const {
    items: products, // Retrieves product list from Redux state
    loading,
    error,
    stock, // Retrieves stock information from Redux state
  } = useSelector((state) => state.products);

  // Calculate total quantity of items in the cart
  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);

  // Fetch product data when the component is mounted
  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoading(true)); // Set loading state while fetching
      try {
        const fetchedProducts = await fetchProductsAPI(); // Call API to get products
        dispatch(setProducts(fetchedProducts)); // Store fetched products in Redux state
      } catch (err) {
        dispatch(setError("Error fetching products")); // Set error state if API call fails
      } finally {
        dispatch(setLoading(false)); // Remove loading state once fetching is done
      }
    };

    fetchData();
  }, [dispatch]); // Empty dependency array means this effect runs only once on mount

  // Show loading or error message based on state
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  // Filter products that are in the cart
  const cartProducts = products.filter((product) =>
    items.find((item) => item.id === product.id)
  );

  // Merge cart items with corresponding product data from product list
  const mergedCartProducts = cartProducts.map((product) => {
    const cartItem = items.find((item) => item.id === product.id);
    return {
      ...product,
      quantity: cartItem ? cartItem.quantity : 0, // Add the quantity from cart to the product object
    };
  });

  // Calculate the total price for all items in the cart
  const totalPrice = mergedCartProducts.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  // Handle changing the quantity of an item in the cart
  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity >= 0) {
      dispatch(updateQuantity({ id: productId, quantity: newQuantity })); // Update quantity in Redux state
    }
  };

  // Handle checkout process
  const handleCheckout = () => {
    mergedCartProducts.forEach((product) => {
      const availableStock = stock[product.id] || 0; // Get available stock for the product
      if (product.quantity <= availableStock) {
        // If enough stock, reduce it
        dispatch(
          reduceStock({ productId: product.id, quantity: product.quantity })
        );
      }
    });

    dispatch(clearCart()); // Clear the cart after checkout

    navigate("/"); // Redirect to home page after checkout
  };

  return (
    <div>
      <h1>Your Cart</h1>
      <h2>Total Items: {totalQuantity}</h2>

      {/* Show empty cart message or render cart table */}
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="overflow-x-auto m-3 m-md-20">
            <table className="table">
              <thead>
                <tr>
                  <th></th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {mergedCartProducts.map((product) => {
                  const availableStock = stock[product.id]; // Get stock availability
                  const isStockAvailable = product.quantity <= availableStock; // Check if requested quantity is available
                  return (
                    <tr key={product.id}>
                      <th>
                        <label>
                          <input type="checkbox" className="checkbox" />
                        </label>
                      </th>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar h-16">
                            <img
                              src={product.image}
                              alt={`Gambar produk ${product.title}`}
                            />
                          </div>
                          <div>
                            <div className="font-bold">{product.title}</div>
                            <div className="text-sm opacity-50">
                              {product.category}
                            </div>
                            {!isStockAvailable && (
                              <div className="text-red-500 text-sm">
                                Stock not available
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="badge badge-ghost badge-sm">
                          ${product.price}
                        </span>
                      </td>
                      <td>
                        <div className="flex items-center">
                          {/* Decrease quantity button */}
                          <button
                            className="btn btn-outline btn-primary"
                            onClick={() =>
                              handleQuantityChange(
                                product.id,
                                product.quantity - 1
                              )
                            }
                          >
                            -
                          </button>
                          {/* Input field for quantity */}
                          <input
                            type="number"
                            value={product.quantity}
                            onChange={(event) =>
                              handleQuantityChange(
                                product.id,
                                parseInt(event.target.value)
                              )
                            }
                            min="1"
                            className="input input-bordered w-16 text-center mx-2"
                          />
                          {/* Increase quantity button */}
                          <button
                            className="btn btn-outline btn-primary"
                            onClick={() =>
                              handleQuantityChange(
                                product.id,
                                product.quantity + 1
                              )
                            }
                          >
                            +
                          </button>
                        </div>
                      </td>
                      {/* Display the total price for the current product */}
                      <td>${(product.price * product.quantity).toFixed(2)}</td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr>
                  <td></td>
                  <td colSpan={3}>Total</td>
                  <td>${totalPrice.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Checkout button */}
          <div className="mr-40 flex justify-end">
            <button className="btn" onClick={handleCheckout}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              Checkout!
            </button>
          </div>

          {/* List cart items with remove button */}
          {items.map((item) => (
            <div key={item.id}>
              <h3>{item.title}</h3>
              <p>Quantity: {item.quantity}</p>
              <button onClick={() => dispatch(removeItem(item))}>Remove</button>
            </div>
          ))}

          {/* Button to clear the entire cart */}
          <button onClick={() => dispatch(clearCart())}>Clear Cart</button>
        </>
      )}
    </div>
  );
};

export default Cart;
