import { useSelector } from "react-redux";
import { Link } from "react-router";
import { CartIcon } from "../ui/Icons";
import { selectCartCount, selectSubtotal } from "../../utils/cartSlice";
import { formatRupees } from "../../utils/bill";

// Sticky bottom bar shown while the cart has items.
const ViewCartBar = () => {
  const count = useSelector(selectCartCount);
  const subtotal = useSelector(selectSubtotal);

  if (count === 0) return null;

  return (
    <div className="sticky bottom-4 z-30 mt-6">
      <Link
        to="/cart"
        data-testid="viewCartBar"
        className="flex items-center justify-between rounded-2xl bg-rating px-5 py-4 font-bold text-white shadow-lg transition-colors hover:brightness-95"
      >
        <span>
          {count} {count === 1 ? "item" : "items"} added · {formatRupees(subtotal)}
        </span>
        <span className="flex items-center gap-2 uppercase">
          View cart
          <CartIcon className="size-5" />
        </span>
      </Link>
    </div>
  );
};

export default ViewCartBar;
