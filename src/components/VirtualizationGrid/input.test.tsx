import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import VirtualizationGrid from ".";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";

const mockPokemons = Array.from({ length: 100 }, (_, index) => ({
  name: `Pokemon ${index + 1}`,
  image: `https://via.placeholder.com/150?text=Pokemon+${index + 1}`,
}));

describe("VirtualizationGrid Component", () => {
  const renderWithRouter = (ui: React.ReactNode) => {
    return render(<MemoryRouter>{ui}</MemoryRouter>);
  };
  test("renders the VirtualizationGrid component with filtered Pokémon", () => {
    renderWithRouter(<VirtualizationGrid filteredPokemons={mockPokemons} />);

    const container = screen.getByTestId("virtualization-container"); // Updated test selector
    expect(container).toBeInTheDocument();

    const firstCard = screen.getByText("Pokemon 1");
    expect(firstCard).toBeInTheDocument();
  });

  test("adjusts layout based on screen size", () => {
    Object.defineProperty(window, "innerWidth", { writable: true, value: 800 });
    window.dispatchEvent(new Event("resize"));

    renderWithRouter(<VirtualizationGrid filteredPokemons={mockPokemons} />);
    const container = screen.getByTestId("virtualization-container");
    expect(container).toHaveStyle({ overflowY: "auto" });
  });

  test("updates visible items on scroll", () => {
    const { getByTestId } = renderWithRouter(
      <VirtualizationGrid filteredPokemons={mockPokemons} />
    );

    const scrollableDiv = getByTestId("virtualization-container");
    expect(scrollableDiv).toBeInTheDocument();

    fireEvent.scroll(scrollableDiv, { target: { scrollTop: 500 } });

    const visiblePokemon = screen.getByText("Pokemon 10"); // Adjust index to expected visible Pokémon
    expect(visiblePokemon).toBeInTheDocument();
  });

  test("scrolls to top when layout changes", () => {
    const { getByTestId } = renderWithRouter(
      <VirtualizationGrid filteredPokemons={mockPokemons} />
    );

    const scrollableDiv = getByTestId("virtualization-container");
    expect(scrollableDiv).toBeInTheDocument();

    // Simulate scroll
    fireEvent.scroll(scrollableDiv, { target: { scrollTop: 300 } });
    expect(scrollableDiv.scrollTop).toBe(300);

    // Simulate layout change
    Object.defineProperty(window, "innerWidth", { writable: true, value: 400 });
    window.dispatchEvent(new Event("resize"));

    expect(scrollableDiv.scrollTop).toBe(0); // Ensure scroll position resets to the top
  });

  test("renders at least 2 items per row on small screens", () => {
    Object.defineProperty(window, "innerWidth", { writable: true, value: 400 });
    window.dispatchEvent(new Event("resize"));

    renderWithRouter(<VirtualizationGrid filteredPokemons={mockPokemons} />);

    const cards = screen.getAllByRole("heading"); // Assuming each Card has a heading with the Pokémon name
    expect(cards.length).toBeGreaterThanOrEqual(2); // Minimum 2 items rendered
  });

  test("handles empty Pokémon list gracefully", () => {
    renderWithRouter(<VirtualizationGrid filteredPokemons={[]} />);

    const container = screen.getByTestId("virtualization-container");
    expect(container).toBeInTheDocument();

    const cards = screen.queryAllByRole("heading");
    expect(cards).toHaveLength(0); // No Pokémon cards should be rendered
  });
});
