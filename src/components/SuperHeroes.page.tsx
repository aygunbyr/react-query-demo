import { useState, useEffect } from 'react';
import axios from 'axios';
import { SuperHero } from '../types/superhero';

function SuperHeroesPage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<SuperHero[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    axios
      .get<SuperHero[]>('http://localhost:4000/superheroes')
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((error: Error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Error: {error}</h2>;
  }

  return (
    <div>
      <h2>Super Heroes Page</h2>
      {data.map((hero) => {
        return <div key={hero.name}>{hero.name}</div>;
      })}
    </div>
  );
}

export default SuperHeroesPage;
