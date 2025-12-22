import React from "react";
import { View, Text, Button } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { FlatListStackParamList } from "@/types";

type Props = NativeStackScreenProps<FlatListStackParamList, "Before">;

const BeforeRerenderScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={{ flex: 1, padding: 16, gap: 12 }}>
      <Text>BEFORE...</Text>
      <Button title="Go to After" onPress={() => navigation.navigate("After")} />
    </View>
  );
};

export default BeforeRerenderScreen;