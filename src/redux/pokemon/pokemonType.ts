import { PokemonDetailsType } from "../../pages/Details/type";
import { PokemonType } from "../../pages/Home/type";

export type PokemonState = {
  pokemonTypes: PokemonType[];
  pokemonList: PokemonType[];
  pokemonDetails: PokemonDetailsType | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  loading: boolean;
};
