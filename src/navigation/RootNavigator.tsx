import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FlatListStackNavigator from "./FlatListNavigator";
import RerendersStackNavigator from "./RerendersNavigator";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tab.Screen
          name="Re-Renders"
          component={RerendersStackNavigator}
        />
        <Tab.Screen
          name="FlatList"
          component={FlatListStackNavigator}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
