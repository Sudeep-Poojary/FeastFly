import FoodImage from "./FoodImage";
import { itemPrice } from "../utils/cartSlice";

// Interim cart rows for the new { info, qty } cart lines (redesigned in Step 5).
const CartItem = ({ items }) => {
  return (
    <div>
      {items.map(({ info, qty }) => (
        <div
          data-testid="cartItems"
          key={info.id}
          className="p-2 m-2 border-gray-200 border-b-1 text-left flex justify-between"
        >
          <div className="w-9/12">
            <div className="py-2">
              <span>{info.name} </span>
              <span>
                × {qty} - ₹{itemPrice(info) * qty}
              </span>
            </div>
            <p className="text-xs">{info.description}</p>
          </div>

          <div className="w-3/12 p-4">
            <FoodImage
              label={info.name}
              hints={[info.category]}
              className="w-full h-40 rounded-lg"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartItem;
