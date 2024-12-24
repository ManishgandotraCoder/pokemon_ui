import React from "react";
import { DetailsContainerProps } from "./type";
import LoadingComponent from "../../components/Loader";

const DetailsContainer: React.FC<DetailsContainerProps> = ({
  status,
  details,
}) => {
  const renderList = (title: string, items: string[]) => (
    <div>
      <h2 className="text-lg font-semibold text-gray-600">{title}</h2>
      <p className="text-gray-700">{items.join(", ")}</p>
    </div>
  );

  if (status === "loading") {
    return <LoadingComponent loading />;
  }

  if (status === "failed") {
    return <p className="text-red-600">Failed to load Pokémon details.</p>;
  }

  if (!details) {
    return <p className="text-gray-600">No Pokémon details available.</p>;
  }

  const { name, sprites, types, stats, abilities, moves } = details;

  return (
    <div className="p-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Pokémon Image */}
        <div className="bg-gray-100 p-6 flex justify-center">
          <img
            src={sprites.other["official-artwork"].front_default}
            alt={name}
            className="w-40 h-40 object-contain"
          />
        </div>

        {/* Pokémon Details */}
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800 capitalize mb-4">
            {name}
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-1 gap-6">
            {renderList(
              "Types",
              types.map((type) => type.type.name)
            )}
            {renderList(
              "Stats",
              stats.map((stat) => stat.stat.name)
            )}
            {renderList(
              "Abilities",
              abilities.map((ability) => ability.ability.name)
            )}
            {renderList(
              "Moves",
              moves.map((move) => move.move.name)
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsContainer;
