import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  decrementItem,
  replaceCart,
  selectCartRestaurant,
  selectIsOtherRestaurant,
  selectItemQty,
} from "../../utils/cartSlice";
import Modal from "../ui/Modal";
import Button from "../ui/Button";

const SIZES = {
  md: "h-10 w-28 text-lg",
  sm: "h-8 w-24 text-base",
};

// "ADD" until the item is in the cart, then a "− qty +" stepper.
// Adding from a different restaurant asks before replacing the cart.
const AddToCartButton = ({ item, restaurant, size = "md", className = "" }) => {
  const dispatch = useDispatch();
  const qty = useSelector(selectItemQty(item.id));
  const isOtherRestaurant = useSelector(selectIsOtherRestaurant(restaurant));
  const cartRestaurant = useSelector(selectCartRestaurant);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const add = () => {
    if (isOtherRestaurant) setConfirmOpen(true);
    else dispatch(addItem({ item, restaurant }));
  };

  const base = `rounded-xl border border-gray-200 bg-white font-extrabold uppercase text-rating shadow-md ${SIZES[size]} ${className}`;

  if (qty === 0) {
    return (
      <>
        <button
          type="button"
          className={`${base} transition-colors hover:bg-gray-100`}
          onClick={add}
          aria-label={`Add ${item.name}`}
        >
          Add
        </button>

        <Modal
          open={confirmOpen}
          onClose={() => setConfirmOpen(false)}
          title="Items already in cart"
        >
          <p className="mt-2 text-sm text-ink-muted">
            Your cart contains items from <strong className="text-ink">{cartRestaurant?.name}</strong>.
            Would you like to reset your cart for adding items from{" "}
            <strong className="text-ink">{restaurant?.name}</strong>?
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <Button variant="secondary" onClick={() => setConfirmOpen(false)}>
              No
            </Button>
            <Button
              onClick={() => {
                dispatch(replaceCart({ item, restaurant }));
                setConfirmOpen(false);
              }}
            >
              Yes, start afresh
            </Button>
          </div>
        </Modal>
      </>
    );
  }

  return (
    <div className={`${base} flex items-center justify-between overflow-hidden`}>
      <button
        type="button"
        className="h-full flex-1 hover:bg-gray-100"
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
        className="h-full flex-1 hover:bg-gray-100"
        onClick={() => dispatch(addItem({ item, restaurant }))}
        aria-label={`Add one more ${item.name}`}
      >
        +
      </button>
    </div>
  );
};

export default AddToCartButton;
