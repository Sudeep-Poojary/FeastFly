import {
  LIST_RESTAURANTS_URL,
  MENU_URL,
  API_TIMEOUT_MS,
  PAGE_SIZE,
  LOCAL_PAGE_DELAY_MS,
} from "./constants";
import {
  buildListResponse,
  buildMenuResponse,
  getMoreRestaurantsPage,
} from "../data/restaurants";

// ---------------------------------------------------------------------------
// Parsing — locate sections by their shape, never by array index, so the app
// keeps working if the API reorders or inserts cards.
// ---------------------------------------------------------------------------

const getCards = (json) => json?.data?.data?.cards ?? json?.data?.cards ?? [];

export const extractRestaurants = (json) => {
  const grid = getCards(json).find(
    (c) => c?.card?.card?.gridElements?.infoWithStyle?.restaurants?.length
  );
  const restaurants = grid?.card?.card?.gridElements?.infoWithStyle?.restaurants;
  return (restaurants ?? []).map((r) => r.info).filter(Boolean);
};

const toCategory = (card) => ({
  title: card.title,
  items: (card.itemCards ?? []).map((i) => i?.card?.info).filter(Boolean),
});

export const extractMenu = (json) => {
  const cards = getCards(json);

  const info = cards.find((c) => c?.card?.card?.info?.name)?.card?.card?.info;

  const sections =
    cards.find((c) => c?.groupedCard)?.groupedCard?.cardGroupMap?.REGULAR
      ?.cards ?? [];

  const categories = sections
    .map((c) => c?.card?.card)
    .filter(Boolean)
    .flatMap((card) => {
      // Plain category: has its own itemCards.
      if (Array.isArray(card.itemCards)) return [toCategory(card)];
      // Nested category (e.g. "Pizzas" → "Veg", "Non-veg"): flatten sub-lists.
      if (Array.isArray(card.categories)) {
        return [
          {
            title: card.title,
            items: card.categories.flatMap((sub) => toCategory(sub).items),
          },
        ];
      }
      return [];
    })
    .filter((category) => category.items.length > 0);

  return info ? { info, categories } : null;
};

// ---------------------------------------------------------------------------
// Fetching — try the live API, fall back to the bundled dataset on any failure
// (network error, Cloudflare challenge, CORS, timeout, or unexpected shape).
// ---------------------------------------------------------------------------

const fetchJson = async (url) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), API_TIMEOUT_MS);
  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } finally {
    clearTimeout(timer);
  }
};

const withFallback = async (url, parse, fallbackResponse) => {
  try {
    const parsed = parse(await fetchJson(url));
    if (parsed && (!Array.isArray(parsed) || parsed.length > 0)) {
      return { data: parsed, source: "live" };
    }
    throw new Error("Unexpected response shape");
  } catch (err) {
    const data = parse(fallbackResponse());
    if (!data) throw err;
    return { data, source: "local" };
  }
};

export const getRestaurants = () =>
  withFallback(LIST_RESTAURANTS_URL, extractRestaurants, buildListResponse);

export const getRestaurantMenu = (resId) =>
  withFallback(MENU_URL + encodeURIComponent(resId), extractMenu, () =>
    buildMenuResponse(resId)
  );

// Next page of restaurants after the first (API) page. The API has no
// pagination, so these come from the extended local catalogue.
// Resolves to { restaurants, nextOffset } — nextOffset is null at the end.
export const getMoreRestaurants = (offset = 0, limit = PAGE_SIZE) =>
  new Promise((resolve) =>
    setTimeout(() => resolve(getMoreRestaurantsPage(offset, limit)), LOCAL_PAGE_DELAY_MS)
  );
