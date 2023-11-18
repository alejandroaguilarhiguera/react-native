import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '~/screens/HomeScreen';
import LoginScreen from '~/screens/LoginScreen';

const Drawer = createDrawerNavigator();

export default function NavigationDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen
        name="Login"
        component={LoginScreen}
        initialParams={{ title: 'jwt' }}
      />
    </Drawer.Navigator>
  );
}
