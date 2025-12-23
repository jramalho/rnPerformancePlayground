import axios, { AxiosInstance, AxiosError } from 'axios';
import type {
  PokemonListResponse,
  Pokemon,
  PokemonSpecies,
} from '../types/pokemon';

/**
 * PokeAPI Service
 * 
 * Service for connecting to the PokeAPI (https://pokeapi.co/)
 * This service provides methods to fetch Pokemon data including:
 * - List of Pokemon with pagination
 * - Individual Pokemon details
 * - Pokemon species information
 * 
 * The API does not require authentication and is rate-limit free.
 * However, it's recommended to implement caching to reduce unnecessary requests.
 */
class PokeAPIService {
  private api: AxiosInstance;
  private readonly BASE_URL = 'https://pokeapi.co/api/v2';

  constructor() {
    // Create axios instance with default configuration
    this.api = axios.create({
      baseURL: this.BASE_URL,
      timeout: 10000, // 10 seconds timeout
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    // Add request interceptor for logging (optional)
    this.api.interceptors.request.use(
      config => {
        if (__DEV__) {
          console.log(`[PokeAPI] Request: ${config.method?.toUpperCase()} ${config.url}`);
        }
        return config;
      },
      error => {
        if (__DEV__) {
          console.error('[PokeAPI] Request Error:', error);
        }
        return Promise.reject(error);
      }
    );

    // Add response interceptor for error handling
    this.api.interceptors.response.use(
      response => {
        if (__DEV__) {
          console.log(`[PokeAPI] Response: ${response.status} ${response.config.url}`);
        }
        return response;
      },
      error => {
        if (__DEV__) {
          console.error('[PokeAPI] Response Error:', this.handleError(error));
        }
        return Promise.reject(error);
      }
    );
  }

  /**
   * Handle API errors
   */
  private handleError(error: unknown): string {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        // Server responded with error status
        return `Error ${axiosError.response.status}: ${axiosError.response.statusText}`;
      } else if (axiosError.request) {
        // Request was made but no response received
        return 'Network error: No response from server';
      } else {
        // Error setting up the request
        return `Request error: ${axiosError.message}`;
      }
    }
    return 'Unknown error occurred';
  }

  /**
   * Get a paginated list of Pokemon
   * 
   * @param limit - Number of Pokemon to fetch (default: 20, max: 100000)
   * @param offset - Number of Pokemon to skip (default: 0)
   * @returns Promise with list of Pokemon
   * 
   * @example
   * const pokemons = await pokeAPIService.getPokemonList(20, 0);
   */
  async getPokemonList(
    limit: number = 20,
    offset: number = 0
  ): Promise<PokemonListResponse> {
    try {
      const response = await this.api.get<PokemonListResponse>('/pokemon', {
        params: { limit, offset },
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch Pokemon list: ${this.handleError(error)}`);
    }
  }

  /**
   * Get detailed information about a specific Pokemon
   * 
   * @param idOrName - Pokemon ID (number) or name (string)
   * @returns Promise with Pokemon details
   * 
   * @example
   * // Using ID
   * const pikachu = await pokeAPIService.getPokemon(25);
   * 
   * // Using name
   * const charizard = await pokeAPIService.getPokemon('charizard');
   */
  async getPokemon(idOrName: number | string): Promise<Pokemon> {
    try {
      const response = await this.api.get<Pokemon>(`/pokemon/${idOrName}`);
      return response.data;
    } catch (error) {
      throw new Error(
        `Failed to fetch Pokemon '${idOrName}': ${this.handleError(error)}`
      );
    }
  }

  /**
   * Get Pokemon species information
   * 
   * @param idOrName - Pokemon species ID (number) or name (string)
   * @returns Promise with Pokemon species details
   * 
   * @example
   * const species = await pokeAPIService.getPokemonSpecies(25);
   */
  async getPokemonSpecies(idOrName: number | string): Promise<PokemonSpecies> {
    try {
      const response = await this.api.get<PokemonSpecies>(
        `/pokemon-species/${idOrName}`
      );
      return response.data;
    } catch (error) {
      throw new Error(
        `Failed to fetch Pokemon species '${idOrName}': ${this.handleError(error)}`
      );
    }
  }

  /**
   * Search Pokemon by name (client-side filtering)
   * This method fetches all Pokemon and filters by name
   * 
   * @param searchTerm - Search term to filter Pokemon names
   * @param limit - Max number of Pokemon to search through (default: 1000)
   * @returns Promise with filtered list of Pokemon
   * 
   * @example
   * const results = await pokeAPIService.searchPokemon('pika');
   */
  async searchPokemon(
    searchTerm: string,
    limit: number = 1000
  ): Promise<PokemonListResponse> {
    try {
      const response = await this.getPokemonList(limit, 0);
      const filtered = response.results.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      return {
        count: filtered.length,
        next: null,
        previous: null,
        results: filtered,
      };
    } catch (error) {
      throw new Error(`Failed to search Pokemon: ${this.handleError(error)}`);
    }
  }

  /**
   * Get Pokemon by generation
   * Generation I: 1-151
   * Generation II: 152-251
   * Generation III: 252-386
   * Generation IV: 387-493
   * Generation V: 494-649
   * Generation VI: 650-721
   * Generation VII: 722-809
   * Generation VIII: 810-905
   * Generation IX: 906-1025
   * 
   * @param generation - Generation number (1-9)
   * @returns Promise with list of Pokemon from that generation
   * 
   * @example
   * const gen1Pokemon = await pokeAPIService.getPokemonByGeneration(1);
   */
  async getPokemonByGeneration(generation: number): Promise<PokemonListResponse> {
    const generationRanges: Record<number, { start: number; end: number }> = {
      1: { start: 1, end: 151 },
      2: { start: 152, end: 251 },
      3: { start: 252, end: 386 },
      4: { start: 387, end: 493 },
      5: { start: 494, end: 649 },
      6: { start: 650, end: 721 },
      7: { start: 722, end: 809 },
      8: { start: 810, end: 905 },
      9: { start: 906, end: 1025 },
    };

    const range = generationRanges[generation];
    if (!range) {
      throw new Error('Invalid generation number. Must be between 1 and 9.');
    }

    const limit = range.end - range.start + 1;
    const offset = range.start - 1;

    try {
      return await this.getPokemonList(limit, offset);
    } catch (error) {
      throw new Error(
        `Failed to fetch Pokemon for generation ${generation}: ${this.handleError(error)}`
      );
    }
  }

  /**
   * Get random Pokemon
   * 
   * @param count - Number of random Pokemon to fetch (default: 1)
   * @returns Promise with array of random Pokemon
   * 
   * @example
   * const randomPokemon = await pokeAPIService.getRandomPokemon(5);
   */
  async getRandomPokemon(count: number = 1): Promise<Pokemon[]> {
    const TOTAL_POKEMON = 1025; // As of Generation IX
    const promises: Promise<Pokemon>[] = [];

    for (let i = 0; i < count; i++) {
      const randomId = Math.floor(Math.random() * TOTAL_POKEMON) + 1;
      promises.push(this.getPokemon(randomId));
    }

    try {
      return await Promise.all(promises);
    } catch (error) {
      throw new Error(`Failed to fetch random Pokemon: ${this.handleError(error)}`);
    }
  }
}

// Export a singleton instance
export const pokeAPIService = new PokeAPIService();

// Also export the class for testing purposes
export default PokeAPIService;
