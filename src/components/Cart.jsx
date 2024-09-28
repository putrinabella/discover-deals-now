import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, clearCart } from "../features/cart/cartSlice";

const Cart = () => {
  const dispatch = useDispatch(); // Add useDispatch here
  const items = useSelector((state) => state.cart.items);

  // Calculate total quantity
  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <div>
      <h1>Your Cart</h1>
      <h2>Total Items: {totalQuantity}</h2>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        items.map((item) => (
          <div key={item.id}>
            <h3>{item.title}</h3>
            <p>Quantity: {item.quantity}</p>
            {/* Add functionality to remove item */}
            <button onClick={() => dispatch(removeItem(item))}>Remove</button>
          </div>
        ))
      )}
      <button onClick={() => dispatch(clearCart())}>Clear Cart</button>{" "}
      {/* Clear Cart button */}
    </div>
  );
};

export default Cart;
