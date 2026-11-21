import { makeStore } from "../appStore";
import {
  addItem,
  clearCart,
  decrementItem,
  removeItem,
  selectCartCount,
  selectCartRestaurant,
  selectItemQty,
  selectSubtotal,
} from "../cartSlice";

const pizza = { id: "p1", name: "Pizza", price: 29900 };
const coke = { id: "c1", name: "Coke", defaultPrice: 5900 }; // no `price`
const restaurant = { id: "123456", name: "Pizza Paradise", areaName: "Central", extra: "x" };

const setup = () => {
  const store = makeStore();
  const state = () => store.getState();
  return { store, state };
};

it("adds new items and increments existing ones", () => {
  const { store, state } = setup();

  store.dispatch(addItem({ item: pizza, restaurant }));
  store.dispatch(addItem({ item: pizza, restaurant }));
  store.dispatch(addItem({ item: coke, restaurant }));

  expect(state().cart.items).toEqual([
    { info: pizza, qty: 2 },
    { info: coke, qty: 1 },
  ]);
  expect(selectCartCount(state())).toBe(3);
  expect(selectItemQty("p1")(state())).toBe(2);
  expect(selectItemQty("missing")(state())).toBe(0);
});

it("remembers the restaurant (only the fields it needs)", () => {
  const { store, state } = setup();

  store.dispatch(addItem({ item: pizza, restaurant }));

  expect(selectCartRestaurant(state())).toEqual({
    id: "123456",
    name: "Pizza Paradise",
    areaName: "Central",
  });
});

it("computes the subtotal in rupees, using defaultPrice as a fallback", () => {
  const { store, state } = setup();

  store.dispatch(addItem({ item: pizza, restaurant }));
  store.dispatch(addItem({ item: pizza, restaurant }));
  store.dispatch(addItem({ item: coke, restaurant }));

  expect(selectSubtotal(state())).toBe(299 * 2 + 59);
});

it("decrements, dropping the line and restaurant at zero", () => {
  const { store, state } = setup();

  store.dispatch(addItem({ item: pizza, restaurant }));
  store.dispatch(addItem({ item: pizza, restaurant }));
  store.dispatch(decrementItem("p1"));
  expect(selectItemQty("p1")(state())).toBe(1);

  store.dispatch(decrementItem("p1"));
  expect(state().cart.items).toEqual([]);
  expect(selectCartRestaurant(state())).toBeNull();

  store.dispatch(decrementItem("p1")); // no-op
  expect(state().cart.items).toEqual([]);
});

it("removes a specific line regardless of quantity", () => {
  const { store, state } = setup();

  store.dispatch(addItem({ item: pizza, restaurant }));
  store.dispatch(addItem({ item: pizza, restaurant }));
  store.dispatch(addItem({ item: coke, restaurant }));
  store.dispatch(removeItem("p1"));

  expect(state().cart.items).toEqual([{ info: coke, qty: 1 }]);
});

it("clears everything", () => {
  const { store, state } = setup();

  store.dispatch(addItem({ item: pizza, restaurant }));
  store.dispatch(clearCart());

  expect(state().cart).toEqual({ restaurant: null, items: [] });
});
