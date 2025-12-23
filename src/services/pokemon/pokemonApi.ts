import type { AxiosInstance } from 'axios';
import type {
  PokemonListResponse,
  Pokemon,
  PokemonSpecies,
} from '../../types/pokemon';
import type {
  PokemonIdOrName,
  ListParams,
  GenerationNumber,
  SearchTerm,
  PokemonCount,
} from './types';
import { createHttpClient } from './httpClient';
import { handleError } from './errorHandler';
import {
  DEFAULT_LIST_LIMIT,
  DEFAULT_SEARCH_LIMIT,
  GENERATION_RANGES,
  TOTAL_POKEMON_COUNT,
} from './constants';

const createListParams = (limit: number, offset: number): ListParams => ({
  limit,
  offset,
});

const createPokemonId = (value: number | string): PokemonIdOrName => ({
  value,
});

const createGenerationNumber = (value: number): GenerationNumber => ({
  value,
});

const createSearchTerm = (value: string): SearchTerm => ({
  value,
});

const createPokemonCount = (value: number): PokemonCount => ({
  value,
});

const fetchPokemonList = async (
  api: AxiosInstance,
  params: ListParams
): Promise<PokemonListResponse> => {
  const response = await api.get<PokemonListResponse>('/pokemon', { params });
  return response.data;
};

const fetchPokemon = async (
  api: AxiosInstance,
  id: PokemonIdOrName
): Promise<Pokemon> => {
  const response = await api.get<Pokemon>(`/pokemon/${id.value}`);
  return response.data;
};

const fetchPokemonSpecies = async (
  api: AxiosInstance,
  id: PokemonIdOrName
): Promise<PokemonSpecies> => {
  const response = await api.get<PokemonSpecies>(`/pokemon-species/${id.value}`);
  return response.data;
};

const filterPokemonByName = (
  pokemons: PokemonListResponse,
  term: SearchTerm
): PokemonListResponse => {
  const termLower = term.value.toLowerCase();
  const filtered = pokemons.results.filter(pokemon =>
    pokemon.name.toLowerCase().includes(termLower)
  );

  return {
    count: filtered.length,
    next: null,
    previous: null,
    results: filtered,
  };
};

const validateGeneration = (generation: GenerationNumber): void => {
  const isValid = generation.value >= 1 && generation.value <= 9;
  
  if (!isValid) {
    throw new Error('Invalid generation number. Must be between 1 and 9.');
  }
};

const calculateGenerationParams = (
  generation: GenerationNumber
): ListParams => {
  const range = GENERATION_RANGES[generation.value as keyof typeof GENERATION_RANGES];
  const limit = range.end - range.start + 1;
  const offset = range.start - 1;
  
  return createListParams(limit, offset);
};

const generateRandomId = (): number => {
  return Math.floor(Math.random() * TOTAL_POKEMON_COUNT) + 1;
};

const fetchMultiplePokemon = async (
  api: AxiosInstance,
  count: PokemonCount
): Promise<Pokemon[]> => {
  const promises: Promise<Pokemon>[] = [];

  for (let i = 0; i < count.value; i++) {
    const randomId = generateRandomId();
    const id = createPokemonId(randomId);
    promises.push(fetchPokemon(api, id));
  }

  return Promise.all(promises);
};

export const createPokemonApi = () => {
  const api = createHttpClient();

  return {
    getPokemonList: async (
      limit = DEFAULT_LIST_LIMIT,
      offset = 0
    ): Promise<PokemonListResponse> => {
      try {
        const params = createListParams(limit, offset);
        return await fetchPokemonList(api, params);
      } catch (error) {
        throw new Error(`Failed to fetch Pokemon list: ${handleError(error)}`);
      }
    },

    getPokemon: async (idOrName: number | string): Promise<Pokemon> => {
      try {
        const id = createPokemonId(idOrName);
        return await fetchPokemon(api, id);
      } catch (error) {
        throw new Error(
          `Failed to fetch Pokemon '${idOrName}': ${handleError(error)}`
        );
      }
    },

    getPokemonSpecies: async (
      idOrName: number | string
    ): Promise<PokemonSpecies> => {
      try {
        const id = createPokemonId(idOrName);
        return await fetchPokemonSpecies(api, id);
      } catch (error) {
        throw new Error(
          `Failed to fetch Pokemon species '${idOrName}': ${handleError(error)}`
        );
      }
    },

    searchPokemon: async (
      searchTerm: string,
      limit = DEFAULT_SEARCH_LIMIT
    ): Promise<PokemonListResponse> => {
      try {
        const params = createListParams(limit, 0);
        const response = await fetchPokemonList(api, params);
        const term = createSearchTerm(searchTerm);
        return filterPokemonByName(response, term);
      } catch (error) {
        throw new Error(`Failed to search Pokemon: ${handleError(error)}`);
      }
    },

    getPokemonByGeneration: async (
      generation: number
    ): Promise<PokemonListResponse> => {
      try {
        const gen = createGenerationNumber(generation);
        validateGeneration(gen);
        const params = calculateGenerationParams(gen);
        return await fetchPokemonList(api, params);
      } catch (error) {
        throw new Error(
          `Failed to fetch Pokemon for generation ${generation}: ${handleError(error)}`
        );
      }
    },

    getRandomPokemon: async (count = 1): Promise<Pokemon[]> => {
      try {
        const pokemonCount = createPokemonCount(count);
        return await fetchMultiplePokemon(api, pokemonCount);
      } catch (error) {
        throw new Error(`Failed to fetch random Pokemon: ${handleError(error)}`);
      }
    },
  };
};
