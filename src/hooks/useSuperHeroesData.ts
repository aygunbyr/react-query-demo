import { useQuery } from 'react-query';
import axios from 'axios';
import { SuperHero } from "../types/superhero"

const fetchSuperHeroes = async () => {
  return await axios.get('http://localhost:4000/superheroes');
};

export const useSuperHeroesData = (onSuccess: (data: SuperHero[]) => void, onError: (error: Error) => void) => {
  const { data, error, isError, isFetching, isLoading, refetch } = useQuery(
    ['super-heroes'],
    fetchSuperHeroes,
    {
      onSuccess,
      onError,
      select: (data) => {
        const superHeroNames = data.data.map((hero: SuperHero) => hero.name);
        return superHeroNames;
      },
    }
  );

  return { data, error, isError, isFetching, isLoading, refetch };
};
