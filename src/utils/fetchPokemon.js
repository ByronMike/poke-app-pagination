import axios from "axios";

const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

export const fetchPokemon = async (page, pageSize, search) => {
  const offset = (page - 1) * pageSize;
  const limit = pageSize;

  const response = await axios.get(BASE_URL, {
    params: {
      offset,
      limit,
    },
  });

  let results = response.data.results;

  // Apply server-side quick filtering
  if (search) {
    results = results.filter((pokemon) =>
      pokemon.name.includes(search.toLowerCase())
    );
  }

  // Add a unique id to each row
  const dataWithId = results.map((pokemon, index) => ({
    id: offset + index + 1,
    ...pokemon,
  }));

  return {
    data: dataWithId,
    total: response.data.count,
  };
};
