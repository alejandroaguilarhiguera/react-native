import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '~/modules/home/screens/HomeScreen';
import LoginScreen from '~/modules/auth/screens/LoginScreen';

const Stack = createStackNavigator();

export default function NavigationStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        initialParams={{ title: 'jwt' }}
      />
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}
