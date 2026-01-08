import React, { useCallback } from 'react';
import { FlashList, type ListRenderItem } from '@shopify/flash-list';
import { View, Text } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FlatListStackParamList, SimplePokemon } from '@/types';
import { PokeCard } from '@/components/PokeCard';
import { MOCK_POKEMON_LIST } from '@/services/mockPokemon';
import { CARD_HEIGHT } from '@/components/PokeCard/styles';

type FlashListScreenProperties = NativeStackScreenProps<
  FlatListStackParamList,
  'FlashList'
>;

const ITEM_HEIGHT = CARD_HEIGHT + 24;

const keyExtractor = (item: SimplePokemon) => item.id.toString();

export const FlashListScreen = ({ navigation }: FlashListScreenProperties) => {
  const renderItem: ListRenderItem<SimplePokemon> = useCallback(
    ({ item }) => <PokeCard pokemon={item} />,
    []
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#E8E8E8' }}>
      <View style={{ padding: 16, backgroundColor: '#CCE5FF', borderBottomWidth: 2, borderBottomColor: '#B8DAFF' }}>
        <Text style={{ fontSize: 14, fontWeight: '700', color: '#004085' }}>
           FLASHLIST - Shopify's optimized list
        </Text>
        <Text style={{ fontSize: 11, color: '#004085', marginTop: 4 }}>
           Built-in recycling{'\n'}
           Better memory usage{'\n'}
           Memoized renderItem{'\n'}
           Fixed item height
        </Text>
      </View>
      
      <FlashList
        data={MOCK_POKEMON_LIST}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </View>
  );
};
