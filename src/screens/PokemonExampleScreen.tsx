import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { pokeAPIService } from '../services';
import type { Pokemon } from '../types/pokemon';

/**
 * Pokemon Example Screen
 * 
 * Demonstra o uso do PokeAPI service para buscar e exibir pokémons.
 * Inclui:
 * - Loading state
 * - Error handling
 * - Pull to refresh
 * - Lista paginada
 */
export const PokemonExampleScreen = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPokemons();
  }, []);

  const loadPokemons = async () => {
    try {
      setLoading(true);
      setError(null);

      // Buscar os primeiros 20 Pokémon
      const response = await pokeAPIService.getPokemonList(20, 0);

      // Buscar detalhes de cada Pokémon
      const pokemonDetails = await Promise.all(
        response.results.map(p => pokeAPIService.getPokemon(p.name))
      );

      setPokemons(pokemonDetails);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar Pokémon');
      console.error('Error loading pokemons:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadPokemons();
    setRefreshing(false);
  };

  const getTypeColor = (type: string): string => {
    const colors: Record<string, string> = {
      normal: '#A8A878',
      fire: '#F08030',
      water: '#6890F0',
      electric: '#F8D030',
      grass: '#78C850',
      ice: '#98D8D8',
      fighting: '#C03028',
      poison: '#A040A0',
      ground: '#E0C068',
      flying: '#A890F0',
      psychic: '#F85888',
      bug: '#A8B820',
      rock: '#B8A038',
      ghost: '#705898',
      dragon: '#7038F8',
      dark: '#705848',
      steel: '#B8B8D0',
      fairy: '#EE99AC',
    };
    return colors[type] || '#68A090';
  };

  const renderPokemonItem = ({ item }: { item: Pokemon }) => (
    <TouchableOpacity style={styles.card}>
      <View style={styles.cardContent}>
        <Image
          source={{
            uri:
              item.sprites.other?.['official-artwork']?.front_default ||
              item.sprites.front_default ||
              undefined,
          }}
          style={styles.pokemonImage}
          resizeMode="contain"
        />

        <View style={styles.infoContainer}>
          <Text style={styles.pokemonId}>
            #{item.id.toString().padStart(3, '0')}
          </Text>
          <Text style={styles.pokemonName}>{item.name}</Text>

          <View style={styles.typesContainer}>
            {item.types.map(({ type }) => (
              <View
                key={type.name}
                style={[
                  styles.typeBadge,
                  { backgroundColor: getTypeColor(type.name) },
                ]}>
                <Text style={styles.typeText}>{type.name}</Text>
              </View>
            ))}
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>HP</Text>
              <Text style={styles.statValue}>
                {item.stats.find(s => s.stat.name === 'hp')?.base_stat || 0}
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>ATK</Text>
              <Text style={styles.statValue}>
                {item.stats.find(s => s.stat.name === 'attack')?.base_stat || 0}
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>DEF</Text>
              <Text style={styles.statValue}>
                {item.stats.find(s => s.stat.name === 'defense')?.base_stat || 0}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#E3350D" />
        <Text style={styles.loadingText}>Carregando Pokémon...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>❌ {error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadPokemons}>
          <Text style={styles.retryButtonText}>Tentar Novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Pokédex</Text>
        <Text style={styles.subtitle}>{pokemons.length} Pokémon encontrados</Text>
      </View>

      <FlatList
        data={pokemons}
        keyExtractor={item => item.id.toString()}
        renderItem={renderPokemonItem}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#E3350D']}
            tintColor="#E3350D"
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    backgroundColor: '#E3350D',
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    marginTop: 4,
    opacity: 0.9,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    color: '#E3350D',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#E3350D',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  listContent: {
    padding: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardContent: {
    flexDirection: 'row',
    padding: 16,
  },
  pokemonImage: {
    width: 100,
    height: 100,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 16,
  },
  pokemonId: {
    fontSize: 12,
    color: '#999',
    fontWeight: '600',
  },
  pokemonName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textTransform: 'capitalize',
    marginTop: 4,
  },
  typesContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  typeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  typeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 12,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 10,
    color: '#999',
    fontWeight: '600',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 2,
  },
});

export default PokemonExampleScreen;
