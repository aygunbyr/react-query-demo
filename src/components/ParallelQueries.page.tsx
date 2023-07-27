import { useQuery } from 'react-query';
import axios from 'axios';

// In the provided code, the functions are not defined inside the function component to prevent them from being recreated every time the component renders. This decision is made to optimize performance.

// React recreates functions during each render process. If these functions were defined inside the function component, they would be recreated every time the component renders. As a result, the useQuery functions would have different function references on each render, causing React to perceive them as changes and re-execute state and effect updates. This could lead to unintended side effects and unnecessary network requests.

// To avoid this issue, it is a common practice to define such functions outside the component, typically above the component definition. By doing so, the functions are only created once, and they maintain the same function references across renders. This prevents them from being affected by mount/unmount events or state changes in the component, improving performance and preventing unnecessary re-renders.

const fetchSuperHeroes = () => {
  return axios.get('http://localhost:4000/superheroes');
};

const fetchFriends = () => {
  return axios.get('http://localhost:4000/friends');
};

function ParallelQueriesPage() {
  const { data: superheroes } = useQuery('super-heroes', fetchSuperHeroes);
  const { data: friends } = useQuery('friends', fetchFriends);

  return <div>ParallelQueriesPage</div>;
}

export default ParallelQueriesPage;
