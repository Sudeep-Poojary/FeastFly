import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Contact, { validateContact } from "../Contact";

const fill = (label, value) =>
  fireEvent.change(screen.getByLabelText(label), { target: { value } });

describe("Contact page", () => {
  it("renders the heading, labelled fields and submit button", () => {
    render(<Contact />);

    expect(screen.getByRole("heading", { level: 1, name: "Help & Support" })).toBeInTheDocument();
    expect(screen.getByLabelText("Name")).toHaveAttribute("placeholder", "Name");
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Message")).toBeInTheDocument();
    expect(screen.getAllByRole("textbox")).toHaveLength(3);
    expect(screen.getByRole("button", { name: "Send message" })).toBeInTheDocument();
  });

  it("shows FAQs", () => {
    render(<Contact />);

    expect(screen.getByText("When is delivery free?")).toBeInTheDocument();
  });

  it("shows inline errors and focuses the first invalid field", () => {
    render(<Contact />);

    fill("Email", "not-an-email");
    fireEvent.click(screen.getByRole("button", { name: "Send message" }));

    expect(screen.getByText("Please enter your name.")).toBeInTheDocument();
    expect(screen.getByText("Please enter a valid email address.")).toBeInTheDocument();
    expect(screen.getByText("Please write at least 10 characters.")).toBeInTheDocument();
    expect(screen.getByLabelText("Name")).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByLabelText("Name")).toHaveFocus();
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("clears a field's error as soon as it is edited", () => {
    render(<Contact />);

    fireEvent.click(screen.getByRole("button", { name: "Send message" }));
    fill("Name", "A");

    expect(screen.queryByText("Please enter your name.")).not.toBeInTheDocument();
    expect(screen.getByText("Please enter your email.")).toBeInTheDocument();
  });

  it("confirms and resets on a valid submit", () => {
    render(<Contact />);

    fill("Name", "  Asha ");
    fill("Email", "asha@example.com");
    fill("Message", "Loved the biryani, thanks!");
    fireEvent.click(screen.getByRole("button", { name: "Send message" }));

    expect(screen.getByRole("status")).toHaveTextContent("Thanks, Asha!");
    expect(screen.getByLabelText("Name")).toHaveValue("");
    expect(screen.getByLabelText("Message")).toHaveValue("");
  });
});

describe("validateContact", () => {
  it("accepts a complete form", () => {
    expect(validateContact({ name: "A", email: "a@b.co", message: "Hello there!" })).toEqual({});
  });
});
