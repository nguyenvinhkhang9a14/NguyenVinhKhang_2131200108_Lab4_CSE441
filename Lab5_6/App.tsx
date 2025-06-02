// App.tsx
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './KAMI_SPA/Login';
import AddServiceScreen from './KAMI_SPA/AddService';
import DetailScreen from './KAMI_SPA/Detail';
import EditServiceScreen from './KAMI_SPA/EditService';
import CustomerScreen from './KAMI_SPA/Customer';
import AddCustomerScreen from './KAMI_SPA/AddCustomer';
import BottomTabs from './KAMI_SPA/BottomTabs';
import TransactionScreen from './KAMI_SPA/Transaction';
import TransactionDetailScreen from './KAMI_SPA/TransactionDetail';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Main"
          component={BottomTabs}
          options={{headerShown: false}}
        />
        <Stack.Screen name="AddService" component={AddServiceScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} />
        <Stack.Screen name="EditService" component={EditServiceScreen} />
        <Stack.Screen name="Customer" component={CustomerScreen} />
        <Stack.Screen name="AddCustomer" component={AddCustomerScreen} />
        <Stack.Screen name="Transaction" component={TransactionScreen} />
        <Stack.Screen
          name="TransactionDetail"
          component={TransactionDetailScreen}
          options={{title: 'Transaction detail'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
