import { render, screen } from "@testing-library/react";
import Contact from "../Contact";
import "@testing-library/jest-dom";

describe("Contact Us Page Test Cases", () => {
  // beforeAll(() => {
  //   console.log("Before All");
  // });

  // beforeEach(() => {
  //   console.log("Before Each");
  // });

  // afterAll(() => {
  //   console.log("After All");
  // });

  // afterEach(() => {
  //   console.log("After Each");
  // });

  it("Should load contact us component", () => {
    // 1. Render
    render(<Contact />);

    // 2. Query
    const heading = screen.getByRole("heading");

    // 3. Assertion
    expect(heading).toBeInTheDocument();
  });

  it("Should load button inside the contact us component", () => {
    render(<Contact />);

    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
  });

  it("Should load input name inside the coontact us component", () => {
    render(<Contact />);

    const inputName = screen.getByPlaceholderText("name");

    expect(inputName).toBeInTheDocument();
  });

  it("Should load 2 input boxes on the contact us component", () => {
    render(<Contact />);

    const inputBoxes = screen.getAllByRole("textbox");

    // console.log(inputBoxes.length);

    expect(inputBoxes.length).toBe(2);
  });
});
