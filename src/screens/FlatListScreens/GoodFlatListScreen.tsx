import React, { useCallback } from 'react';
import { FlatList, View, Text, type ListRenderItem } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FlatListStackParamList, SimplePokemon } from '@/types';
import { PokeCard } from '@/components/PokeCard';
import { MOCK_POKEMON_LIST } from '@/services/mockPokemon';
import { CARD_HEIGHT } from '@/components/PokeCard/styles';

type GoodFlatListScreenProperties = NativeStackScreenProps<
  FlatListStackParamList,
  'Good'
>;

const ITEM_HEIGHT = CARD_HEIGHT + 24; // card height + margin

const keyExtractor = (item: SimplePokemon) => item.id.toString();

const getItemLayout = (_data: ArrayLike<SimplePokemon> | null | undefined, index: number) => ({
  length: ITEM_HEIGHT,
  offset: ITEM_HEIGHT * index,
  index,
});

export const GoodFlatListScreen = ({ navigation }: GoodFlatListScreenProperties) => {
  const renderItem: ListRenderItem<SimplePokemon> = useCallback(
    ({ item }) => <PokeCard pokemon={item} />,
    []
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#E8E8E8' }}>
      <View style={{ padding: 16, backgroundColor: '#D4EDDA', borderBottomWidth: 2, borderBottomColor: '#C3E6CB' }}>
        <Text style={{ fontSize: 14, fontWeight: '700', color: '#155724' }}>
           GOOD VERSION - Fully optimized
        </Text>
        <Text style={{ fontSize: 11, color: '#155724', marginTop: 4 }}>
           Proper keyExtractor{'\n'}
           getItemLayout for smooth scrolling{'\n'}
           Memoized renderItem{'\n'}
           No inline functions
        </Text>
      </View>
      
      <FlatList
        data={MOCK_POKEMON_LIST}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        getItemLayout={getItemLayout}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={50}
        initialNumToRender={10}
        windowSize={5}
      />
    </View>
  );
};
