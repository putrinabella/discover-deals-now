import Cart from "../components/Cart";

const CartPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <Cart />
      </div>
    </div>
  );
};

export default CartPage;
