import React from "react";
import { View, Text, Button, TextInput } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RerendersStackParamList } from "@/types";
import { RenderCounter } from "../components/RenderCounter";

type Props = NativeStackScreenProps<RerendersStackParamList, "After">;

const ExpensiveChild = React.memo(function ExpensiveChild({
  onPress,
}: {
  onPress: () => void;
}) {
  let sum = 0;
  for (let i = 0; i < 200000; i++) sum += i;

  return (
    <View>
      <RenderCounter label="ExpensiveChild" />
      <Text onPress={onPress}>Tap</Text>
    </View>
  );
});

const AfterRerenderScreen: React.FC<Props> = ({ navigation }) => {
  const [text, setText] = React.useState("");
  const onPress = React.useCallback(() => {}, []);

  return (
    <View style={{ flex: 1, padding: 16, gap: 12 }}>
      <Text>AFTER — stable renders</Text>
      <TextInput value={text} onChangeText={setText} />
      <RenderCounter label="Screen" />
      <ExpensiveChild onPress={onPress} />
      <Button title="Go to Before" onPress={() => navigation.navigate("Before")} />
    </View>
  );
};

export default AfterRerenderScreen;
