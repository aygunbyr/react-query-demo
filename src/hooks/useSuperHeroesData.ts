import { useQuery } from 'react-query';
import axios, { AxiosResponse } from 'axios';
import { SuperHero } from "../types/superhero"

const fetchSuperHeroes = async () => {
  return await axios.get<SuperHero[]>('http://localhost:4000/superheroes');
};

export const useSuperHeroesData = (onSuccess: (data: AxiosResponse<SuperHero[]>) => void, onError: (error: Error) => void) => {
  const { data, error, isError, isFetching, isLoading, refetch } = useQuery(
    ['super-heroes'],
    fetchSuperHeroes,
    {
      onSuccess,
      onError,
    }
  );

  return { data, error, isError, isFetching, isLoading, refetch };
};
