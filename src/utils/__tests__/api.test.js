import {
  extractRestaurants,
  extractMenu,
  getRestaurants,
  getRestaurantMenu,
} from "../api";
import {
  buildListResponse,
  buildMenuResponse,
  RESTAURANTS,
} from "../../data/restaurants";

const mockFetch = (impl) => {
  global.fetch = jest.fn(impl);
};

const okJson = (body) =>
  Promise.resolve({ ok: true, json: () => Promise.resolve(body) });

describe("extractRestaurants", () => {
  it("reads restaurants from the list response", () => {
    const list = extractRestaurants(buildListResponse());
    expect(list).toHaveLength(RESTAURANTS.length);
    expect(list[0].name).toBe("Pizza Paradise");
  });

  it("does not depend on the grid's position in the cards array", () => {
    const res = buildListResponse();
    res.data.data.cards.unshift({}, { card: { card: { id: "banner" } } });
    expect(extractRestaurants(res)).toHaveLength(RESTAURANTS.length);
  });

  it("returns an empty list for unexpected shapes", () => {
    expect(extractRestaurants(null)).toEqual([]);
    expect(extractRestaurants({ data: {} })).toEqual([]);
  });
});

describe("extractMenu", () => {
  it("reads restaurant info and item categories", () => {
    const menu = extractMenu(buildMenuResponse("123456"));
    expect(menu.info.name).toBe("Pizza Paradise");
    expect(menu.categories.map((c) => c.title)).toEqual([
      "Recommended",
      "Specialty Pizzas",
      "Sides",
      "Beverages",
    ]);
    expect(menu.categories[0].items[0].name).toBe("Margherita Pizza");
  });

  it("accepts any category @type and flattens nested categories", () => {
    const res = buildMenuResponse("123456");
    const regular = res.data.cards[4].groupedCard.cardGroupMap.REGULAR.cards;
    regular[1].card.card["@type"] = "type.googleapis.com/swiggy.ItemCategory";
    regular.push({
      card: {
        card: {
          title: "Combos",
          categories: [
            { title: "Veg", itemCards: [{ card: { info: { id: "c1", name: "Veg Combo" } } }] },
            { title: "Non-veg", itemCards: [{ card: { info: { id: "c2", name: "Chicken Combo" } } }] },
          ],
        },
      },
    });

    const menu = extractMenu(res);
    expect(menu.categories[0].title).toBe("Recommended");
    const combos = menu.categories.find((c) => c.title === "Combos");
    expect(combos.items.map((i) => i.name)).toEqual(["Veg Combo", "Chicken Combo"]);
  });

  it("returns null when the restaurant is missing", () => {
    expect(extractMenu(buildMenuResponse("does-not-exist"))).toBeNull();
  });
});

describe("live API with local fallback", () => {
  it("uses live data when the API responds", async () => {
    const live = buildListResponse();
    live.data.data.cards[1].card.card.gridElements.infoWithStyle.restaurants = [
      { info: { id: "1", name: "Live Only Diner" } },
    ];
    mockFetch(() => okJson(live));

    const { data, source } = await getRestaurants();
    expect(source).toBe("live");
    expect(data.map((r) => r.name)).toEqual(["Live Only Diner"]);
  });

  it("falls back to local data when the request fails", async () => {
    mockFetch(() => Promise.reject(new TypeError("Failed to fetch")));

    const { data, source } = await getRestaurants();
    expect(source).toBe("local");
    expect(data).toHaveLength(RESTAURANTS.length);
  });

  it("falls back to local data on a non-OK response (e.g. Cloudflare 403)", async () => {
    mockFetch(() => Promise.resolve({ ok: false, status: 403 }));

    const { data, source } = await getRestaurantMenu("890123");
    expect(source).toBe("local");
    expect(data.info.name).toBe("South Spice");
  });

  it("rejects when neither source has the restaurant", async () => {
    mockFetch(() => Promise.resolve({ ok: false, status: 404 }));

    await expect(getRestaurantMenu("nope")).rejects.toThrow("HTTP 404");
  });
});
