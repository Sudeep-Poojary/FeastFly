import { act, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import { Provider } from "react-redux";
import "@testing-library/jest-dom";
import RestaurantMenu from "../RestaurantMenu";
import Header from "../Header";
import Cart from "../Cart";
import { makeStore } from "../../utils/appStore";
import { buildMenuResponse } from "../../data/restaurants";

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(buildMenuResponse("123456")),
    })
  );
});

// Menu + cart on one screen, with a fresh store per test.
const renderMenuAndCart = async () => {
  await act(async () => {
    render(
      <Provider store={makeStore()}>
        <MemoryRouter initialEntries={["/restaurants/123456"]}>
          <Header />
          <Routes>
            <Route path="/restaurants/:resId" element={<RestaurantMenu />} />
          </Routes>
          <Cart />
        </MemoryRouter>
      </Provider>
    );
  });
};

it("Should start with an empty cart", async () => {
  await renderMenuAndCart();

  expect(screen.getByRole("link", { name: "Cart, 0 items" })).toBeInTheDocument();
  expect(screen.getByText("Your Cart is Empty!!!")).toBeInTheDocument();
});

it("Should show added items with their quantities", async () => {
  await renderMenuAndCart();

  fireEvent.click(screen.getByRole("button", { name: "Add Margherita Pizza" }));
  fireEvent.click(screen.getByRole("button", { name: "Add one more Margherita Pizza" }));
  fireEvent.click(screen.getByRole("button", { name: "Add Pepperoni Pizza" }));

  expect(screen.getByRole("link", { name: "Cart, 3 items" })).toBeInTheDocument();
  expect(screen.getAllByTestId("cartItems")).toHaveLength(2);
  expect(screen.getByText("× 2 - ₹598")).toBeInTheDocument();
});

it("Should clear the cart", async () => {
  await renderMenuAndCart();

  fireEvent.click(screen.getByRole("button", { name: "Add Margherita Pizza" }));
  fireEvent.click(screen.getByRole("button", { name: "Clear Cart" }));

  expect(screen.queryAllByTestId("cartItems")).toHaveLength(0);
  expect(screen.getByText("Your Cart is Empty!!!")).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Cart, 0 items" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Add Margherita Pizza" })).toBeInTheDocument();
});
