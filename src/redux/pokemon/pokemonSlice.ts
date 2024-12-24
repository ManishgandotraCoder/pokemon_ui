import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchPokemonTypes,
  fetchPokemonByType,
  fetchPokemonDetails,
} from "./pokemonThunks";
import { PokemonState } from "./pokemonType";
import { PokemonType } from "../../pages/Home/type";
import { PokemonDetailsType } from "../../pages/Details/type";

// Initial State
const initialState: PokemonState = {
  pokemonTypes: [],
  pokemonList: [],
  pokemonDetails: null,
  status: "idle",
  error: null,
  loading: false,
};

// Slice
const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    // Optional: Define additional reducers here if needed
  },
  extraReducers: (builder) => {
    // Handle `fetchPokemonTypes`
    builder
      .addCase(fetchPokemonTypes.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchPokemonTypes.fulfilled,
        (state, action: PayloadAction<PokemonType[]>) => {
          state.status = "succeeded";
          state.pokemonTypes = action.payload;
        }
      )
      .addCase(fetchPokemonTypes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch Pokémon types";
      });

    // Handle `fetchPokemonByType`
    builder
      .addCase(fetchPokemonByType.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchPokemonByType.fulfilled,
        (state, action: PayloadAction<PokemonType[]>) => {
          state.status = "succeeded";
          state.pokemonList = action.payload.map((p) => ({
            name: p.name,
            url: p.url,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
              p.url.split("/").slice(-2, -1)[0]
            }.png`,
          }));
        }
      )
      .addCase(fetchPokemonByType.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch Pokémon by type";
      });

    // Handle `fetchPokemonDetails`
    builder
      .addCase(fetchPokemonDetails.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchPokemonDetails.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.status = "succeeded";
          state.pokemonDetails = action.payload;
        }
      )
      .addCase(fetchPokemonDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch Pokémon details";
      });
  },
});

export default pokemonSlice.reducer;
