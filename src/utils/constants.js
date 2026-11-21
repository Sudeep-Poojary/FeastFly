// NamasteDev dummy API (Swiggy-shaped data). See README.
export const API_BASE_URL = "https://namastedev.com/api/v1";
export const LIST_RESTAURANTS_URL = `${API_BASE_URL}/listRestaurants`;
export const MENU_URL = `${API_BASE_URL}/listRestaurantMenu/`;

// Give up on the live API after this long and use the bundled dataset.
export const API_TIMEOUT_MS = 6000;

// Restaurants per "page" when scrolling, and the simulated network delay for
// local pages (so the loading state is visible; 0 in tests).
export const PAGE_SIZE = 8;
export const LOCAL_PAGE_DELAY_MS = process.env.NODE_ENV === "test" ? 0 : 700;
