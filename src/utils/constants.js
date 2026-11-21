// NamasteDev dummy API (Swiggy-shaped data). See README.
export const API_BASE_URL = "https://namastedev.com/api/v1";
export const LIST_RESTAURANTS_URL = `${API_BASE_URL}/listRestaurants`;
export const MENU_URL = `${API_BASE_URL}/listRestaurantMenu/`;

// Give up on the live API after this long and use the bundled dataset.
export const API_TIMEOUT_MS = 6000;
