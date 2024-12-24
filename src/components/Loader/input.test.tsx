import React from "react";
import { render, screen } from "@testing-library/react";
import LoadingComponent from ".";
import "@testing-library/jest-dom";

describe("LoadingComponent", () => {
  it("renders the loading spinner and text when loading is true", () => {
    render(<LoadingComponent loading={true} />);

    // Check if the spinner is rendered
    const spinner = screen.getByRole("status");
    expect(spinner).toBeInTheDocument();

    // Check if the loading text is rendered
    const loadingText = screen.getByText(/Loading.../i);
    expect(loadingText).toBeInTheDocument();
  });

  it("does not render anything when loading is false or undefined", () => {
    const { container } = render(<LoadingComponent loading={false} />);

    // Assert no content is rendered
    expect(container.firstChild).toBeNull();
  });

  it("handles no `loading` prop gracefully", () => {
    const { container } = render(<LoadingComponent />);

    // Assert no content is rendered
    expect(container.firstChild).toBeNull();
  });
});
