import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { FlatListStackParamList } from '@/types';

type ListMenuScreenProperties = NativeStackScreenProps<
  FlatListStackParamList,
  'Menu'
>;

export const ListMenuScreen = ({ navigation }: ListMenuScreenProperties) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose a List Implementation</Text>
      <Text style={styles.subtitle}>
        Compare performance between different list rendering approaches
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.badButton]}
          onPress={() => navigation.navigate('Bad')}
        >
          <Text style={styles.buttonEmoji}></Text>
          <Text style={styles.buttonTitle}>FlatList BAD</Text>
          <Text style={styles.buttonDescription}>
            No optimizations{'\n'}Poor performance
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.goodButton]}
          onPress={() => navigation.navigate('Good')}
        >
          <Text style={styles.buttonEmoji}></Text>
          <Text style={styles.buttonTitle}>FlatList GOOD</Text>
          <Text style={styles.buttonDescription}>
            All optimizations{'\n'}Great performance
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.flashButton]}
          onPress={() => navigation.navigate('FlashList')}
        >
          <Text style={styles.buttonEmoji}></Text>
          <Text style={styles.buttonTitle}>FlashList</Text>
          <Text style={styles.buttonDescription}>
            Shopify's solution{'\n'}Best performance
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111',
    marginTop: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
    marginBottom: 32,
  },
  buttonContainer: {
    gap: 16,
  },
  button: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 3,
    alignItems: 'center',
  },
  badButton: {
    backgroundColor: '#FFF3CD',
    borderColor: '#FFE69C',
  },
  goodButton: {
    backgroundColor: '#D4EDDA',
    borderColor: '#C3E6CB',
  },
  flashButton: {
    backgroundColor: '#CCE5FF',
    borderColor: '#B8DAFF',
  },
  buttonEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  buttonTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  buttonDescription: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    lineHeight: 16,
  },
});
