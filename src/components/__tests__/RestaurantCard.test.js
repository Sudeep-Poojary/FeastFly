import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import RestaurantCard from "../RestaurantCard";
import { RESTAURANTS } from "../../data/restaurants";

it("Should render RestaurantCard component with props data", () => {
  const burgerHub = RESTAURANTS.find((r) => r.name === "Burger Hub");

  render(<RestaurantCard resData={burgerHub} />);

  expect(screen.getByText("Burger Hub")).toBeInTheDocument();
  expect(screen.getByText("Burgers, American, Fast Food")).toBeInTheDocument();
  expect(screen.getByText("₹125 OFF ABOVE ₹249")).toBeInTheDocument();
});
