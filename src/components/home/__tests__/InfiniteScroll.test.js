import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import "@testing-library/jest-dom";
import Body from "../Body";
import { buildListResponse } from "../../../data/restaurants";
import { MORE_RESTAURANTS } from "../../../data/moreRestaurants";

// Minimal IntersectionObserver mock: tests trigger intersections manually.
let observers = [];
class MockIntersectionObserver {
  constructor(callback) {
    this.callback = callback;
    this.targets = [];
    observers.push(this);
  }
  observe(el) {
    this.targets.push(el);
  }
  disconnect() {
    this.targets = [];
    observers = observers.filter((o) => o !== this);
  }
}

const scrollToBottom = async () => {
  await act(async () => {
    observers.forEach((o) =>
      o.callback(o.targets.map((target) => ({ target, isIntersecting: true })))
    );
  });
};

const gridCards = () => within(screen.getByTestId("restaurantGrid")).getAllByTestId("resCard");

beforeEach(() => {
  observers = [];
  global.IntersectionObserver = MockIntersectionObserver;
  global.fetch = jest.fn(() =>
    Promise.resolve({ ok: true, json: () => Promise.resolve(buildListResponse()) })
  );
});

afterEach(() => {
  delete global.IntersectionObserver;
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

it("Should observe the sentinel after the first page loads", async () => {
  await renderBody();

  expect(gridCards()).toHaveLength(10);
  expect(observers).toHaveLength(1);
  expect(observers[0].targets[0]).toBe(screen.getByTestId("scrollSentinel"));
});

it("Should load the next page when the sentinel comes into view", async () => {
  await renderBody();

  await scrollToBottom();

  expect(gridCards()).toHaveLength(18);
  expect(screen.getByText("Oven Story Pizza")).toBeInTheDocument();
});

it("Should keep loading until the catalogue ends, then stop observing", async () => {
  await renderBody();

  // 30 extra restaurants in pages of 8 → 4 pages.
  for (let i = 0; i < 4; i++) await scrollToBottom();

  const total = 10 + MORE_RESTAURANTS.length;
  expect(gridCards()).toHaveLength(total);
  expect(screen.getByText(`You've seen all ${total} restaurants 🎉`)).toBeInTheDocument();
  expect(observers).toHaveLength(0);
  expect(screen.queryByRole("button", { name: "Show more restaurants" })).not.toBeInTheDocument();
});

it("Should load more with the 'Show more' button too", async () => {
  await renderBody();

  await act(async () => {
    fireEvent.click(screen.getByRole("button", { name: "Show more restaurants" }));
  });

  expect(gridCards()).toHaveLength(18);
});

it("Should apply filters across all loaded pages", async () => {
  await renderBody();
  await scrollToBottom();

  fireEvent.change(screen.getByTestId("searchInput"), { target: { value: "pizza" } });

  // Pizza Paradise (page 1) + Oven Story Pizza (page 2)
  expect(gridCards().map((c) => within(c).getByRole("heading").textContent)).toEqual([
    "Pizza Paradise",
    "Oven Story Pizza",
  ]);
});
