import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import "@testing-library/jest-dom";
import Body from "../Body";
import { buildListResponse } from "../../data/restaurants";

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({ ok: true, json: () => Promise.resolve(buildListResponse()) })
  );
});

const renderBody = async () => {
  await act(async () => {
    render(
      <BrowserRouter>
        <Body />
      </BrowserRouter>
    );
  });
};

// Cards in the main grid (the "Top rated" carousel also renders cards).
const gridCards = () => within(screen.getByTestId("restaurantGrid")).getAllByTestId("resCard");
const gridNames = () => gridCards().map((c) => within(c).getByRole("heading").textContent);

it("Should render all restaurants plus the top-rated carousel", async () => {
  await renderBody();

  expect(gridCards()).toHaveLength(10);
  const topRated = screen.getByRole("region", { name: "Top rated near you" });
  expect(within(topRated).getAllByTestId("resCard")).toHaveLength(8);
});

it("Should search restaurants as you type", async () => {
  await renderBody();

  fireEvent.change(screen.getByTestId("searchInput"), { target: { value: "burger" } });

  expect(gridNames()).toEqual(["Burger Hub"]);
});

it("Should filter by a cuisine from 'What's on your mind?' and toggle it off", async () => {
  await renderBody();

  const cuisines = screen.getByRole("region", { name: "What's on your mind?" });
  const italian = within(cuisines).getByRole("button", { name: /Italian/ });

  fireEvent.click(italian);
  expect(italian).toHaveAttribute("aria-pressed", "true");
  expect(gridNames()).toEqual(["Pizza Paradise", "Pasta Palace"]);

  fireEvent.click(italian);
  expect(gridCards()).toHaveLength(10);
});

it("Should combine quick filters", async () => {
  await renderBody();

  fireEvent.click(screen.getByRole("button", { name: "Pure Veg" }));
  expect(gridCards()).toHaveLength(3);

  fireEvent.click(screen.getByRole("button", { name: "Less than ₹300" }));
  expect(gridNames()).toEqual(["Green Bites", "Dessert Delight"]);
});

it("Should sort by rating", async () => {
  await renderBody();

  fireEvent.change(screen.getByRole("combobox", { name: "Sort by" }), {
    target: { value: "rating" },
  });

  expect(gridNames()[0]).toBe("Dessert Delight");
});

it("Should show an empty state and clear all filters", async () => {
  await renderBody();

  fireEvent.change(screen.getByTestId("searchInput"), { target: { value: "xyz-no-match" } });
  expect(screen.getByText("No restaurants match your filters")).toBeInTheDocument();

  fireEvent.click(screen.getByRole("button", { name: "Clear all filters" }));
  expect(gridCards()).toHaveLength(10);
  expect(screen.getByTestId("searchInput")).toHaveValue("");
});
