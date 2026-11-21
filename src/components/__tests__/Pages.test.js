import { act, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import About from "../About";
import Grocery from "../Grocery";

describe("About page", () => {
  it("shows the story, catalogue stats and the GitHub profile", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            name: "Test Dev",
            bio: "Builds things",
            avatar_url: "https://example.com/a.png",
            html_url: "https://github.com/test-dev",
          }),
      })
    );

    await act(async () => {
      render(<About />);
    });

    expect(screen.getByRole("heading", { level: 1, name: "About FeastFly" })).toBeInTheDocument();
    expect(screen.getByText("Restaurants").nextSibling).toHaveTextContent("40");
    expect(screen.getByRole("heading", { name: "Test Dev" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Test Dev's avatar" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /View on GitHub/ })).toHaveAttribute(
      "href",
      "https://github.com/test-dev"
    );
  });

  it("still renders when the GitHub request fails", async () => {
    global.fetch = jest.fn(() => Promise.resolve({ ok: false, status: 403 }));

    await act(async () => {
      render(<About />);
    });

    expect(screen.getByText("Couldn't load the GitHub profile right now.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /View on GitHub/ })).toHaveAttribute(
      "href",
      "https://github.com/Sudeep-Poojary"
    );
  });
});

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
