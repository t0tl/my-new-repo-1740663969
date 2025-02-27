import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { TodoProvider } from './context/TodoContext';
import HomeScreen from './screens/HomeScreen';
import AddTaskScreen from './screens/AddTaskScreen';
import CategoryScreen from './screens/CategoryScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TodoProvider>
        <NavigationContainer>
          <StatusBar style="auto" />
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: '#ffffff',
              },
              headerShadowVisible: false,
              headerTitleStyle: {
                fontWeight: '600',
              },
            }}
          >
            <Stack.Screen 
              name="Home" 
              component={HomeScreen}
              options={{ title: 'My Tasks' }}
            />
            <Stack.Screen 
              name="AddTask" 
              component={AddTaskScreen}
              options={{ title: 'Add New Task' }}
            />
            <Stack.Screen 
              name="Categories" 
              component={CategoryScreen}
              options={{ title: 'Categories' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </TodoProvider>
    </GestureHandlerRootView>
  );
}