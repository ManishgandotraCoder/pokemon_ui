import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import Breadcrumb from ".";

describe("Breadcrumb Component", () => {
  const renderWithRouter = (path: string) => {
    render(
      <MemoryRouter initialEntries={[path]}>
        <Route path="*">
          <Breadcrumb />
        </Route>
      </MemoryRouter>
    );
  };

  it("renders 'Home' link correctly", () => {
    renderWithRouter("/");

    const homeLink = screen.getByText(/home/i);
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", "/");
    expect(homeLink).toHaveClass("hover:underline text-blue-500");
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
    expect(aboutText).not.toHaveClass("hover:underline text-blue-500");
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
    expect(productsLink).toHaveClass("hover:underline text-blue-500");

    // Current page (electronics)
    const electronicsText = screen.getByText(/electronics/i);
    expect(electronicsText).toBeInTheDocument();
    expect(electronicsText).not.toHaveClass("hover:underline text-blue-500");
  });

  it("handles root path correctly", () => {
    renderWithRouter("/");

    // Only Home link should be present
    const homeLink = screen.getByText(/home/i);
    expect(homeLink).toBeInTheDocument();

    const breadcrumbs = screen.queryAllByRole("link");
    expect(breadcrumbs).toHaveLength(1); // Only "Home" link
  });

  it("handles deeply nested paths correctly", () => {
    renderWithRouter("/category/subcategory/item");

    // Home link
    const homeLink = screen.getByText(/home/i);
    expect(homeLink).toBeInTheDocument();

    // Intermediate paths
    const categoryLink = screen.getByText(/category/i);
    expect(categoryLink).toBeInTheDocument();
    expect(categoryLink).toHaveAttribute("href", "/category");

    const subcategoryLink = screen.getByText(/subcategory/i);
    expect(subcategoryLink).toBeInTheDocument();
    expect(subcategoryLink).toHaveAttribute("href", "/category/subcategory");

    // Last breadcrumb (item)
    const itemText = screen.getByText(/item/i);
    expect(itemText).toBeInTheDocument();
    expect(itemText).not.toHaveClass("hover:underline text-blue-500");
  });

  it("renders breadcrumbs with capitalized names", () => {
    renderWithRouter("/category/subcategory/item");

    const categoryLink = screen.getByText(/category/i);
    const subcategoryLink = screen.getByText(/subcategory/i);
    const itemText = screen.getByText(/item/i);

    // Ensure capitalization
    expect(categoryLink).toHaveClass("capitalize");
    expect(subcategoryLink).toHaveClass("capitalize");
    expect(itemText).toHaveClass("capitalize");
  });
});
