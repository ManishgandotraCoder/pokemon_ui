import React from "react";
import Input from "../../components/Input";
import Select from "../../components/Select";
import Card from "../../components/Card";
import LoadingComponent from "../../components/Loader";
import { HomeContainerType } from "./type";

const HomeContainer: React.FC<HomeContainerType> = ({
  types,
  selectedType,
  onTypeChange,
  search,
  onSearchChange,
  filteredPokemons,
  loading,
  error,
}) => {
  return (
    <div className="px-4 md:px-8 lg:px-16">
      {/* Filters */}
      <div className="flex flex-wrap space-x-4 mb-4 items-end m-5">
        {/* Select Dropdown */}
        <div className="w-full sm:w-1/2 md:w-1/4">
          <Select
            label="Select Pokémon Type"
            options={types}
            value={selectedType}
            onChange={onTypeChange}
            placeholder="Select Pokémon Type"
          />
        </div>

        {/* Search Input */}
        <div className="w-full sm:w-1/2 md:w-1/4">
          <Input
            label="Search Pokémon"
            type="text"
            value={search}
            onChange={onSearchChange}
            placeholder="Enter Pokémon name"
          />
        </div>
      </div>

      {/* Loading/Error Messages */}
      {loading ? (
        <LoadingComponent />
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        // Pokémon List
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filteredPokemons.map((pokemon) => (
            <Card
              key={pokemon.name}
              pokemon={{ ...pokemon, image: pokemon.image || "" }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomeContainer;
