import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';
import useSWR from 'swr';
import axios from 'axios';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '~/navigation/types';
import { Character } from '../types/Character';
import ItemCollection from '../components/ItemCollection';

type Props = NativeStackScreenProps<RootStackParamList, 'Collections'>;

interface Response {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
}

export default function CollectionsScreen(props: Props) {
  const { navigation } = props;

  const { data: collections } = useSWR<Character[]>(
    'https://rickandmortyapi.com/api/character',
    async (url: string) => {
      const { data } = await axios.get<Response>(url);
      return data.results;
    },
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {collections?.map((character) => (
          <ItemCollection key={character.id} data={character} />
        ))}
      </ScrollView>
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
  scrollView: {
    width: '100%',
  },
});
