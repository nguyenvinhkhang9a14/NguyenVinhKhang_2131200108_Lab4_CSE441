// KAMI_SPA/BottomTabs.tsx
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './Home';
import CustomerScreen from './Customer';
import TransactionScreen from './Transaction';
import SettingScreen from './Setting'; 
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarActiveTintColor: '#E34C66',
        tabBarInactiveTintColor: '#999',
        tabBarIcon: ({color}) => {
          let iconName = 'home-outline';
          if (route.name === 'Home') {
            iconName = 'home-outline';
          } else if (route.name === 'Transaction') {
            iconName = 'swap-horizontal-outline';
          } else if (route.name === 'Customer') {
            iconName = 'people-outline';
          } else if (route.name === 'Setting') {
            iconName = 'settings-outline';
          }

          return <Icon name={iconName} size={20} color={color} />;
        },
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Transaction" component={TransactionScreen} />
      <Tab.Screen name="Customer" component={CustomerScreen} />
      <Tab.Screen name="Setting" component={SettingScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
