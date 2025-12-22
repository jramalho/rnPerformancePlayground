import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BeforeRerenderScreen from "../screens/RerendersScreens/BeforeRendererScreen";
import AfterRerenderScreen from "../screens/RerendersScreens/AfterRendererScreen";
import type { RerendersStackParamList } from "@/types";

const RerendersStack = createNativeStackNavigator<RerendersStackParamList>();

const RerendersStackNavigator = () => {
  return (
    <RerendersStack.Navigator>
      <RerendersStack.Screen
        name="Before"
        component={BeforeRerenderScreen}
        options={{ title: "Re-renders — Before" }}
      />
      <RerendersStack.Screen
        name="After"
        component={AfterRerenderScreen}
        options={{ title: "Re-renders — After" }}
      />
    </RerendersStack.Navigator>
  );
};

export default RerendersStackNavigator;
