import React from "react";
import { render, screen } from "@testing-library/react";
import Header from ".";
import "@testing-library/jest-dom";

describe("Header Component", () => {
  it("renders the header with correct text", () => {
    render(<Header />);

    // Check if the header text is present
    const headerText = screen.getByText(/Pokemon App/i);
    expect(headerText).toBeInTheDocument();
    expect(headerText).toHaveClass("text-2xl font-bold");
  });

  it("has the correct classes for styling", () => {
    render(<Header />);

    // Check the header element for correct classes
    const headerElement = screen.getByRole("banner");
    expect(headerElement).toHaveClass(
      "bg-gray-800 sticky top-0 z-50 shadow-md text-white"
    );
  });

  it("renders a container div with proper layout classes", () => {
    render(<Header />);

    // Target the container div directly
    const container = screen.getByRole("banner").firstElementChild;

    // Assert the container has the correct classes
    expect(container).toHaveClass(
      "container mx-auto py-4 px-6 flex justify-between items-center"
    );
  });
});
