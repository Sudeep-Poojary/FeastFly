import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import "@testing-library/jest-dom";
import Header from "../Header";
import appStore from "../../../utils/appStore";

const renderHeader = () =>
  render(
    <BrowserRouter>
      <Provider store={appStore}>
        <Header />
      </Provider>
    </BrowserRouter>
  );

it("Should render the FeastFly logo linking home", () => {
  renderHeader();

  expect(screen.getByRole("link", { name: "FeastFly home" })).toHaveAttribute("href", "/");
});

it("Should render the main nav links", () => {
  renderHeader();

  for (const name of ["Grocery", "About", "Help"]) {
    expect(screen.getByRole("link", { name })).toBeInTheDocument();
  }
});

it("Should render the cart with 0 items", () => {
  renderHeader();

  expect(screen.getByRole("link", { name: "Cart, 0 items" })).toBeInTheDocument();
  expect(screen.getByTestId("cartCount")).toHaveTextContent("0");
});

it("Should toggle Sign In to the user's name on click", () => {
  renderHeader();

  fireEvent.click(screen.getByRole("button", { name: "Sign In" }));

  expect(screen.getByRole("button", { name: "Guest" })).toBeInTheDocument();
});

it("Should open and close the mobile menu", () => {
  renderHeader();

  const toggle = screen.getByRole("button", { name: "Open menu" });
  expect(toggle).toHaveAttribute("aria-expanded", "false");

  fireEvent.click(toggle);
  expect(screen.getByRole("navigation", { name: "Mobile" })).toBeInTheDocument();

  fireEvent.click(screen.getByRole("button", { name: "Close menu" }));
  expect(screen.queryByRole("navigation", { name: "Mobile" })).not.toBeInTheDocument();
});
