import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Input from ".";
import { InputType } from "./type";
import "@testing-library/jest-dom";

describe("Input Component", () => {
  const mockOnChange = jest.fn();

  const props: InputType = {
    label: "Search",
    type: "text",
    value: "",
    onChange: mockOnChange,
    placeholder: "Enter search term",
  };

  it("renders the label and input correctly", () => {
    render(<Input {...props} />);

    // Assert the label is rendered
    const labelElement = screen.getByText(/Search/i);
    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveClass("text-sm font-medium text-gray-700");

    // Assert the input is rendered
    const inputElement = screen.getByPlaceholderText(/Enter search term/i);
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute("type", "text");
    expect(inputElement).toHaveClass(
      "border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-800"
    );
  });

  it("calls onChange when the input value changes", () => {
    render(<Input {...props} />);

    const inputElement = screen.getByPlaceholderText(/Enter search term/i);

    // Simulate user typing
    fireEvent.change(inputElement, { target: { value: "Pikachu" } });

    // Assert the mock function was called with the correct value
    expect(mockOnChange).toHaveBeenCalledWith("Pikachu");
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  it("renders without a label if none is provided", () => {
    render(<Input {...props} label={undefined} />);

    // Assert that no label is rendered
    const labelElement = screen.queryByText(/Search/i);
    expect(labelElement).not.toBeInTheDocument();

    // Assert the input is still rendered
    const inputElement = screen.getByPlaceholderText(/Enter search term/i);
    expect(inputElement).toBeInTheDocument();
  });

  it("renders the correct placeholder", () => {
    render(<Input {...props} />);

    // Assert the placeholder is set correctly
    const inputElement = screen.getByPlaceholderText(/Enter search term/i);
    expect(inputElement).toHaveAttribute("placeholder", "Enter search term");
  });
});
