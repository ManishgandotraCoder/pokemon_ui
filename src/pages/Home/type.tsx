export type PokemonType = {
  name: string;
  url: string;
  image?: string;
};

export type HomeContainerType = {
  types: PokemonType[];
  selectedType: string;
  onTypeChange: (type: string) => void;
  search: string;
  onSearchChange: (search: string) => void;
  filteredPokemons: PokemonType[];
  loading: boolean;
  error: string | null;
};
