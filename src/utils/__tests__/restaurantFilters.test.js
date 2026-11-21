import {
  applyFilters,
  getTopCuisines,
  parseCost,
} from "../restaurantFilters";
import { RESTAURANTS } from "../../data/restaurants";

const names = (list) => list.map((r) => r.name);

describe("parseCost", () => {
  it("extracts the rupee amount", () => {
    expect(parseCost("₹400 for two")).toBe(400);
    expect(parseCost(" ₹ 1,200 for two")).toBe(1200);
    expect(parseCost(undefined)).toBeNaN();
  });
});

describe("applyFilters", () => {
  it("returns everything in original order by default", () => {
    expect(applyFilters(RESTAURANTS)).toEqual(RESTAURANTS);
  });

  it("searches names and cuisines, case-insensitively", () => {
    expect(names(applyFilters(RESTAURANTS, { query: "BURGER" }))).toEqual(["Burger Hub"]);
    expect(names(applyFilters(RESTAURANTS, { query: "biryani" }))).toEqual(["Spice Kingdom"]);
  });

  it("filters by cuisine", () => {
    expect(names(applyFilters(RESTAURANTS, { cuisine: "Italian" }))).toEqual([
      "Pizza Paradise",
      "Pasta Palace",
    ]);
  });

  it("combines filters with AND", () => {
    const result = applyFilters(RESTAURANTS, { filters: ["veg", "under300"] });
    expect(names(result)).toEqual(["Green Bites", "Dessert Delight"]);
  });

  it("applies each quick filter", () => {
    expect(applyFilters(RESTAURANTS, { filters: ["fast"] })).toHaveLength(5);
    expect(applyFilters(RESTAURANTS, { filters: ["rating4"] })).toHaveLength(9);
    expect(applyFilters(RESTAURANTS, { filters: ["offers"] })).toHaveLength(9);
  });

  it("sorts by rating, delivery time and cost", () => {
    expect(applyFilters(RESTAURANTS, { sort: "rating" })[0].name).toBe("Dessert Delight");
    expect(applyFilters(RESTAURANTS, { sort: "deliveryTime" })[0].name).toBe("Green Bites");
    expect(applyFilters(RESTAURANTS, { sort: "costLow" })[0].name).toBe("Dessert Delight");
    expect(applyFilters(RESTAURANTS, { sort: "costHigh" })[0].name).toBe("Sushi Station");
  });

  it("does not mutate the input", () => {
    const copy = [...RESTAURANTS];
    applyFilters(RESTAURANTS, { sort: "rating" });
    expect(RESTAURANTS).toEqual(copy);
  });
});

describe("getTopCuisines", () => {
  it("orders cuisines by how many restaurants serve them", () => {
    const top = getTopCuisines(RESTAURANTS, 3);
    // Each appears twice; ties keep first-seen order.
    expect(top).toEqual(["Italian", "Fast Food", "North Indian"]);
  });
});
