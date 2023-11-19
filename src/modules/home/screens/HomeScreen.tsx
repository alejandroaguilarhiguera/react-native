import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import useSWR from 'swr';
import { Session } from '~/types/Session';

export default function HomeScreen() {
  const { data: session } = useSWR<Session>('session');
  return (
    <SafeAreaView style={styles.container}>
      <Text>Home</Text>
      <Text>{session?.user.username}</Text>
      <StatusBar style="auto" />
    </SafeAreaView>
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
