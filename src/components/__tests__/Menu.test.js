import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import { Provider } from "react-redux";
import "@testing-library/jest-dom";
import RestaurantMenu from "../RestaurantMenu";
import Header from "../Header";
import { makeStore } from "../../utils/appStore";
import { buildMenuResponse } from "../../data/restaurants";

const mockMenuFetch = (resId) => {
  global.fetch = jest.fn(() =>
    Promise.resolve({ ok: true, json: () => Promise.resolve(buildMenuResponse(resId)) })
  );
};

const renderMenu = async (resId = "123456") => {
  mockMenuFetch(resId);
  const store = makeStore();
  await act(async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/restaurants/${resId}`]}>
          <Header />
          <Routes>
            <Route path="/restaurants/:resId" element={<RestaurantMenu />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
  });
  return store;
};

const categoryButton = (title) => screen.getByRole("button", { name: new RegExp(`^${title} \\(`) });
const visibleDishes = () =>
  screen.getAllByTestId("foodItems").map((li) => within(li).getByRole("heading").textContent);

it("Should show the restaurant header and deals", async () => {
  await renderMenu();

  expect(screen.getByRole("heading", { level: 1, name: "Pizza Paradise" })).toBeInTheDocument();
  expect(screen.getByText("(10K+ ratings)")).toBeInTheDocument();
  expect(screen.getByText("Pizza, Italian, Fast Food")).toBeInTheDocument();
  expect(screen.getByText("Central District")).toBeInTheDocument();

  const deals = screen.getByRole("region", { name: "Deals for you" });
  expect(within(deals).getByText("50% off upto ₹100")).toBeInTheDocument();
});

it("Should open one category at a time", async () => {
  await renderMenu();

  expect(categoryButton("Recommended")).toHaveAttribute("aria-expanded", "true");
  expect(visibleDishes()).toEqual(["Margherita Pizza", "Pepperoni Pizza", "Veggie Supreme"]);

  fireEvent.click(categoryButton("Specialty Pizzas"));
  expect(categoryButton("Recommended")).toHaveAttribute("aria-expanded", "false");
  expect(categoryButton("Specialty Pizzas")).toHaveAttribute("aria-expanded", "true");
  expect(visibleDishes()).toHaveLength(3);

  fireEvent.click(categoryButton("Specialty Pizzas"));
  expect(screen.queryAllByTestId("foodItems")).toHaveLength(0);
});

it("Should search dishes across all categories", async () => {
  await renderMenu();

  fireEvent.change(screen.getByTestId("menuSearch"), { target: { value: "bread" } });

  expect(visibleDishes()).toEqual(["Garlic Breadsticks"]);
  expect(screen.getByRole("button", { name: /^Sides \(1\)/ })).toBeInTheDocument();

  fireEvent.change(screen.getByTestId("menuSearch"), { target: { value: "sushi" } });
  expect(screen.getByText('No dishes match "sushi".')).toBeInTheDocument();
});

it("Should show only veg dishes with the Veg only switch", async () => {
  await renderMenu();

  const toggle = screen.getByRole("switch", { name: "Veg only" });
  fireEvent.click(toggle);

  expect(toggle).toHaveAttribute("aria-checked", "true");
  expect(screen.queryByText("Pepperoni Pizza")).not.toBeInTheDocument();
  expect(screen.queryByText("BBQ Chicken Pizza")).not.toBeInTheDocument();
  expect(screen.queryAllByRole("img", { name: "Non-veg" })).toHaveLength(0);
  expect(screen.getByText("Paneer Tikka Pizza")).toBeInTheDocument();
});

it("Should turn ADD into a quantity stepper and update the cart", async () => {
  const store = await renderMenu();

  fireEvent.click(screen.getByRole("button", { name: "Add Margherita Pizza" }));

  expect(screen.getByTestId("itemQty")).toHaveTextContent("1");
  expect(screen.getByRole("link", { name: "Cart, 1 item" })).toBeInTheDocument();
  expect(screen.getByTestId("viewCartBar")).toHaveTextContent("1 item added · ₹299");

  fireEvent.click(screen.getByRole("button", { name: "Add one more Margherita Pizza" }));
  expect(screen.getByTestId("itemQty")).toHaveTextContent("2");
  expect(screen.getByTestId("viewCartBar")).toHaveTextContent("2 items added · ₹598");
  expect(store.getState().cart.restaurant.name).toBe("Pizza Paradise");

  fireEvent.click(screen.getByRole("button", { name: "Remove one Margherita Pizza" }));
  fireEvent.click(screen.getByRole("button", { name: "Remove one Margherita Pizza" }));

  expect(screen.getByRole("button", { name: "Add Margherita Pizza" })).toBeInTheDocument();
  expect(screen.queryByTestId("viewCartBar")).not.toBeInTheDocument();
});

it("Should load a menu for an extended-catalogue restaurant", async () => {
  await renderMenu("100012");

  expect(screen.getByRole("heading", { level: 1, name: "Sunday Brunch Café" })).toBeInTheDocument();
  expect(visibleDishes()).toContain("Avocado Toast");
});

it("Should show a friendly message for an unknown restaurant", async () => {
  global.fetch = jest.fn(() => Promise.resolve({ ok: false, status: 404 }));
  await act(async () => {
    render(
      <Provider store={makeStore()}>
        <MemoryRouter initialEntries={["/restaurants/nope"]}>
          <Routes>
            <Route path="/restaurants/:resId" element={<RestaurantMenu />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
  });

  expect(screen.getByText("We couldn't find this restaurant")).toBeInTheDocument();
});
