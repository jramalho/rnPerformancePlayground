/**
 * PokeAPI Service - Exemplos de Uso
 * 
 * Este arquivo contém exemplos práticos de como usar o PokeAPI service.
 * Você pode copiar e adaptar esses exemplos para seu projeto.
 */

import { pokeAPIService } from './pokeapi';
import type { Pokemon, PokemonListResponse } from '../types/pokemon';

// ==========================================
// Exemplo 1: Buscar um Pokémon específico
// ==========================================

export const fetchPikachuExample = async () => {
  try {
    // Por ID
    const pikachu = await pokeAPIService.getPokemon(25);
    console.log(`Nome: ${pikachu.name}`);
    console.log(`Altura: ${pikachu.height}`);
    console.log(`Peso: ${pikachu.weight}`);
    
    // Por nome
    const charizard = await pokeAPIService.getPokemon('charizard');
    console.log(`Charizard ID: ${charizard.id}`);
    
    return pikachu;
  } catch (error) {
    console.error('Erro ao buscar Pokémon:', error);
    throw error;
  }
};

// ==========================================
// Exemplo 2: Listar Pokémons com paginação
// ==========================================

export const fetchPokemonListExample = async () => {
  try {
    // Primeira página (20 Pokémons)
    const firstPage = await pokeAPIService.getPokemonList(20, 0);
    console.log(`Total de Pokémons: ${firstPage.count}`);
    console.log(`Primeira página:`, firstPage.results.map(p => p.name));
    
    // Segunda página (próximos 20)
    const secondPage = await pokeAPIService.getPokemonList(20, 20);
    console.log(`Segunda página:`, secondPage.results.map(p => p.name));
    
    return firstPage;
  } catch (error) {
    console.error('Erro ao buscar lista:', error);
    throw error;
  }
};

// ==========================================
// Exemplo 3: Buscar detalhes de múltiplos Pokémons
// ==========================================

export const fetchMultiplePokemonsExample = async () => {
  try {
    const list = await pokeAPIService.getPokemonList(10, 0);
    
    // Buscar detalhes de todos
    const pokemonsWithDetails = await Promise.all(
      list.results.map(p => pokeAPIService.getPokemon(p.name))
    );
    
    console.log('Pokémons com detalhes:');
    pokemonsWithDetails.forEach(p => {
      console.log(`${p.name}: ${p.types.map(t => t.type.name).join(', ')}`);
    });
    
    return pokemonsWithDetails;
  } catch (error) {
    console.error('Erro ao buscar múltiplos Pokémons:', error);
    throw error;
  }
};

// ==========================================
// Exemplo 4: Buscar Pokémons por geração
// ==========================================

export const fetchByGenerationExample = async () => {
  try {
    // Geração 1 (Kanto)
    const gen1 = await pokeAPIService.getPokemonByGeneration(1);
    console.log(`Geração 1: ${gen1.count} Pokémons`);
    
    // Geração 2 (Johto)
    const gen2 = await pokeAPIService.getPokemonByGeneration(2);
    console.log(`Geração 2: ${gen2.count} Pokémons`);
    
    return gen1;
  } catch (error) {
    console.error('Erro ao buscar por geração:', error);
    throw error;
  }
};

// ==========================================
// Exemplo 5: Buscar Pokémons aleatórios
// ==========================================

export const fetchRandomPokemonsExample = async () => {
  try {
    // Um Pokémon aleatório
    const [randomOne] = await pokeAPIService.getRandomPokemon(1);
    console.log(`Pokémon aleatório: ${randomOne.name}`);
    
    // Cinco Pokémons aleatórios
    const randomFive = await pokeAPIService.getRandomPokemon(5);
    console.log('5 Pokémons aleatórios:', randomFive.map(p => p.name));
    
    return randomFive;
  } catch (error) {
    console.error('Erro ao buscar aleatórios:', error);
    throw error;
  }
};

// ==========================================
// Exemplo 6: Buscar informações de espécie
// ==========================================

export const fetchSpeciesInfoExample = async () => {
  try {
    const species = await pokeAPIService.getPokemonSpecies('pikachu');
    
    // Descrição em inglês
    const description = species.flavor_text_entries
      .find(entry => entry.language.name === 'en')
      ?.flavor_text.replace(/\f/g, ' ');
    
    console.log(`Descrição: ${description}`);
    console.log(`É lendário? ${species.is_legendary}`);
    console.log(`É mítico? ${species.is_mythical}`);
    console.log(`Taxa de captura: ${species.capture_rate}`);
    
    return species;
  } catch (error) {
    console.error('Erro ao buscar espécie:', error);
    throw error;
  }
};

// ==========================================
// Exemplo 7: Buscar por nome (search)
// ==========================================

export const searchPokemonExample = async () => {
  try {
    const results = await pokeAPIService.searchPokemon('pika');
    console.log('Resultados da busca:', results.results.map(p => p.name));
    // ["pikachu", "pikachu-rock-star", "pikachu-belle", ...]
    
    return results;
  } catch (error) {
    console.error('Erro ao buscar:', error);
    throw error;
  }
};

// ==========================================
// Exemplo 8: Extrair informações específicas
// ==========================================

