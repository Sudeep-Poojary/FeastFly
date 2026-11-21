import { useDispatch } from "react-redux";
import VegIcon from "./ui/VegIcon";
import { CloseIcon } from "./ui/Icons";
import AddToCartButton from "./menu/AddToCartButton";
import { itemPrice, removeItem } from "../utils/cartSlice";
import { formatRupees } from "../utils/bill";

// One cart line: veg mark, name, stepper, line total and a remove button.
const CartItem = ({ line, restaurant }) => {
  const dispatch = useDispatch();
  const { info, qty } = line;

  return (
    <li data-testid="cartItems" className="flex items-center gap-3 py-3">
      <VegIcon isVeg={info.isVeg === 1} className="size-3.5" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-ink">{info.name}</p>
        <p className="text-xs text-ink-subtle">{formatRupees(itemPrice(info))} each</p>
      </div>
      <AddToCartButton item={info} restaurant={restaurant} size="sm" />
      <p className="w-16 text-right text-sm font-semibold text-ink" data-testid="lineTotal">
        {formatRupees(itemPrice(info) * qty)}
      </p>
      <button
        type="button"
        onClick={() => dispatch(removeItem(info.id))}
        aria-label={`Remove ${info.name} from cart`}
        className="rounded-full p-1 text-ink-subtle hover:bg-gray-100 hover:text-nonveg"
      >
        <CloseIcon className="size-4" />
      </button>
    </li>
  );
};

export default CartItem;
