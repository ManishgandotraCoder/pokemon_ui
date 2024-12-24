import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Card from ".";
import { CardType } from "./type";
import "@testing-library/jest-dom";

describe("Card Component", () => {
  const mockPokemon: CardType["pokemon"] = {
    name: "pikachu",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
  };

  it("renders the Pokémon name and image", () => {
    render(
      <MemoryRouter>
        <Card pokemon={mockPokemon} />
      </MemoryRouter>
    );

    // Assert Pokémon name is rendered
    const pokemonName = screen.getByText(/pikachu/i);
    expect(pokemonName).toBeInTheDocument();

    // Assert Pokémon image is rendered
    const pokemonImage = screen.getByAltText(/pikachu/i);
    expect(pokemonImage).toBeInTheDocument();
    expect(pokemonImage).toHaveAttribute("src", mockPokemon.image);
    expect(pokemonImage).toHaveAttribute("alt", "pikachu");
  });

  it("renders the correct link URL", () => {
    render(
      <MemoryRouter>
        <Card pokemon={mockPokemon} />
      </MemoryRouter>
    );

    // Assert the link points to the correct URL
    const linkElement = screen.getByRole("link");
    expect(linkElement).toHaveAttribute("href", `/pokemon/${mockPokemon.name}`);
  });

  it("applies the correct CSS classes", () => {
    render(
      <MemoryRouter>
        <Card pokemon={mockPokemon} />
      </MemoryRouter>
    );

    // Assert the link has the correct CSS classes
    const linkElement = screen.getByRole("link");
    expect(linkElement).toHaveClass(
      "group border border-gray-200 rounded-lg shadow-md hover:shadow-xl hover:border-gray-500 transition-transform duration-300 transform hover:scale-105 bg-white"
    );
  });

  it("ensures the image uses lazy loading", () => {
    render(
      <MemoryRouter>
        <Card pokemon={mockPokemon} />
      </MemoryRouter>
    );

    // Assert the image has a lazy loading attribute
    const pokemonImage = screen.getByAltText(/pikachu/i);
    expect(pokemonImage).toHaveAttribute("loading", "lazy");
  });
});
