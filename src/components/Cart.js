import { useDispatch, useSelector } from "react-redux";
import ItemList from "./ItemList";
import { clearCart } from "../utils/cartSlice";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  console.log(cartItems);

  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="text-center m-5 p-4">
      <div className="flex justify-between w-6/12 m-auto">
        <h1 className="mx-4 text-4xl font-bold">Cart</h1>
        <button
          className="mx-6 py-3 px-4 bg-red-400 text-white rounded-lg"
          onClick={handleClearCart}
        >
          Clear Cart
        </button>
      </div>

      <div className="w-6/12 m-auto">
        {cartItems.length === 0 && (
          <h1 className="m-4 p-4 text-xl font-bold">Your Cart is Empty!!!</h1>
        )}
        <ItemList items={cartItems} />
      </div>
    </div>
  );
};

export default Cart;
