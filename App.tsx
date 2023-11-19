import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import axios, { AxiosError } from 'axios';
import NavigationStack from './src/navigation/NavigationStack';
import NavigationTab from './src/navigation/NavigationTab';
import NavigationDrawer from './src/navigation/NavigationDrawer';
import { baseURL, API_PREFIX } from '~/config/api';

axios.defaults.baseURL = `${baseURL}${API_PREFIX}`;
export default function App() {
  axios.interceptors.response.use(undefined, (err) => {
    if (err?.name === 'AxiosError') {
      const error = err as AxiosError;
      const { status = 500 } = error;
      if ([401, 403].includes(status)) {
        // TODO: Redirect to login screen
        console.log('Forbidden', status);
      }
    }
    Promise.reject(err);
  });
  return (
    <NavigationContainer>
      {/* <NavigationStack /> */}
      {/* <NavigationTab /> */}
      <NavigationDrawer />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
