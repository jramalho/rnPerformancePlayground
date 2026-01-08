import React from "react";
import { View, Text, Button, TextInput } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RerendersStackParamList } from "@/types";
import type { Pokemon } from "@/types/pokemon";
import { RenderCounter } from "../../components/RenderCounter";
import { PokeCard } from "@/components/PokeCard";
import { pokeApi } from "@/services/pokemon";

type Props = NativeStackScreenProps<RerendersStackParamList, "Before">;

function ExpensiveChild({ onPress }: { onPress: () => void }) {
  let sum = 0;
  for (let i = 0; i < 200000; i++) sum += i;

  return (
    <View>
      <RenderCounter label="ExpensiveChild" />
      <Text onPress={onPress}>Tap</Text>
    </View>
  );
}

const BeforeRerenderScreen: React.FC<Props> = ({ navigation }) => {
  const [text, setText] = React.useState("");
  const [pokemon, setPokemon] = React.useState<Pokemon | null>(null);

  React.useEffect(() => {
    const fetchPokemon = async () => {
      const result = await pokeApi.getPokemon(1);
      setPokemon(result);
    };

    fetchPokemon();
  }, []);


  return (
    <View style={{ flex: 1, padding: 16, gap: 12 }}>
      {pokemon && (
        <PokeCard
          pokemon={{
            id: pokemon.id,
            name: pokemon.name,
            types: pokemon.types.map(t => t.type.name),
            imageUrl: pokemon.sprites.other?.["official-artwork"]?.front_default || pokemon.sprites.front_default || "",
            stats: {
              hp: pokemon.stats.find(s => s.stat.name === 'hp')?.base_stat || 0,
              attack: pokemon.stats.find(s => s.stat.name === 'attack')?.base_stat || 0,
              defense: pokemon.stats.find(s => s.stat.name === 'defense')?.base_stat || 0,
              speed: pokemon.stats.find(s => s.stat.name === 'speed')?.base_stat || 0,
            },
          }}
        />
      )}
      <Text>BEFORE — unnecessary re-renders</Text>
      <TextInput value={text} onChangeText={setText} />
      <RenderCounter label="Screen" />
      <ExpensiveChild onPress={() => {}} />
      <Button title="Go to After" onPress={() => navigation.navigate("After")} />
    </View>
  );
};

export default BeforeRerenderScreen;
