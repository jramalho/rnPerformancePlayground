import React from 'react';
import { FlatList, View, Text } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FlatListStackParamList } from '@/types';
import { PokeCard } from '@/components/PokeCard';
import { MOCK_POKEMON_LIST } from '@/services/mockPokemon';
import { CARD_HEIGHT } from '@/components/PokeCard/styles';

type BadFlatListScreenProperties = NativeStackScreenProps<
  FlatListStackParamList,
  'Bad'
>;

export const BadFlatListScreen = ({ navigation }: BadFlatListScreenProperties) => {
  return (
    <View style={{ flex: 1, backgroundColor: '#E8E8E8' }}>
      <View style={{ padding: 16, backgroundColor: '#FFF3CD', borderBottomWidth: 2, borderBottomColor: '#FFE69C' }}>
        <Text style={{ fontSize: 14, fontWeight: '700', color: '#856404' }}>
           BAD VERSION - No optimizations
        </Text>
        <Text style={{ fontSize: 11, color: '#856404', marginTop: 4 }}>
           No keyExtractor{'\n'}
           No getItemLayout{'\n'}
           No memoization{'\n'}
           Inline functions everywhere
        </Text>
      </View>
      
      <FlatList
        data={MOCK_POKEMON_LIST}
        renderItem={({ item }) => {
          // Inline component - re-creates on every render
          return <PokeCard pokemon={item} />;
        }}
        // No keyExtractor - will use index as key (bad!)
        // No getItemLayout - can't optimize scrolling
        // No memo - everything re-renders
      />
    </View>
  );
};
