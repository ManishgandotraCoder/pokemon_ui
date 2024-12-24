import React, { useEffect, useState, useCallback } from "react";
import HomeView from "./container";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  fetchPokemonByType,
  fetchPokemonTypes,
} from "../../redux/pokemon/pokemonThunks";

const HomeHelper: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>("normal");
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const { pokemonList, pokemonTypes, loading, error } = useSelector(
    (state: RootState) => state.pokemon
  );

  // Fetch Pokémon by type
  const fetchPokemons = useCallback(() => {
    dispatch(fetchPokemonByType(selectedType));
  }, [dispatch, selectedType]);

  // Fetch Pokémon types on component mount
  useEffect(() => {
    dispatch(fetchPokemonTypes());
    fetchPokemons();
  }, [dispatch, fetchPokemons]);

  // Debounce the search input
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 300); // Debounce delay
    return () => clearTimeout(handler);
  }, [search]);

  // Filter Pokémon by search term
  const filteredPokemons = debouncedSearch
    ? pokemonList.filter((p) =>
        p.name.toLowerCase().includes(debouncedSearch.toLowerCase())
      )
    : pokemonList;

  return (
    <HomeView
      types={pokemonTypes || []}
      selectedType={selectedType}
      onTypeChange={setSelectedType}
      search={search}
      onSearchChange={setSearch}
      filteredPokemons={filteredPokemons}
      loading={loading}
      error={error}
    />
  );
};

export default HomeHelper;
