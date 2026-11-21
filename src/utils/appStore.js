import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import { loadCart, saveCart } from "./cartStorage";

// Factory so tests can create an isolated store with optional preloaded state.
export const makeStore = (preloadedState) =>
  configureStore({
    reducer: { cart: cartReducer },
    preloadedState,
  });

// Save the cart whenever it changes (Redux returns the same object if not).
export const persistCart = (store) => {
  let last = store.getState().cart;
  return store.subscribe(() => {
    const { cart } = store.getState();
    if (cart !== last) {
      last = cart;
      saveCart(cart);
    }
  });
};

const savedCart = loadCart();
const appStore = makeStore(savedCart ? { cart: savedCart } : undefined);
persistCart(appStore);

export default appStore;
