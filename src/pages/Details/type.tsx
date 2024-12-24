export type PokemonDetailsType = {
  name: string;
  height: number;
  weight: number;
  abilities: { ability: { name: string } }[];
  moves: { move: { name: string } }[];
  sprites: {
    other: {
      ["official-artwork"]: {
        front_default: string;
      };
    };
  };
  types: {
    type: {
      name: string;
    };
  }[];
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
};

export type DetailsContainerProps = {
  status: "idle" | "loading" | "succeeded" | "failed";

  details: PokemonDetailsType | null;
};
