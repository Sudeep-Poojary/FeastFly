import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import {
  clearCart,
  selectCartItems,
  selectCartRestaurant,
  selectSubtotal,
} from "../../utils/cartSlice";
import { computeBill, formatRupees } from "../../utils/bill";
import useDocumentTitle from "../../utils/useDocumentTitle";
import CartItem from "./CartItem";
import BillDetails from "./BillDetails";
import FoodImage from "../ui/FoodImage";
import Button from "../ui/Button";
import { PinIcon, UserIcon } from "../ui/Icons";

const EmptyCart = () => (
  <div className="py-24 text-center">
    <p className="text-8xl" aria-hidden="true">🛒</p>
    <h1 className="mt-6 text-xl font-extrabold text-ink">Your cart is empty</h1>
    <p className="mt-2 text-sm text-ink-muted">
      You can go to the home page to view more restaurants.
    </p>
    <Button to="/" className="mt-6 uppercase">
      See restaurants near you
    </Button>
  </div>
);

const RupeeIcon = () => <span aria-hidden="true">₹</span>;

const Step = ({ icon: Icon, title, children }) => (
  <section className="relative rounded-2xl bg-white p-4 shadow-card sm:p-6">
    <div className="flex items-center gap-3">
      <span className="grid size-10 place-items-center rounded-xl bg-ink text-white">
        <Icon className="size-5" />
      </span>
      <h2 className="text-lg font-extrabold text-ink">{title}</h2>
    </div>
    <div className="mt-4 sm:pl-13">{children}</div>
  </section>
);

const Cart = () => {
  useDocumentTitle("Cart");
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const restaurant = useSelector(selectCartRestaurant);
  const bill = computeBill(useSelector(selectSubtotal));

  if (items.length === 0) return <EmptyCart />;

  return (
    <div className="-mx-4 min-h-full bg-gray-100 px-4 py-8">
      <h1 className="sr-only">Cart</h1>
      <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1fr_380px]">
        {/* Checkout steps (display only — no accounts or payments yet) */}
        <div className="space-y-6">
          <Step icon={UserIcon} title="Account">
            <p className="text-sm text-ink-muted">You're ordering as a guest. Sign in is coming soon.</p>
          </Step>
          <Step icon={PinIcon} title="Delivery address">
            <p className="font-bold text-ink">Home</p>
            <p className="text-sm text-ink-muted">Bandra West, Mumbai, Maharashtra</p>
          </Step>
          <Step icon={RupeeIcon} title="Payment">
            <Button className="w-full" disabled title="Payments are coming soon">
              Proceed to pay · {formatRupees(bill.toPay)}
            </Button>
            <p className="mt-2 text-xs text-ink-subtle">Payments are coming soon.</p>
          </Step>
        </div>

        {/* Order summary */}
        <aside className="h-fit rounded-2xl bg-white p-4 shadow-card sm:p-6 lg:sticky lg:top-24">
          {restaurant && (
            <Link
              to={`/restaurants/${restaurant.id}`}
              className="flex items-center gap-3 border-b border-gray-100 pb-4"
            >
              <FoodImage
                label={restaurant.name}
                className="size-14 rounded-lg"
                emojiClassName="text-3xl"
              />
              <span className="min-w-0">
                <span className="block truncate font-extrabold text-ink">{restaurant.name}</span>
                <span className="block truncate text-sm text-ink-muted">{restaurant.areaName}</span>
              </span>
            </Link>
          )}

          <ul className="divide-y divide-gray-50 py-2">
            {items.map((line) => (
              <CartItem key={line.info.id} line={line} restaurant={restaurant} />
            ))}
          </ul>

          <button
            type="button"
            onClick={() => dispatch(clearCart())}
            className="mb-4 text-xs font-bold uppercase text-nonveg hover:underline"
          >
            Clear cart
          </button>

          <BillDetails bill={bill} />
        </aside>
      </div>
    </div>
  );
};

export default Cart;
