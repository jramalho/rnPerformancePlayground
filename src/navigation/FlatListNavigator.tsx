import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ListMenuScreen } from '../screens/FlatListScreens/ListMenuScreen';
import { BadFlatListScreen } from '../screens/FlatListScreens/BadFlatListScreen';
import { GoodFlatListScreen } from '../screens/FlatListScreens/GoodFlatListScreen';
import { FlashListScreen } from '../screens/FlatListScreens/FlashListScreen';
import type { FlatListStackParamList } from '@/types';

const FlatListStack = createNativeStackNavigator<FlatListStackParamList>();

const FlatListStackNavigator = () => {
  return (
    <FlatListStack.Navigator>
      <FlatListStack.Screen
        name="Menu"
        component={ListMenuScreen}
        options={{ title: 'List Performance' }}
      />
      <FlatListStack.Screen
        name="Bad"
        component={BadFlatListScreen}
        options={{ title: 'FlatList  BAD' }}
      />
      <FlatListStack.Screen
        name="Good"
        component={GoodFlatListScreen}
        options={{ title: 'FlatList  GOOD' }}
      />
      <FlatListStack.Screen
        name="FlashList"
        component={FlashListScreen}
        options={{ title: 'FlashList' }}
      />
    </FlatListStack.Navigator>
  );
};

export default FlatListStackNavigator;
