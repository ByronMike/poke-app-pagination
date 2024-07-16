import { BASE_URL } from "./constants";
import { Pokemon } from "@/types/fetchPokemon";

export const fetchPokemon = async (
  page: number,
  pageSize: number,
  search: string
) => {
  const offset = (page - 1) * pageSize;
  const limit = pageSize;

  const URL = `${BASE_URL}?offset=${offset}&limit=${limit}`;

  const response = await fetch(URL);
  const data = await response.json();
  let results = data.results;

  if (search) {
    results = results.filter((pokemon: Pokemon) =>
      pokemon.name.includes(search.toLowerCase())
    );
  }

  const dataWithId = results.map((pokemon: Pokemon, index: number) => ({
    id: offset + index + 1,
    ...pokemon,
  }));

  return {
    data: dataWithId,
    total: data.count,
  };
};
