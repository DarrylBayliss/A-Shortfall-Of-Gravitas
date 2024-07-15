import React, { useEffect, useState} from 'react';
import { View, ActivityIndicator, StyleSheet, Alert } from "react-native";
import { router } from 'expo-router';
import RocketList from '@/components/RocketList';

const getRocketsEndpoint = "https://api.spacexdata.com/v4/rockets"

type Props = {
  loading: boolean;
  baseRockets?: [Rocket];
};

export type Rocket = {
  name: String;
  country: String;
  flickr_images: [string]
}

const Index = ({ loading = false, baseRockets = [] }) => {

  const [isLoading, setLoading] = useState<Boolean>(loading);
  const [rockets, setRockets] = useState<Rocket[]>(baseRockets);

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

  const createTwoButtonAlert = () =>
    Alert.alert('Alert Title', 'My Alert Msg', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);


  return (
    <View style={styles.window}>
      { isLoading ? (
        <ActivityIndicator />
      ) : <RocketList 
            rockets={rockets}
            onItemClick= { () => router.push('/RocketDetail') }/> }
    </View>
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
