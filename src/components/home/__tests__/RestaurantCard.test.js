import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import RestaurantCard from "../RestaurantCard";
import { RESTAURANTS } from "../../../data/restaurants";

const byName = (name) => RESTAURANTS.find((r) => r.name === name);

it("Should render name, rating, delivery time, cuisines, area and offer", () => {
  render(<RestaurantCard resData={byName("Burger Hub")} />);

  expect(screen.getByRole("heading", { name: "Burger Hub" })).toBeInTheDocument();
  expect(screen.getByLabelText("Rated 4.1 out of 5")).toBeInTheDocument();
  expect(screen.getByText("20-25 mins")).toBeInTheDocument();
  expect(screen.getByText("Burgers, American, Fast Food")).toBeInTheDocument();
  expect(screen.getByText("Bandra West")).toBeInTheDocument();
  expect(screen.getByText("₹125 OFF ABOVE ₹249")).toBeInTheDocument();
  expect(screen.queryByText("Pure Veg")).not.toBeInTheDocument();
});

it("Should show a Pure Veg badge and no offer when absent", () => {
  render(<RestaurantCard resData={{ ...byName("Green Bites"), aggregatedDiscountInfoV3: undefined }} />);

  expect(screen.getByText("Pure Veg")).toBeInTheDocument();
  expect(screen.queryByText(/OFF/)).not.toBeInTheDocument();
});
