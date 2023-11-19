import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '~/modules/home/screens/HomeScreen';
import LoginScreen from '~/modules/auth/screens/LoginScreen';
import CollectionsScreen from '~/modules/cpa/screens/CollectionsScreen';

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
      <Drawer.Screen
        name="Collections"
        component={CollectionsScreen}
        initialParams={{ title: 'jwt' }}
      />
    </Drawer.Navigator>
  );
}
