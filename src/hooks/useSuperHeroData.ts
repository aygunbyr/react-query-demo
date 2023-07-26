import { useQuery } from "react-query";
import axios from "axios";
import { SuperHero } from "../types/superhero";

// const fetchSuperHero = async (heroId: string) => {
const fetchSuperHero = async ({queryKey}) => {
  const heroId = queryKey[1]
  return await axios.get<SuperHero>(`http://localhost:4000/superheroes/${heroId}`)
}

export const useSuperHeroData = (heroId: string) => {
  // return useQuery(["super-hero",heroId], () => fetchSuperHero(heroId))
  return useQuery(["super-hero",heroId], fetchSuperHero)
}