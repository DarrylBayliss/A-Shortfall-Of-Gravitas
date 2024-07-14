import React, { useEffect, useState} from 'react';
import { View, ActivityIndicator, StyleSheet } from "react-native";
import RocketList, { Rocket } from '@/components/RocketList';

const getRocketsEndpoint = "https://api.spacexdata.com/v4/rockets"

export type Props = {
  loading: boolean;
  baseRockets?: [Rocket];
};

export type Rocket = {
  name: String;
  country: String;
  flickr_images: [string]
}

const RocketListScreen = ({ loading = false, baseRockets = [] }) => {

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

  return (
    <View style={styles.window}>
      { isLoading ? (
        <ActivityIndicator />
      ) : <RocketList 
            rockets={rockets}
            onItemClick= { () => console.log("") }/> }
    </View>
  );
  //             navigation.push("Rocket Detail")
}

export const styles = StyleSheet.create({
  window: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: "center",
  }
});

export default RocketListScreen
