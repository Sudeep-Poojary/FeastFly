import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Grocery from "../Grocery";

describe("Grocery page", () => {
  it("shows the coming-soon hero and aisles", () => {
    render(<Grocery />);

    expect(screen.getByRole("heading", { level: 1, name: "FeastFly Mart" })).toBeInTheDocument();
    expect(screen.getByText("Fruits")).toBeInTheDocument();
  });

  it("validates the email and confirms sign-up", () => {
    render(<Grocery />);

    const input = screen.getByLabelText("Email address");
    fireEvent.change(input, { target: { value: "nope" } });
    fireEvent.click(screen.getByRole("button", { name: "Notify me" }));
    expect(screen.getByText("Please enter a valid email address.")).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "me@example.com" } });
    fireEvent.click(screen.getByRole("button", { name: "Notify me" }));
    expect(screen.getByRole("status")).toHaveTextContent("You're on the list!");
  });
});
