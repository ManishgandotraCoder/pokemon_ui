import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import DetailsView from "./container";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchPokemonDetails } from "../../redux/pokemon/pokemonThunks";

const DetailsHelper: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { status, pokemonDetails } = useSelector(
    (state: RootState) => state.pokemon
  );
  const fetchDetails = useCallback(async () => {
    if (!name) {
      return;
    }
    dispatch(fetchPokemonDetails(name));
  }, [name]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  return <DetailsView status={status} details={pokemonDetails} />;
};

export default DetailsHelper;
