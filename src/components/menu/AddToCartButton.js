import { useDispatch, useSelector } from "react-redux";
import { addItem, decrementItem, selectItemQty } from "../../utils/cartSlice";

// "ADD" until the item is in the cart, then a "− qty +" stepper.
const AddToCartButton = ({ item, restaurant, className = "" }) => {
  const dispatch = useDispatch();
  const qty = useSelector(selectItemQty(item.id));

  const base = `h-10 w-28 rounded-xl border border-gray-200 bg-white text-lg font-extrabold uppercase text-rating shadow-md ${className}`;

  if (qty === 0) {
    return (
      <button
        type="button"
        className={`${base} transition-colors hover:bg-gray-100`}
        onClick={() => dispatch(addItem({ item, restaurant }))}
        aria-label={`Add ${item.name}`}
      >
        Add
      </button>
    );
  }

  return (
    <div className={`${base} flex items-center justify-between overflow-hidden`}>
      <button
        type="button"
        className="h-full flex-1 text-xl hover:bg-gray-100"
        onClick={() => dispatch(decrementItem(item.id))}
        aria-label={`Remove one ${item.name}`}
      >
        −
      </button>
      <span data-testid="itemQty" aria-live="polite" aria-label={`${qty} in cart`}>
        {qty}
      </span>
      <button
        type="button"
        className="h-full flex-1 text-xl hover:bg-gray-100"
        onClick={() => dispatch(addItem({ item, restaurant }))}
        aria-label={`Add one more ${item.name}`}
      >
        +
      </button>
    </div>
  );
};

export default AddToCartButton;
