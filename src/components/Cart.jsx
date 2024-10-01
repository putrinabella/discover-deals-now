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

import emptyCartImage from "../assets/emptyCart.svg";

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

  // Handle go home
  const handleHomeRedirect = () => {
    navigate("/");
  };

  return (
    <div>
      {/* <h1>Your Cart</h1>
      <h2>Total Items: {totalQuantity}</h2> */}

      {/* Show empty cart message or render cart table */}
      {items.length === 0 ? (
        <div className="flex-grow flex items-center justify-center">
          <div className="flex flex-col items-center">
            <h1 className="text-4xl font-bold text-center mt-10">
              <span className="bg-yellow-300">Your Cart is Empty!</span>
            </h1>
            <button
              onClick={handleHomeRedirect}
              className="btn btn-primary m-5"
            >
              Go Shopping!
            </button>
            <img src={emptyCartImage} className="mt-5" alt="Empty Cart" />
          </div>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto m-10 m-md-20">
            <table className="table text-center bg-base-100">
              <thead className="text-lg">
                <tr>
                  <th></th>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="text-lg">
                {mergedCartProducts.map((product) => {
                  const availableStock = stock[product.id];
                  const isStockAvailable = product.quantity <= availableStock;
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
                            <div className="text-sm opacity-50 text-left">
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
                      <td className="text-center align-middle">
                        <div className="flex items-center justify-center">
                          <button
                            className="btn btn-outline border-yellow-500"
                            onClick={() =>
                              handleQuantityChange(
                                product.id,
                                product.quantity - 1
                              )
                            }
                          >
                            -
                          </button>
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
                            className="input input-bordered w-16 text-center mx-2 border-yellow-500 "
                          />
                          <button
                            className="btn btn-outline border-yellow-500 "
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
                      <td>${product.price}</td>
                      <td>${(product.price * product.quantity).toFixed(2)}</td>
                      <td>
                        <button
                          className="btn btn-outline btn-danger"
                          onClick={() =>
                            dispatch(removeItem({ id: product.id }))
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                            />
                          </svg>
                          Delete Items
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot className="text-lg">
                <tr>
                  <td></td>
                  <td colSpan={3}>Total</td>
                  <td>${totalPrice.toFixed(2)}</td>
                  <td className="text-right">
                    {/* Checkout button */}
                    <div className="flex justify-center">
                      <button
                        className="btn btn-outline btn-danger"
                        onClick={handleCheckout}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3"
                          />
                        </svg>
                        Checkout!
                      </button>
                    </div>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          {/* Button to clear the entire cart */}
          {/* <button onClick={() => dispatch(clearCart())}>Clear Cart</button> */}
        </>
      )}
    </div>
  );
};

export default Cart;
