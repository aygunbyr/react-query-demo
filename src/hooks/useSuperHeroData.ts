import { useQuery, useQueryClient} from "react-query";
import axios, { AxiosResponse } from "axios";
import { SuperHero } from "../types/superhero";

// const fetchSuperHero = async (heroId: string) => {
const fetchSuperHero = async ({queryKey} : {queryKey: string[]}) => {
  const heroId = queryKey[1]
  return await axios.get<SuperHero>(`http://localhost:4000/superheroes/${heroId}`)
}

export const useSuperHeroData = (heroId: string) => {
  // return useQuery(["super-hero",heroId], () => fetchSuperHero(heroId))

  // Initial Query Data
  // Get query client instance using hook
  const queryClient = useQueryClient()


  // Initial Query Data 
  return useQuery(["super-hero",heroId], fetchSuperHero, {
    initialData: () => {
      const hero = queryClient.getQueryData<AxiosResponse<SuperHero[]>>("super-heroes")?.data?.find(hero => hero.id === parseInt(heroId))

      if(hero) {
        return {
          data: hero
        }
      } else {
        return undefined
      }
    }
  })
}