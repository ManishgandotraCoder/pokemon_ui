import React from "react";
import { Link } from "react-router-dom";
import { CardType } from "./type";

const Card: React.FC<CardType> = ({ pokemon }) => (
  <Link
    to={`/pokemon/${pokemon.name}`}
    className="group border border-gray-200 rounded-lg shadow-md hover:shadow-xl hover:border-gray-500 transition-transform duration-300 transform hover:scale-105 bg-white"
  >
    {/* Pokémon Image */}
    <div className="flex justify-center p-5 bg-gray-50 rounded-lg">
      <img
        src={pokemon.image}
        alt={pokemon.name}
        className="h-32 w-32 object-contain transition-transform duration-300 group-hover:scale-110"
        loading="lazy" // Lazy loading added here
      />
    </div>

    {/* Pokémon Name */}
    <div className="p-4 border-t pt-3">
      <h3 className="text-lg font-bold text-gray-800 capitalize text-center">
        {pokemon.name}
      </h3>
    </div>
  </Link>
);

export default Card;
