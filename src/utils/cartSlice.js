import { createSlice } from "@reduxjs/toolkit";

// Cart shape:
// {
//   restaurant: { id, name, areaName } | null,  // who the cart is from
//   items: [{ info: itemInfo, qty }],            // in the order first added
// }

const initialState = { restaurant: null, items: [] };

const findLine = (state, id) => state.items.find((line) => line.info.id === id);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // payload: { item, restaurant? }
    addItem: (state, { payload: { item, restaurant } }) => {
      const line = findLine(state, item.id);
      if (line) line.qty += 1;
      else state.items.push({ info: item, qty: 1 });

      if (!state.restaurant && restaurant) {
        const { id, name, areaName } = restaurant;
        state.restaurant = { id, name, areaName };
      }
    },

    // payload: item id. Removes the line when it reaches 0.
    decrementItem: (state, { payload: id }) => {
      const line = findLine(state, id);
      if (!line) return;
      line.qty -= 1;
      if (line.qty <= 0) state.items = state.items.filter((l) => l.info.id !== id);
      if (state.items.length === 0) state.restaurant = null;
    },

    // payload: item id. Removes the whole line regardless of quantity.
    removeItem: (state, { payload: id }) => {
      state.items = state.items.filter((l) => l.info.id !== id);
      if (state.items.length === 0) state.restaurant = null;
    },

    clearCart: () => initialState,
  },
});

export const { addItem, decrementItem, removeItem, clearCart } = cartSlice.actions;

// ---- Selectors -------------------------------------------------------------

export const itemPrice = (info) => (info.price ?? info.defaultPrice ?? 0) / 100;

export const selectCartItems = (store) => store.cart.items;
export const selectCartRestaurant = (store) => store.cart.restaurant;
export const selectCartCount = (store) =>
  store.cart.items.reduce((sum, line) => sum + line.qty, 0);
export const selectItemQty = (id) => (store) =>
  store.cart.items.find((line) => line.info.id === id)?.qty ?? 0;
export const selectSubtotal = (store) =>
  store.cart.items.reduce((sum, line) => sum + itemPrice(line.info) * line.qty, 0);

export default cartSlice.reducer;
