import { CART_STORAGE_KEY, loadCart, saveCart } from "../cartStorage";
import { makeStore, persistCart } from "../appStore";
import { addItem, clearCart } from "../cartSlice";

const item = { id: "p1", name: "Pizza", price: 29900 };
const restaurant = { id: "123456", name: "Pizza Paradise", areaName: "Central" };

beforeEach(() => localStorage.clear());

it("round-trips a cart", () => {
  const cart = { restaurant, items: [{ info: item, qty: 2 }] };
  saveCart(cart);
  expect(loadCart()).toEqual(cart);
});

it("ignores missing, corrupt or wrongly-shaped data", () => {
  expect(loadCart()).toBeUndefined();

  localStorage.setItem(CART_STORAGE_KEY, "{not json");
  expect(loadCart()).toBeUndefined();

  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify({ items: [{ info: item, qty: 0 }], restaurant: null }));
  expect(loadCart()).toBeUndefined();

  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify({ items: "nope" }));
  expect(loadCart()).toBeUndefined();
});

it("saves the cart whenever it changes", () => {
  const store = makeStore();
  const unsubscribe = persistCart(store);

  store.dispatch(addItem({ item, restaurant }));
  expect(loadCart()).toEqual({ restaurant, items: [{ info: item, qty: 1 }] });

  store.dispatch(clearCart());
  expect(loadCart()).toEqual({ restaurant: null, items: [] });

  unsubscribe();
});

it("restores a saved cart into a new store", () => {
  saveCart({ restaurant, items: [{ info: item, qty: 3 }] });

  const store = makeStore({ cart: loadCart() });

  expect(store.getState().cart.items[0].qty).toBe(3);
});
