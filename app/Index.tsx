import React, { useEffect, useState} from 'react';
import { Rocket } from '../constants/Types';
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { useAsyncStorage } from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router';
import RocketList from '@/components/RocketList';

const getRocketsEndpoint = "https://api.spacexdata.com/v4/rockets"

const Index = ({ loading = false, baseRockets = [] }) => {

  const [isLoading, setLoading] = useState<Boolean>(loading);
  const [rockets, setRockets] = useState<Rocket[]>(baseRockets);
  const { setItem } = useAsyncStorage('@storage_key');
  const router = useRouter();

  const getRockets = async () => {
    try {
      const response = await fetch(getRocketsEndpoint);
      const json = await response.json();
      setRockets(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRockets();
  }, []);

  const writeItemToStorage = async (newValue : Rocket) => {
    await setItem(JSON.stringify(newValue));
  };

  return (
    <View style={styles.window}>
      { isLoading ? (
        <ActivityIndicator />
      ) : <RocketList 
            rockets={rockets}
            onItemClick= { (rocket) =>
              writeItemToStorage(rocket).then(() => router.push('/RocketDetail'))
            }/>
          }</View>
  );
}

export const styles = StyleSheet.create({
  window: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: "center",
  }
});

export default Index
