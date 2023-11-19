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
// import { FAB } from 'react-native-elements';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '~/navigation/types';
import { Card } from '../types/Card';
import { Session } from '~/types/Session';
import ItemCard from '../components/ItemCard';
import { useEffect } from 'react';

type Props = NativeStackScreenProps<RootStackParamList, 'Cards'>;

export default function CardsScreen(props: Props) {
  const { navigation } = props;
  const { data: session } = useSWR<Session>('session');

  const { data: cards, error } = useSWR<Card[]>(
    '/cards?populate=image',
    async (url: string) => {
      try {
        const response = await axios.get<{ data: Card[] }>(url);
        if (response?.status === 200) {
          const {
            data: { data },
          } = response;

          return data;
        }

        return [];
      } catch (error) {
        console.log('error', error);
        return [];
      }
    },
  );

  useEffect(() => {
    if (error?.message?.includes('code 403')) {
      navigation.navigate('Login');
    }
  }, [error]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* <Text>{JSON.stringify(error)}</Text> */}
        {cards?.map((card) => <ItemCard key={card.id} data={card} />)}
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
