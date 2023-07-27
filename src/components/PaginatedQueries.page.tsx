import { useState } from 'react';
import { useQuery } from 'react-query';
import axios, { AxiosResponse } from 'axios';

interface Color {
  id: number;
  label: string;
}

const fetchColors = (pageNumber: number): Promise<AxiosResponse<Color[]>> => {
  return axios.get<Color[]>(
    `http://localhost:4000/colors?_limit=2&_page=${pageNumber}`
  );
};

function PaginatedQueriesPage() {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const { isLoading, isError, error, data, isFetching } = useQuery(
    ['colors', pageNumber],
    () => fetchColors(pageNumber),
    {
      keepPreviousData: true,
    }
  );

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError && error instanceof Error) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <div>
        {data?.data.map((color: Color) => {
          return (
            <div key={color.id}>
              <h2>
                {color.id}. {color.label}
              </h2>
            </div>
          );
        })}
      </div>
      <div>
        <button
          onClick={() => setPageNumber((prev) => prev - 1)}
          disabled={pageNumber === 1}
        >
          Previous page
        </button>
        <button
          onClick={() => setPageNumber((prev) => prev + 1)}
          disabled={data?.data.length === 0}
        >
          Next page
        </button>
      </div>
      {isFetching && 'Loading'}
    </>
  );
}

export default PaginatedQueriesPage;
