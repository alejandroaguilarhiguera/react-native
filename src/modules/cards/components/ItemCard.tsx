import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  SafeAreaView,
} from 'react-native';
import { baseURL, API_PREFIX } from '~/config/api';
import type { StackScreenProps } from '@react-navigation/stack';
import useSWR from 'swr';
import axios from 'axios';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '~/navigation/types';
import { Card } from '../types/Card';

interface Props {
  data: Card;
}
const url = `${baseURL}`;
export default function ItemCollection(props: Props) {
  const {
    data: {
      attributes: {
        name,
        description,
        image: {
          data: {
            attributes: { url: uri },
          },
        },
      },
    },
  } = props;
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: `${url}${uri}`,
        }}
      />
      <View>
        <Text style={styles.text}>{name}</Text>
        <Text
          style={{
            ...styles.text,
          }}
        >
          {description}
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
