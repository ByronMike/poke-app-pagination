import { Pokemon } from "./fetchPokemon";

export interface PageState {
  page: number;
  pageSize: number;
  isLoading: boolean;
  data: Pokemon[];
  total: number;
  search: string;
}
