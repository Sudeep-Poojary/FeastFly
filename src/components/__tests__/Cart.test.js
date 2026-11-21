import { act, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import { Provider } from "react-redux";
import "@testing-library/jest-dom";
import RestaurantMenu from "../RestaurantMenu";
import Header from "../Header";
import Cart from "../Cart";
import appStore from "../../utils/appStore";
import { buildMenuResponse } from "../../data/restaurants";

// NOTE: these tests share the `appStore` singleton, so they run in order and
// build on each other's cart state.

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(buildMenuResponse("123456")),
    })
  );
});

const renderMenuPage = async ({ withCart = false } = {}) => {
  await act(async () => {
    render(
      <Provider store={appStore}>
        <MemoryRouter initialEntries={["/restaurants/123456"]}>
          <Header />
          <Routes>
            <Route path="/restaurants/:resId" element={<RestaurantMenu />} />
          </Routes>
          {withCart && <Cart />}
        </MemoryRouter>
      </Provider>
    );
  });
};

it("Should load the Restaurant Menu and open an accordion", async () => {
  await renderMenuPage();

  expect(screen.getByText("Pizza Paradise")).toBeInTheDocument();
  // "Recommended" is open by default
  expect(screen.getAllByTestId("foodItems").length).toBe(3);

  fireEvent.click(screen.getByText("Specialty Pizzas (3)"));
  expect(screen.getAllByTestId("foodItems").length).toBe(3);
  expect(screen.getByText("BBQ Chicken Pizza")).toBeInTheDocument();
});

it("Should start with an empty cart", async () => {
  await renderMenuPage();

  expect(screen.getByRole("link", { name: "Cart, 0 items" })).toBeInTheDocument();
});

it("Should add food items to the cart", async () => {
  await renderMenuPage();

  const addBtns = screen.getAllByRole("button", { name: "ADD" });
  fireEvent.click(addBtns[0]);
  expect(screen.getByRole("link", { name: "Cart, 1 item" })).toBeInTheDocument();

  fireEvent.click(addBtns[1]);
  expect(screen.getByRole("link", { name: "Cart, 2 items" })).toBeInTheDocument();
});

it("Should show the added items in the Cart", async () => {
  await renderMenuPage({ withCart: true });

  expect(screen.getAllByTestId("cartItems").length).toBe(2);
});

it("Should clear the Cart", async () => {
  await renderMenuPage({ withCart: true });

  fireEvent.click(screen.getByRole("button", { name: "Clear Cart" }));

  expect(screen.queryAllByTestId("cartItems").length).toBe(0);
  expect(screen.getByText("Your Cart is Empty!!!")).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Cart, 0 items" })).toBeInTheDocument();
});
