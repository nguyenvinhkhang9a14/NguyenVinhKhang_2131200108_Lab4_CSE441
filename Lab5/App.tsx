import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './KAMI_SPA/Login';
import HomeScreen from './KAMI_SPA/Home';
import AddServiceScreen from './KAMI_SPA/AddService';
import DetailScreen from './KAMI_SPA/Detail';
import EditServiceScreen from './KAMI_SPA/EditService';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddService" component={AddServiceScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} />
        <Stack.Screen name="EditService" component={EditServiceScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
