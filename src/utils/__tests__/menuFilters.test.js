import { filterMenu } from "../menuFilters";

const categories = [
  {
    title: "Pizzas",
    items: [
      { id: "1", name: "Margherita", description: "Cheese and basil", isVeg: 1 },
      { id: "2", name: "Pepperoni", description: "Spicy salami", isVeg: 0 },
    ],
  },
  { title: "Sides", items: [{ id: "3", name: "Chicken Wings", isVeg: 0 }] },
];

it("returns the same categories when no filter is active", () => {
  expect(filterMenu(categories)).toBe(categories);
});

it("keeps only veg items and drops empty categories", () => {
  const result = filterMenu(categories, { vegOnly: true });
  expect(result).toEqual([{ title: "Pizzas", items: [categories[0].items[0]] }]);
});

it("searches names and descriptions case-insensitively", () => {
  expect(filterMenu(categories, { query: "WINGS" })[0].items[0].id).toBe("3");
  expect(filterMenu(categories, { query: "salami" })[0].items[0].id).toBe("2");
  expect(filterMenu(categories, { query: "  basil " })[0].items[0].id).toBe("1");
});

it("combines search with veg only", () => {
  expect(filterMenu(categories, { query: "pepperoni", vegOnly: true })).toEqual([]);
});
