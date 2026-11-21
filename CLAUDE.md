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
- **Pagination:** the API returns only 10 restaurants and has no pagination. After that first page, `getMoreRestaurants(offset)` serves further pages from the local-only catalogue in `src/data/moreRestaurants.js` (30 restaurants with menus generated from cuisine `TEMPLATES`), with a simulated delay (`LOCAL_PAGE_DELAY_MS`, 0 in tests). `buildMenuResponse(id)` covers both catalogues.
- **Hooks:**
  - `useRestaurantList()` returns `{ restaurants, firstPage, loading, error, hasMore, loadingMore, loadMoreError, loadMore }`. It de-duplicates by `id`, and `loadMore` ignores calls while a page is in flight. The home carousels use `firstPage`, so they don't shift as more pages load.
  - `useInfiniteScroll(loadMore, { enabled })` returns a ref for a sentinel element, backed by `IntersectionObserver`. It is a no-op in jsdom, so tests mock `IntersectionObserver` (see `InfiniteScroll.test.js`). A "Show more restaurants" button is the manual fallback.
  - `useRestaurantMenu(resId)` returns `{ menu, loading, error }`.
- **Images:** the API's `cloudinaryImageId` / `imageId` values are dummies. `components/FoodImage.js` renders an emoji-on-gradient placeholder. `getFoodVisual(name, hints)` checks the name first and then the hints, and the first matching pattern in `VISUALS` wins, so pattern order matters.
- Prices are in paise. Show `(price ?? defaultPrice) / 100`.
- **Home filtering** is pure logic in `utils/restaurantFilters.js` (`applyFilters`, `FILTERS`, `SORTS`, `getTopCuisines`). `Body.js` only holds the filter state, so add new chips or sorts there, not in components.

### UI building blocks

- `components/ui/`: shared primitives (`Button`, `Icons`, `Logo`, `RatingBadge`, `Skeleton`, `Carousel`). Reuse them rather than restyling inline.
- `components/home/`: home-page sections (`CuisineCarousel`, `FilterBar`).
- Design tokens live in the `@theme` block in `index.css`: `brand-*`, `ink`, `ink-muted`, `ink-subtle`, `rating`, `veg`, `nonveg`, `rounded-card`, `shadow-card`, `shadow-header`. The header is `h-20`, so sticky elements below it use `top-20`.

### State

- **Redux Toolkit:** a single `cart` slice (`utils/cartSlice.js`). Its state is `{ restaurant: {id,name,areaName} | null, items: [{ info, qty }] }`.
  - Actions: `addItem({ item, restaurant })` adds or increments. `decrementItem(id)` removes the line at 0. `removeItem(id)` drops the line. `replaceCart({ item, restaurant })`. `clearCart()`. The restaurant resets when the cart empties.
  - **One restaurant per cart:** `addItem` ignores items from a different restaurant. The UI (`menu/AddToCartButton.js`) checks `selectIsOtherRestaurant(restaurant)` first and opens a "Replace cart?" `ui/Modal`, which dispatches `replaceCart` on confirm.
  - **Persistence:** `appStore.js` preloads from `localStorage` (`utils/cartStorage.js`, key `feastfly:cart:v1`, shape-validated) and saves on every cart change via `persistCart(store)`. If the cart shape changes, bump the key.
  - **Bill:** `utils/bill.js` holds `computeBill(itemTotal)` (₹40 delivery, free from ₹199; ₹5 platform fee; 5% GST) and `formatRupees` (en-IN). Show money only through `formatRupees`.
  - Read state through the exported selectors (`selectCartCount`, `selectItemQty(id)`, `selectSubtotal`, ...) and price through `itemPrice(info)`, rather than reaching into `store.cart`.
  - `utils/appStore.js` exports `makeStore(preloadedState)`. Tests create a fresh store per test with it.
- **Context:** `UserContext` with a default `loggedInUser: "Guest"`.

## Tests

Tests live in `src/**/__tests__/` and use React Testing Library with the `jest-fixed-jsdom` environment. They mock `global.fetch` to return `buildListResponse()` / `buildMenuResponse(id)` from `src/data/restaurants.js`, so changes to that dataset can change the expected counts. Elements are found by `data-testid` (`resCard`, `restaurantGrid`, `searchInput`, `menuSearch`, `foodItems`, `itemQty`, `viewCartBar`, `cartItems`, `lineTotal`, `toPay`, `cartCount`); keep those attributes when editing components.

Component tests that need Redux wrap in `<Provider store={makeStore()}>`, so every test starts with an empty cart. Menu dish filtering is the pure `utils/menuFilters.js` (`filterMenu`). Menu sections are in `components/menu/`.
