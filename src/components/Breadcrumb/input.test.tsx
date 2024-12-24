import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Breadcrumb from ".";
import "@testing-library/jest-dom";

describe("Breadcrumb Component", () => {
  const renderWithRouter = (path: string) => {
    render(
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path="*" element={<Breadcrumb />} />
        </Routes>
      </MemoryRouter>
    );
  };

  it("renders 'Home' link correctly", () => {
    renderWithRouter("/");

    const homeLink = screen.getByText(/home/i);
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", "/");
    expect(homeLink).toHaveClass("hover:underline text-gray-800");
  });

  it("renders breadcrumb for a single path correctly", () => {
    renderWithRouter("/about");

    // Home link
    const homeLink = screen.getByText(/home/i);
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", "/");

    // Current page
    const aboutText = screen.getByText(/about/i);
    expect(aboutText).toBeInTheDocument();
    expect(aboutText).not.toHaveClass("hover:underline text-gray-800");
  });

  it("renders breadcrumb for nested paths correctly", () => {
    renderWithRouter("/products/electronics");

    // Home link
    const homeLink = screen.getByText(/home/i);
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", "/");

    // Intermediate path (products)
    const productsLink = screen.getByText(/products/i);
    expect(productsLink).toBeInTheDocument();
    expect(productsLink).toHaveAttribute("href", "/products");
    expect(productsLink).toHaveClass("hover:underline text-gray-800");

    // Current page (electronics)
    const electronicsText = screen.getByText(/electronics/i);
    expect(electronicsText).toBeInTheDocument();
    expect(electronicsText).not.toHaveClass("hover:underline text-gray-800");
  });

  it("handles root path correctly", () => {
    renderWithRouter("/");

    // Only Home link should be present
    const homeLink = screen.getByText(/home/i);
    expect(homeLink).toBeInTheDocument();

    const breadcrumbs = screen.queryAllByRole("link");
    expect(breadcrumbs).toHaveLength(1); // Only "Home" link
  });
});
