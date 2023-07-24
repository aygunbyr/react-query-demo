import { useState, useEffect } from 'react';
import axios from 'axios';
import { SuperHero } from '../types/superhero';

function SuperHeroesPage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<SuperHero[]>([]);

  useEffect(() => {
    axios.get('http://localhost:4000/superheroes').then((res) => {
      setData(res.data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <h2>Loading...</h2>;
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
