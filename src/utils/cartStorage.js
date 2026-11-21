// Persist the cart in localStorage so it survives reloads.
// The key is versioned: bump it if the cart shape changes, and old data is ignored.
export const CART_STORAGE_KEY = "feastfly:cart:v1";

const isValidCart = (cart) =>
  cart &&
  Array.isArray(cart.items) &&
  cart.items.every(
    (line) => line?.info?.id && Number.isInteger(line.qty) && line.qty > 0
  ) &&
  (cart.restaurant === null || typeof cart.restaurant?.id === "string");

/** Saved cart, or undefined if none/invalid/storage unavailable. */
export const loadCart = () => {
  try {
    const cart = JSON.parse(window.localStorage.getItem(CART_STORAGE_KEY));
    return isValidCart(cart) ? cart : undefined;
  } catch {
    return undefined;
  }
};

export const saveCart = (cart) => {
  try {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch {
    // Storage full or blocked (e.g. private mode) — the cart just won't persist.
  }
};
