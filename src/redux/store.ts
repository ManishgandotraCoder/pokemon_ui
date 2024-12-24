import { configureStore } from "@reduxjs/toolkit";
import pokemonSlice from "./pokemon/pokemonSlice";

export const store = configureStore({
  reducer: {
    pokemon: pokemonSlice,
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
