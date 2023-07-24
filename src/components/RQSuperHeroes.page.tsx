import { useQuery } from 'react-query';
import axios from 'axios';
import { SuperHero } from '../types/superhero';

function RQSuperHeroesPage() {
  const fetchSuperHeroes = async () => {
    const data = await axios.get<SuperHero[]>(
      'http://localhost:4000/superheroes'
    );
    return data;
  };

  const { isLoading, data, error, isError } = useQuery(
    ['super-heroes'],
    fetchSuperHeroes
  );

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError && error instanceof Error) {
    return <h2>Error: {error && error.message}</h2>;
  }

  return (
    <>
      <h2>RQ Super Heroes Page</h2>
      {data &&
        data.data.map((hero: SuperHero) => {
          return <div key={hero.name}>{hero.name}</div>;
        })}
    </>
  );
}

export default RQSuperHeroesPage;
