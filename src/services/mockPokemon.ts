import type { SimplePokemon } from '@/types';

const BASE_POKEMON_DATA: SimplePokemon[] = [
  {
    id: 1,
    name: 'Bulbasaur',
    types: ['grass', 'poison'],
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
  },
  {
    id: 4,
    name: 'Charmander',
    types: ['fire'],
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png',
  },
  {
    id: 7,
    name: 'Squirtle',
    types: ['water'],
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png',
  },
  {
    id: 25,
    name: 'Pikachu',
    types: ['electric'],
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
  },
  {
    id: 6,
    name: 'Charizard',
    types: ['fire', 'flying'],
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png',
  },
];

const generateMockPokemonList = (count: number): SimplePokemon[] => {
  const result: SimplePokemon[] = [];
  
  for (let index = 0; index < count; index++) {
    const basePokemon = BASE_POKEMON_DATA[index % BASE_POKEMON_DATA.length];
    result.push({
      ...basePokemon,
      id: index + 1,
    });
  }
  
  return result;
};

export const MOCK_POKEMON_LIST = generateMockPokemonList(20);
