import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import useSWR from 'swr';
import HomeScreen from '~/modules/home/screens/HomeScreen';
import LoginScreen from '~/modules/auth/screens/LoginScreen';
import CollectionsScreen from '~/modules/cpa/screens/CollectionsScreen';
import CardsScreen from '~/modules/cards/screens/CardsScreen';
import { Session } from '~/types/Session';

const Drawer = createDrawerNavigator();

export default function NavigationDrawer() {
  const { data: session } = useSWR<Session>('session');
  return (
    <Drawer.Navigator>
      {!session?.jwt && (
        <Drawer.Group screenOptions={{ headerShown: false }}>
          <Drawer.Screen
            name="Login"
            component={LoginScreen}
            initialParams={{ title: 'jwt' }}
          />
        </Drawer.Group>
      )}

      {session?.jwt && (
        <Drawer.Group screenOptions={{ headerShown: true }}>
          <Drawer.Screen name="Home" component={HomeScreen} />

          <Drawer.Screen
            name="Collections"
            component={CollectionsScreen}
            initialParams={{ title: 'jwt' }}
          />
          <Drawer.Screen name="Cards" component={CardsScreen} />
        </Drawer.Group>
      )}
    </Drawer.Navigator>
  );
}
