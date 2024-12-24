import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Select from ".";
import { selectType } from "./type";
import "@testing-library/jest-dom";

describe("Select Component", () => {
  const mockOnChange = jest.fn();

  const props: selectType = {
    label: "Select Type",
    options: [
      { name: "Option 1", url: "url1" },
      { name: "Option 2", url: "url2" },
    ],
    value: "",
    onChange: mockOnChange,
    placeholder: "Choose an option",
  };

  it("renders the label, placeholder, and options correctly", () => {
    render(<Select {...props} />);

    // Assert the label is rendered
    const labelElement = screen.getByText(/Select Type/i);
    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveClass("text-sm font-medium text-gray-700");

    // Assert the placeholder is rendered
    const placeholderOption = screen.getByText(/Choose an option/i);
    expect(placeholderOption).toBeInTheDocument();
    expect(placeholderOption).toHaveAttribute("value", "");

    // Assert the options are rendered
    const option1 = screen.getByText(/Option 1/i);
    const option2 = screen.getByText(/Option 2/i);
    expect(option1).toBeInTheDocument();
    expect(option2).toBeInTheDocument();
  });

  it("calls onChange when an option is selected", () => {
    render(<Select {...props} />);

    const selectElement = screen.getByRole("combobox");

    // Simulate selecting an option
    fireEvent.change(selectElement, { target: { value: "Option 1" } });

    // Assert the mock function was called with the correct value
    expect(mockOnChange).toHaveBeenCalledWith("Option 1");
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  it("renders without a label if none is provided", () => {
    render(<Select {...props} label={undefined} />);

    // Assert no label is rendered
    const labelElement = screen.queryByText(/Select Type/i);
    expect(labelElement).not.toBeInTheDocument();
  });

  it("renders correctly when no placeholder is provided", () => {
    render(<Select {...props} placeholder={undefined} />);

    // Assert no placeholder option is rendered
    const placeholderOption = screen.queryByText(/Choose an option/i);
    expect(placeholderOption).not.toBeInTheDocument();

    // Assert the options are still rendered
    const option1 = screen.getByText(/Option 1/i);
    const option2 = screen.getByText(/Option 2/i);
    expect(option1).toBeInTheDocument();
    expect(option2).toBeInTheDocument();
  });

  it("renders the select element with the correct value", () => {
    render(<Select {...props} value="Option 2" />);

    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toHaveValue("Option 2");
  });
});
