# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm start`: Parcel dev server at <http://localhost:1234>. The entry is `index.html`, which loads `src/App.js`.
- `npm run build`: production build into `dist/`. This is what Vercel runs (see `vercel.json`).
- `npm test`: runs all Jest tests. Coverage is on by default via `jest.config.js` and written to `coverage/`.
- `npx jest src/components/__tests__/Cart.test.js`: runs one test file.
- `npx jest -t "falls back to local"`: runs tests whose name matches.
- Add `--coverage=false` for faster, less noisy runs.

There is no linter configured.

## Architecture

React 18 SPA bundled with Parcel (no webpack or Vite config). Babel (`babel.config.js`) is only for Jest; Parcel uses its own JS transformer (`.parcelrc`). Styling is Tailwind CSS v4 via `@tailwindcss/postcss` (`.postcssrc`), imported once in the root `index.css`. Tailwind finds class names by scanning source files, so write class names as complete literal strings. Never build them by concatenation.

`src/App.js` is both the entry point and the router config:

- It uses `createBrowserRouter` from **`react-router` v7**. Import from `"react-router"`, not `react-router-dom`.
- `AppLayout` wraps every route in the Redux `Provider` (`utils/appStore.js`), then renders `Header` + `<Outlet />`.
- `Grocery` is lazy-loaded with `React.lazy` + `Suspense`.
- Deep links work in production through the SPA rewrite in `vercel.json`.

### Data flow

- **Source:** the NamasteDev dummy API (`utils/constants.js`), which returns Swiggy-shaped JSON. A bundled dataset in `src/data/restaurants.js` has the same response shape (`buildListResponse`, `buildMenuResponse(id)`), plus `RESTAURANTS` and `MENUS`.
- **`utils/api.js`** is the only place that fetches or parses API JSON:
  - `getRestaurants()` / `getRestaurantMenu(id)` try the live API with a timeout. On any failure (network, Cloudflare `403`, CORS, timeout, unexpected shape) they fall back to the bundled dataset. They return `{ data, source: "live" | "local" }`.
  - `extractRestaurants` / `extractMenu` find sections **by shape, never by array index**. The grid is the card with `gridElements.infoWithStyle.restaurants`. Restaurant info is the card with `info.name`. Categories are `REGULAR.cards` entries with an `itemCards` array, accepting any `@type`; nested `categories` are flattened.
  - Components receive **normalized plain objects**: restaurant `info` objects, and a menu of `{ info, categories: [{ title, items: [itemInfo] }] }`. They never see `card.card...`.
- **Hooks:** `useRestaurantList()` and `useRestaurantMenu(resId)` return `{ ..., loading, error }`. Components show `Shimmer` while loading and an error message on failure.
- **Images:** the API's `cloudinaryImageId` / `imageId` values are dummies. `components/FoodImage.js` renders an emoji-on-gradient placeholder chosen from the dish or cuisine name.
- Prices are in paise. Show `(price ?? defaultPrice) / 100`.

### State

- **Redux Toolkit:** a single `cart` slice (`utils/cartSlice.js`) with `addItem`, `removeItem` (pops the last item), and `clearCart`. Items are normalized item-info objects.
- **Context:** `UserContext` with a default `loggedInUser: "Guest"`.

## Tests

Tests live in `src/**/__tests__/` and use React Testing Library with the `jest-fixed-jsdom` environment. They mock `global.fetch` to return `buildListResponse()` / `buildMenuResponse(id)` from `src/data/restaurants.js`, so changes to that dataset can change the expected counts. Elements are found by `data-testid` (`resCard`, `searchInput`, `foodItems`, `cartItems`); keep those attributes when editing components.

`Cart.test.js` uses the real `appStore` singleton, so cart state carries over between its tests, and they must run in order.
