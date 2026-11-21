import { act, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import About from "../About";

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
