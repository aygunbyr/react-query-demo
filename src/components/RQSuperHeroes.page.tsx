import { useSuperHeroesData } from '../hooks/useSuperHeroesData';

function RQSuperHeroesPage() {
  const onSuccess = (data: string[]): void => {
    console.log('Perform side effect after data fetching', data);
  };

  const onError = (error: Error): void => {
    console.log('Perform side effect after encountering error', error);
  };

  const { isLoading, data, error, isError, isFetching, refetch } =
    useSuperHeroesData(onSuccess, onError);

  if (isLoading || isFetching) {
    return <h2>Loading...</h2>;
  }

  if (isError && error instanceof Error) {
    return <h2>Error: {error && error.message}</h2>;
  }

  return (
    <>
      <h2>RQ Super Heroes Page</h2>
      <button onClick={refetch}>Fetch heroes</button>
      {/* {data &&
        data.data.map((hero: SuperHero) => {
          return <div key={hero.name}>{hero.name}</div>;
        })} */}
      {data &&
        data.map((heroName) => {
          return <div key={heroName}>{heroName}</div>;
        })}
    </>
  );
}

export default RQSuperHeroesPage;
