import React from "react";
import { View, Text, Button, TextInput } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RerendersStackParamList } from "@/types";
import { RenderCounter } from "../../components/RenderCounter";
import { PokeCard } from "@/components/PokeCard";

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

  const pokemonTest = {
  id: 6,
  name: "Charizard",
  types: ["fire", "flying"],
  imageUrl:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png",
};


  return (
    <View style={{ flex: 1, padding: 16, gap: 12 }}>
      <PokeCard
        pokemon={pokemonTest}
      />
      <Text>BEFORE — unnecessary re-renders</Text>
      <TextInput value={text} onChangeText={setText} />
      <RenderCounter label="Screen" />
      <ExpensiveChild onPress={() => {}} />
      <Button title="Go to After" onPress={() => navigation.navigate("After")} />
    </View>
  );
};

export default BeforeRerenderScreen;
