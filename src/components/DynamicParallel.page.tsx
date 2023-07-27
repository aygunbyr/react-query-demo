import { useQueries } from 'react-query';
import axios from 'axios';

const fetchSuperHero = (heroId: number) => {
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

function DynamicParallelPage({ heroIds }: { heroIds: number[] }) {
  const queryResults = useQueries(
    heroIds.map((id: number) => {
      return {
        queryKey: ['super-hero', id],
        queryFn: () => fetchSuperHero(id),
      };
    })
  );

  console.log({ queryResults });

  return <div>DynamicParallelPage</div>;
}

export default DynamicParallelPage;
