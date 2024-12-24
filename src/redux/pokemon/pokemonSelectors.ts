import { RootState } from "../store";

export const selectPokemonUser = (state: RootState) =>
  state.pokemon.pokemonList;
export const selectPokemonStatus = (state: RootState) => state.pokemon.status;
export const selectPokemonError = (state: RootState) => state.pokemon.error;
