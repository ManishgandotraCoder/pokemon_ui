import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { PokemonType } from "../../pages/Home/type";

const API_BASE_URL = "https://pokeapi.co/api/v2";

/**
 * Generic error handler to avoid repetitive code.
 */
const handleError = (error: any, defaultMessage: string) => {
  return error.response?.data?.message || error.message || defaultMessage;
};

/**
 * Fetch Pokémon Types
 */
export const fetchPokemonTypes = createAsyncThunk<
  PokemonType[],
  void,
  { rejectValue: string }
>("pokemon/fetchTypes", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/type`);
    // Validate that `results` exist and is an array
    if (!response.data.results || !Array.isArray(response.data.results)) {
      throw new Error("Invalid response structure for Pokémon types");
    }
    return response.data.results as PokemonType[];
  } catch (error: any) {
    return rejectWithValue(handleError(error, "Failed to fetch Pokémon types"));
  }
});

/**
 * Fetch Pokémon by Type
 * @param type - The type of Pokémon to fetch
 */
export const fetchPokemonByType = createAsyncThunk<
  PokemonType[],
  string, // The `type` is a string
  { rejectValue: string }
>("pokemon/fetchByType", async (type, { rejectWithValue }) => {
  try {
    if (!type) {
      throw new Error("Type parameter is required");
    }
    const response = await axios.get(`${API_BASE_URL}/type/${type}`);
    // Validate the `pokemon` field in the response
    if (!response.data.pokemon || !Array.isArray(response.data.pokemon)) {
      throw new Error("Invalid response structure for Pokémon by type");
    }
    return response.data.pokemon.map((p: any) => p.pokemon) as PokemonType[];
  } catch (error: any) {
    return rejectWithValue(
      handleError(error, "Failed to fetch Pokémon by type")
    );
  }
});

/**
 * Fetch Pokémon Details
 * @param name - The name of the Pokémon to fetch details for
 */
export const fetchPokemonDetails = createAsyncThunk<
  PokemonType,
  string, // The `name` is a string
  { rejectValue: string }
>("pokemon/fetchDetails", async (name, { rejectWithValue }) => {
  try {
    if (!name) {
      throw new Error("Name parameter is required");
    }
    const response = await axios.get(`${API_BASE_URL}/pokemon/${name}`);
    // Validate the response structure
    if (!response.data || typeof response.data !== "object") {
      throw new Error("Invalid response structure for Pokémon details");
    }
    return response.data as PokemonType;
  } catch (error: any) {
    return rejectWithValue(
      handleError(error, "Failed to fetch Pokémon details")
    );
  }
});
