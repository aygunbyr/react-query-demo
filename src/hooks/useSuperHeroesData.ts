import { useQuery, useMutation, useQueryClient } from 'react-query';
// import axios, { AxiosResponse } from 'axios';
import { request } from '../utils/axios-utils';
import { SuperHero } from "../types/superhero"

const fetchSuperHeroes = async () => {
  // return await axios.get<SuperHero[]>('http://localhost:4000/superheroes');
  return request({url: '/superheroes'})
};

const addSuperHero = async (hero: SuperHero) => {
  // return await axios.post('http://localhost:4000/superheroes', hero)
  return request({url: '/superheroes', method: 'POST', data: hero})
}

export const useSuperHeroesData = (onSuccess: (data: AxiosResponse<SuperHero[]>) => void, onError: (error: Error) => void) => {
  const { data, error, isError, isFetching, isLoading, refetch } = useQuery(
    ['super-heroes'],
    fetchSuperHeroes,
    {
      onSuccess,
      onError,
    }
  );

  return { data, error, isError, isFetching, isLoading, refetch };
};

export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient();

  return useMutation(addSuperHero, {
    // onSuccess: (data:AxiosResponse<SuperHero>) => {
    //   // queryClient.invalidateQueries('super-heroes') // invalidate and refetch after adding

    //   // update query (state) after adding, do not refetch again since we know it is successfully added
    //   queryClient.setQueryData<SuperHero[] | undefined>('super-heroes', (oldQueryData:unknown)=>{
    //     return {
    //       ...oldQueryData,
    //       data: [...oldQueryData.data, data.data],
    //     }
    //   })
    // }

    // Optimistic updates
    onMutate: async (newHero: SuperHero) => {
      await queryClient.cancelQueries('super-heroes')
      const previousHeroData = queryClient.getQueryData('super-heroes')
      queryClient.setQueryData('super-heroes', (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [...oldQueryData?.data, 
            {id: oldQueryData?.data?.length + 1, ...newHero},
          ]
        }
      })
      return {
        // this will be used to rollback data in case the mutation errors out
        previousHeroData,
      }
    },
    onError: (_error: Error, _hero: SuperHero, context) => {
      queryClient.setQueryData('super-heroes', context?.previousHeroData)
      console.log(`Error: ${_error.message}`)
    },
    onSettled: () => {
      queryClient.invalidateQueries('super-heroes')
    },
  })
}