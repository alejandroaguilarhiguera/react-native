import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '~/modules/home/screens/HomeScreen';
import LoginScreen from '~/modules/auth/screens/LoginScreen';

const Tab = createBottomTabNavigator();

export default function NavigationTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Login"
        component={LoginScreen}
        initialParams={{ title: 'jwt' }}
      />
      <Tab.Screen name="Home" component={HomeScreen} />
    </Tab.Navigator>
  );
}
