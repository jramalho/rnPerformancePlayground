import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FlatListBeforeScreen from "../screens/FlatListScreens/FlatListBeforeScreen";
import FlatListAfterScreen from "../screens/FlatListScreens/FlatListAfterScreen";
import type { FlatListStackParamList } from "@/types";

const FlatListStack = createNativeStackNavigator<FlatListStackParamList>();

const FlatListStackNavigator = () => {
  return (
    <FlatListStack.Navigator>
      <FlatListStack.Screen
        name="Before"
        component={FlatListBeforeScreen}
        options={{ title: "FlatList — Before" }}
      />
      <FlatListStack.Screen
        name="After"
        component={FlatListAfterScreen}
        options={{ title: "FlatList — After" }}
      />
    </FlatListStack.Navigator>
  );
}

export default FlatListStackNavigator