import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  useAddSuperHeroData,
  useSuperHeroesData,
} from '../hooks/useSuperHeroesData';
import { SuperHero } from '../types/superhero';
import { AxiosResponse } from 'axios';

function RQSuperHeroesPage() {
  const [name, setName] = useState('');
  const [alterEgo, setAlterEgo] = useState('');

  const onSuccess = (data: AxiosResponse<SuperHero[]>): void => {
    console.log('Perform side effect after data fetching', data);
  };

  const onError = (error: Error): void => {
    console.log('Perform side effect after encountering error', error);
  };

  const { isLoading, data, error, isError, isFetching, refetch } =
    useSuperHeroesData(onSuccess, onError);

  const {
    mutate,
    isLoading: mutateIsLoading,
    isError: mutateIsError,
    error: mutateError,
  } = useAddSuperHeroData();

  const handleAddHeroClick = () => {
    console.log({ name, alterEgo });
    const hero = { name, alterEgo };
    mutate(hero);
  };

  // if (isLoading || isFetching) {
  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError && error instanceof Error) {
    return <h2>Error: {error && error.message}</h2>;
  }

  return (
    <>
      <h2>RQ Super Heroes Page</h2>
      <div>
        <input
          type="text"
          value={name}
          onChange={(e: React.FormEvent<HTMLInputElement>): void =>
            setName(e.currentTarget.value)
          }
        />
        <input
          type="text"
          value={alterEgo}
          onChange={(e: React.FormEvent<HTMLInputElement>): void =>
            setAlterEgo(e.currentTarget.value)
          }
        />
        <button onClick={handleAddHeroClick}>Add Hero</button>
      </div>
      <hr />
      <button onClick={refetch}>Fetch heroes</button>
      {data &&
        data.data.map((hero: SuperHero) => {
          return (
            <div key={hero.id}>
              <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
            </div>
          );
        })}
    </>
  );
}

export default RQSuperHeroesPage;
