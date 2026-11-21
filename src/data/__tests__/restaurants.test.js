import {
  RESTAURANTS,
  buildMenuResponse,
  getMoreRestaurantsPage,
} from "../restaurants";
import { MORE_RESTAURANTS } from "../moreRestaurants";
import { extractMenu } from "../../utils/api";

const ALL = [...RESTAURANTS, ...MORE_RESTAURANTS];

describe("local catalogue", () => {
  it("has unique restaurant ids", () => {
    expect(new Set(ALL.map((r) => r.id)).size).toBe(ALL.length);
  });

  it("gives every restaurant a menu with uniquely-identified items", () => {
    const itemIds = new Set();
    for (const r of ALL) {
      const menu = extractMenu(buildMenuResponse(r.id));
      expect(menu.info.name).toBe(r.name);
      expect(menu.categories.length).toBeGreaterThan(0);
      for (const item of menu.categories.flatMap((c) => c.items)) {
        expect(itemIds.has(item.id)).toBe(false);
        itemIds.add(item.id);
        expect(item.price).toBeGreaterThan(0);
      }
    }
  });

  it("only serves veg dishes at pure-veg restaurants", () => {
    for (const r of MORE_RESTAURANTS.filter((r) => r.veg)) {
      const items = extractMenu(buildMenuResponse(r.id)).categories.flatMap((c) => c.items);
      expect(items.every((i) => i.isVeg === 1)).toBe(true);
    }
  });
});

describe("getMoreRestaurantsPage", () => {
  it("pages through the extra catalogue and ends with nextOffset null", () => {
    const seen = [];
    let offset = 0;
    let pages = 0;
    while (offset !== null) {
      const page = getMoreRestaurantsPage(offset, 8);
      seen.push(...page.restaurants);
      offset = page.nextOffset;
      pages++;
    }
    expect(pages).toBe(4);
    expect(seen).toEqual(MORE_RESTAURANTS);
  });

  it("returns an empty last page past the end", () => {
    expect(getMoreRestaurantsPage(999)).toEqual({ restaurants: [], nextOffset: null });
  });
});
