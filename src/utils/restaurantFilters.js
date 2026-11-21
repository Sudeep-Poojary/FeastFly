// Pure filter/sort helpers for the home page restaurant list.

// "₹400 for two" → 400 (NaN if no number).
export const parseCost = (costForTwo = "") =>
  Number(String(costForTwo).replace(/[^\d]/g, "")) || NaN;

export const FILTERS = [
  { id: "fast", label: "Fast Delivery", test: (r) => (r.sla?.deliveryTime ?? Infinity) <= 30 },
  { id: "rating4", label: "Ratings 4.0+", test: (r) => (r.avgRating ?? 0) >= 4 },
  { id: "veg", label: "Pure Veg", test: (r) => r.veg === true },
  { id: "offers", label: "Offers", test: (r) => Boolean(r.aggregatedDiscountInfoV3) },
  { id: "under300", label: "Less than ₹300", test: (r) => parseCost(r.costForTwo) < 300 },
];

const byNumber = (get, dir = 1) => (a, b) => {
  const x = get(a);
  const y = get(b);
  // Missing values always sort last.
  if (Number.isNaN(x)) return 1;
  if (Number.isNaN(y)) return -1;
  return (x - y) * dir;
};

const num = (v) => (typeof v === "number" ? v : NaN);

export const SORTS = [
  { id: "relevance", label: "Relevance", compare: null },
  { id: "deliveryTime", label: "Delivery Time", compare: byNumber((r) => num(r.sla?.deliveryTime)) },
  { id: "rating", label: "Rating", compare: byNumber((r) => num(r.avgRating), -1) },
  { id: "costLow", label: "Cost: Low to High", compare: byNumber((r) => parseCost(r.costForTwo)) },
  { id: "costHigh", label: "Cost: High to Low", compare: byNumber((r) => parseCost(r.costForTwo), -1) },
];

// Most common cuisines first, ties keep first-seen order.
export const getTopCuisines = (restaurants, limit = 12) => {
  const counts = new Map();
  restaurants.forEach((r) =>
    (r.cuisines ?? []).forEach((c) => counts.set(c, (counts.get(c) ?? 0) + 1))
  );
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([cuisine]) => cuisine);
};

/**
 * @param {object[]} restaurants restaurant info objects
 * @param {{ query?: string, cuisine?: string|null, filters?: string[], sort?: string }} options
 */
export const applyFilters = (
  restaurants,
  { query = "", cuisine = null, filters = [], sort = "relevance" } = {}
) => {
  const q = query.trim().toLowerCase();
  const active = FILTERS.filter((f) => filters.includes(f.id));

  const result = restaurants.filter(
    (r) =>
      (!q ||
        r.name?.toLowerCase().includes(q) ||
        r.cuisines?.some((c) => c.toLowerCase().includes(q))) &&
      (!cuisine || r.cuisines?.includes(cuisine)) &&
      active.every((f) => f.test(r))
  );

  const compare = SORTS.find((s) => s.id === sort)?.compare;
  // Array#sort is stable, so equal items keep their relevance order.
  return compare ? [...result].sort(compare) : result;
};
