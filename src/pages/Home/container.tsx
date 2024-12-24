import React from "react";
import Input from "../../components/Input";
import Select from "../../components/Select";
import Card from "../../components/Card";
import LoadingComponent from "../../components/Loader";
import { HomeContainerType } from "./type";
import VirtualizationGrid from "../../components/VirtualizationGrid";

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
      <div className="flex flex-wrap gap-4 mb-4 items-end">
        <div className="w-full sm:w-1/2 md:w-1/3">
          <Select
            label="Select Pokémon Type"
            options={types}
            value={selectedType}
            onChange={onTypeChange}
            placeholder="Select Pokémon Type"
          />
        </div>

        <div className="w-full sm:w-1/2 md:w-1/3">
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
        <VirtualizationGrid filteredPokemons={filteredPokemons} />
      )}
      {!filteredPokemons.length && (
        <span className="text-red-400">
          Oops! No records found. Please try a different search.{" "}
        </span>
      )}
    </div>
  );
};

export default HomeContainer;