export const extractPokemonInfoExample = async (idOrName: string | number) => {
  try {
    const pokemon = await pokeAPIService.getPokemon(idOrName);
    
    // Extrair tipos
    const types = pokemon.types.map(t => t.type.name);
    
    // Extrair stats
    const stats = {
      hp: pokemon.stats.find(s => s.stat.name === 'hp')?.base_stat || 0,
      attack: pokemon.stats.find(s => s.stat.name === 'attack')?.base_stat || 0,
      defense: pokemon.stats.find(s => s.stat.name === 'defense')?.base_stat || 0,
      specialAttack: pokemon.stats.find(s => s.stat.name === 'special-attack')?.base_stat || 0,
      specialDefense: pokemon.stats.find(s => s.stat.name === 'special-defense')?.base_stat || 0,
      speed: pokemon.stats.find(s => s.stat.name === 'speed')?.base_stat || 0,
    };
    
    // Extrair habilidades
    const abilities = pokemon.abilities.map(a => ({
      name: a.ability.name,
      isHidden: a.is_hidden,
    }));
    
    // Melhor sprite
    const sprite = 
      pokemon.sprites.other?.['official-artwork']?.front_default ||
      pokemon.sprites.front_default;
    
    const info = {
      id: pokemon.id,
      name: pokemon.name,
      types,
      stats,
      abilities,
      sprite,
      height: pokemon.height / 10, // em metros
      weight: pokemon.weight / 10, // em kg
    };
    
    console.log('Informações extraídas:', info);
    return info;
  } catch (error) {
    console.error('Erro ao extrair informações:', error);
    throw error;
  }
};

// ==========================================
// Exemplo 9: Uso com hooks React
// ==========================================

/**
 * Exemplo de custom hook para buscar Pokémon
 * 
 * @example
 * const { pokemon, loading, error } = usePokemon('pikachu');
 */
export const usePokemonExample = `
import { useState, useEffect } from 'react';
import { pokeAPIService } from './services';
import type { Pokemon } from './types/pokemon';

export const usePokemon = (idOrName: string | number) => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await pokeAPIService.getPokemon(idOrName);
        setPokemon(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [idOrName]);

  return { pokemon, loading, error };
};
`;

// ==========================================
// Exemplo 10: Uso com cache (AsyncStorage)
// ==========================================

export const cacheExample = `
import AsyncStorage from '@react-native-async-storage/async-storage';
import { pokeAPIService } from './services';

const CACHE_PREFIX = 'pokemon_';
const CACHE_DURATION = 3600000; // 1 hora

export const getPokemonWithCache = async (idOrName: string | number) => {
  const cacheKey = CACHE_PREFIX + idOrName;
  
  try {
    // Tentar buscar do cache
    const cached = await AsyncStorage.getItem(cacheKey);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      
      // Verificar se o cache ainda é válido
      if (Date.now() - timestamp < CACHE_DURATION) {
        console.log('Retornando do cache');
        return data;
      }
    }
    
    // Buscar da API
    console.log('Buscando da API');
    const pokemon = await pokeAPIService.getPokemon(idOrName);
    
    // Salvar no cache
    await AsyncStorage.setItem(
      cacheKey,
      JSON.stringify({ data: pokemon, timestamp: Date.now() })
    );
    
    return pokemon;
  } catch (error) {
    console.error('Erro:', error);
    throw error;
  }
};
`;

// ==========================================
// Exemplo 11: Tratamento de erros
// ==========================================

export const errorHandlingExample = async (idOrName: string | number) => {
  try {
    const pokemon = await pokeAPIService.getPokemon(idOrName);
    return pokemon;
  } catch (error) {
    // Tratamento específico de erro
    if (error instanceof Error) {
      if (error.message.includes('404')) {
        console.error('Pokémon não encontrado');
        // Mostrar mensagem amigável ao usuário
      } else if (error.message.includes('Network error')) {
        console.error('Sem conexão com a internet');
        // Tentar usar dados em cache
      } else {
        console.error('Erro desconhecido:', error.message);
      }
    }
    throw error;
  }
};

// ==========================================
// Exemplo 12: Comparar dois Pokémons
// ==========================================

export const comparePokemonsExample = async (
  name1: string,
  name2: string
) => {
  try {
    const [pokemon1, pokemon2] = await Promise.all([
      pokeAPIService.getPokemon(name1),
      pokeAPIService.getPokemon(name2),
    ]);
    
    const comparison = {
      pokemon1: {
        name: pokemon1.name,
        totalStats: pokemon1.stats.reduce((sum, s) => sum + s.base_stat, 0),
      },
      pokemon2: {
        name: pokemon2.name,
        totalStats: pokemon2.stats.reduce((sum, s) => sum + s.base_stat, 0),
      },
    };
    
    console.log('Comparação:', comparison);
    return comparison;
  } catch (error) {
    console.error('Erro ao comparar:', error);
    throw error;
  }
};

// ==========================================
// Como executar os exemplos:
// ==========================================

/**
 * Para testar qualquer exemplo, importe e execute:
 * 
 * import { fetchPikachuExample } from './services/examples';
 * 
 * // Em um componente ou função async
 * const result = await fetchPikachuExample();
 */
