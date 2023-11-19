import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  SafeAreaView,
} from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';
import useSWR from 'swr';
import axios from 'axios';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '~/navigation/types';
import { Character } from '../types/Character';

interface Props {
  data: Character;
}

export default function ItemCollection(props: Props) {
  const {
    data: { name, image: uri, status },
  } = props;
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri,
        }}
      />
      <View>
        <Text style={styles.text}>{name}</Text>
        <Text
          style={{
            ...styles.text,
            color:
              status === 'Alive' ? 'green' : status === 'Dead' ? 'red' : 'gray',
          }}
        >
          {status}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 20,
    marginTop: 5,
    marginBottom: 5,
    width: '100%',
    flexDirection: 'row',
  },
  image: {
    borderRadius: 8,
    width: 50,
    height: 50,
    marginRight: 5,
  },
  text: {
    marginLeft: 5,
  },
});
