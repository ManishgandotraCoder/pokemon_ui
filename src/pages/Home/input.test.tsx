import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import HomeContainer from "./container";
import "@testing-library/jest-dom";

// Mock child components
jest.mock("../../components/Input", () => ({
  __esModule: true,
  default: ({ label, value, onChange, placeholder }: any) => (
    <div>
      <label>{label}</label>
      <input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  ),
}));

jest.mock("../../components/Select", () => ({
  __esModule: true,
  default: ({ label, options, value, onChange, placeholder }: any) => (
    <div>
      <label>{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        data-testid="select-dropdown"
      >
        <option value="">{placeholder}</option>
        {options.map((option: any) => (
          <option key={option.url} value={option.name}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  ),
}));

jest.mock("../../components/Card", () => ({
  __esModule: true,
  default: ({ pokemon }: any) => <div>{pokemon.name}</div>,
}));

jest.mock("../../components/Loader", () => ({
  __esModule: true,
  default: () => <div>Loading...</div>,
}));

describe("HomeContainer Component", () => {
  const mockProps = {
    types: [
      { name: "fire", url: "url1" },
      { name: "water", url: "url2" },
    ],
    selectedType: "fire",
    onTypeChange: jest.fn(),
    search: "Pikachu",
    onSearchChange: jest.fn(),
    filteredPokemons: [
      { name: "Pikachu", image: "pikachu.png", id: 1, url: "electric" },
      { name: "Charmander", image: "charmander.png", id: 4, url: "fire" },
    ],
    loading: false,
    error: "",
  };

  it("renders the loading component when loading is true", () => {
    render(<HomeContainer {...mockProps} loading={true} />);

    // Assert loading component is rendered
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

    // Assert Pokémon cards are not rendered
    expect(screen.queryByText(/Pikachu/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Charmander/i)).not.toBeInTheDocument();
  });

  it("calls onTypeChange when a new type is selected", () => {
    render(<HomeContainer {...mockProps} />);

    const selectElement = screen.getByTestId("select-dropdown");

    // Simulate type change
    fireEvent.change(selectElement, { target: { value: "water" } });

    expect(mockProps.onTypeChange).toHaveBeenCalledWith("water");
  });

  it("calls onSearchChange when search input changes", () => {
    render(<HomeContainer {...mockProps} />);

    const searchInput = screen.getByPlaceholderText(/Enter Pokémon name/i);

    // Simulate search input change
    fireEvent.change(searchInput, { target: { value: "Charmander" } });

    expect(mockProps.onSearchChange).toHaveBeenCalledWith("Charmander");
  });

  it("renders the loading component when loading is true", () => {
    render(<HomeContainer {...mockProps} loading={true} />);

    // Assert loading component is rendered
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

    // Assert Pokémon cards are not rendered
    expect(screen.queryByText(/Pikachu/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Charmander/i)).not.toBeInTheDocument();
  });

  it("renders an error message when error exists", () => {
    render(<HomeContainer {...mockProps} error="Failed to load data." />);

    // Assert error message is displayed
    expect(screen.getByText(/Failed to load data./i)).toBeInTheDocument();

    // Assert Pokémon cards are not rendered
    expect(screen.queryByText(/Pikachu/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Charmander/i)).not.toBeInTheDocument();
  });

  it("renders a message when no Pokémon are available", () => {
    render(<HomeContainer {...mockProps} filteredPokemons={[]} />);

    // Assert that no Pokémon message is displayed
    expect(screen.queryByText(/Pikachu/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Charmander/i)).not.toBeInTheDocument();
  });
});
