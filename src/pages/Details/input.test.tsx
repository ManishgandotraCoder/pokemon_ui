import React from "react";
import { render, screen } from "@testing-library/react";
import DetailsContainer from "./container";
import { DetailsContainerProps } from "./type";
import "@testing-library/jest-dom";

// Mock the LoadingComponent
jest.mock("../../components/Loader", () => ({
  __esModule: true,
  default: ({ loading }: { loading?: boolean }) => {
    return loading ? <div>Mock Loading Spinner...</div> : null;
  },
}));

describe("DetailsContainer Component", () => {
  const mockDetails: DetailsContainerProps["details"] = {
    name: "pikachu",
    height: 4,
    weight: 60,
    sprites: {
      other: {
        "official-artwork": {
          front_default: "https://example.com/pikachu.png",
        },
      },
    },
    types: [{ type: { name: "electric" } }],
    stats: [
      {
        stat: { name: "speed" },
        base_stat: 0,
      },
    ],
    abilities: [{ ability: { name: "static" } }],
    moves: [{ move: { name: "thunderbolt" } }],
  };

  it("renders the loading spinner when status is 'loading'", () => {
    render(<DetailsContainer status="loading" details={null} />);

    // Assert the mocked loading spinner is rendered
    const spinner = screen.getByText("Mock Loading Spinner...");
    expect(spinner).toBeInTheDocument();
  });

  it("renders an error message when status is 'failed'", () => {
    render(<DetailsContainer status="failed" details={null} />);

    // Assert the error message is rendered
    const errorMessage = screen.getByText(/Failed to load Pokémon details./i);
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveClass("text-red-600");
  });

  it("renders a message when details are unavailable", () => {
    render(<DetailsContainer details={null} status="idle" />);

    // Assert the "no details" message is rendered
    const noDetailsMessage = screen.getByText(/No Pokémon details available./i);
    expect(noDetailsMessage).toBeInTheDocument();
    expect(noDetailsMessage).toHaveClass("text-gray-600");
  });

  it("renders Pokémon details correctly when available", () => {
    render(<DetailsContainer status="idle" details={mockDetails} />);

    // Assert the Pokémon name is displayed
    const pokemonName = screen.getByText(/pikachu/i);
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonName).toHaveClass("text-3xl font-bold text-gray-800");

    // Assert the Pokémon image is displayed
    const pokemonImage = screen.getByAltText(/pikachu/i);
    expect(pokemonImage).toBeInTheDocument();
    expect(pokemonImage).toHaveAttribute(
      "src",
      "https://example.com/pikachu.png"
    );

    // Assert types, stats, abilities, and moves are rendered
    expect(screen.getByText(/Types/i)).toBeInTheDocument();
    expect(screen.getByText(/electric/i)).toBeInTheDocument();

    expect(screen.getByText(/Stats/i)).toBeInTheDocument();
    expect(screen.getByText(/speed/i)).toBeInTheDocument();

    expect(screen.getByText(/Abilities/i)).toBeInTheDocument();
    expect(screen.getByText(/static/i)).toBeInTheDocument();

    expect(screen.getByText(/Moves/i)).toBeInTheDocument();
    expect(screen.getByText(/thunderbolt/i)).toBeInTheDocument();
  });
});
