import { act, fireEvent, render, screen } from "@testing-library/react";
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

it("Should search the restaurant list for 'burger'", async () => {
  await renderBody();

  expect(screen.getAllByTestId("resCard").length).toBe(10);

  fireEvent.change(screen.getByTestId("searchInput"), {
    target: { value: "burger" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Search" }));

  expect(screen.getAllByTestId("resCard").length).toBe(1);
  expect(screen.getByText("Burger Hub")).toBeInTheDocument();
});

it("Should filter Top Rated Restaurants", async () => {
  await renderBody();

  expect(screen.getAllByTestId("resCard").length).toBe(10);

  fireEvent.click(screen.getByRole("button", { name: "Top Rated Restaurants" }));

  // Ratings above 4.3: 4.6, 4.5, 4.7, 4.4, 4.4
  expect(screen.getAllByTestId("resCard").length).toBe(5);
});
