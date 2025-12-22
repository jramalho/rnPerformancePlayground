import React from "react";
import { SafeAreaView } from "react-native";
import RootStackNavigator from "@/navigation/RootNavigator";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <RootStackNavigator />
      {/* Troque para <AfterRerenderScreen /> pra comparar */}
    </SafeAreaView>
  );
}