import React from "react";
import CartButton from "./CartButton";

const QuantityControl = ({ quantity, handleQuantityChange, product }) => {
  return (
    <div className="quantity-control mt-5">
      <div className="flex items-center mb-5">
        {/* Button to decrease quantity */}
        <button
          className="btn btn-outline btn-primary"
          onClick={() => handleQuantityChange(quantity - 1)}
        >
          -
        </button>
        {/* Input field for quantity */}
        <input
          type="number"
          value={quantity}
          onChange={(event) =>
            handleQuantityChange(parseInt(event.target.value))
          }
          min="1"
          className="input input-bordered w-16 text-center mx-2"
        />
        {/* Button to increase quantity */}
        <button
          className="btn btn-outline btn-primary"
          onClick={() => handleQuantityChange(quantity + 1)}
        >
          +
        </button>
        <div className="ml-3">
          <CartButton item={product} quantity={quantity} />
        </div>
      </div>
    </div>
  );
};

export default QuantityControl;
