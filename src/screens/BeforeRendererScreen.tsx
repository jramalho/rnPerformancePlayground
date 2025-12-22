import React from "react";
import { View, Text, TextInput } from "react-native";
import { RenderCounter } from "../components/RenderCounter";

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

export function BeforeRerenderScreen() {
  const [text, setText] = React.useState("");

  return (
    <View>
      <Text>BEFORE — unnecessary re-renders</Text>
      <TextInput value={text} onChangeText={setText} />
      <RenderCounter label="Screen" />
      <ExpensiveChild onPress={() => {}} />
    </View>
  );
}
