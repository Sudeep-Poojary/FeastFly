import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

// Factory so tests can create an isolated store with optional preloaded state.
export const makeStore = (preloadedState) =>
  configureStore({
    reducer: { cart: cartReducer },
    preloadedState,
  });

const appStore = makeStore();

export default appStore;
