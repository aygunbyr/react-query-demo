import { useQuery } from 'react-query';
import axios, { AxiosError } from 'axios';
import { SuperHero } from '../types/superhero';

const fetchSuperHeroes = async () => {
  const data = await axios.get<SuperHero[]>(
    'http://localhost:4000/4superheroes'
  );
  return data;
};

function RQSuperHeroesPage() {
  const onSuccess = (data: object) => {
    console.log('Perform side effect after data fetching', data);
  };

  const onError = (error: AxiosError) => {
    console.log('Perform side effect after encountering error', error);
  };

  const { isLoading, data, error, isError, isFetching, refetch } = useQuery(
    ['super-heroes'],
    fetchSuperHeroes,
    {
      // cacheTime: 5 * 1000, // default cache time is 300 000 milliseconds (5 minutes)
      // staleTime: 0, // 30000 = refetch every 30 seconds have passed, default = 0
      // refetchOnMount: true, // default = true best option fetch if stale, 'always' = refetch whether stale or not, false = dont refetch
      // refetchOnWindowFocus: 'always',
      // refetchInterval: 2000, // polling. default=false,
      // refetchIntervalInBackground: true, // continue to poll data even when browser is not in focus
      // enabled: false, // false = initial fetch disabled
      onSuccess,
      onError,
      select: (data) => {
        const superHeroNames = data.data.map((hero) => hero.name);
        return superHeroNames;
        // you may also use filter or any other array functions to manipulate array of data
      }, // data transformation
    }
  );

  // console.log({ isFetching, isLoading });

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
