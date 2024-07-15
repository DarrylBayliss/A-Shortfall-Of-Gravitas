import React, { useEffect, useState} from 'react';
import { Rocket, Launch } from '../constants/Types';
import { useAsyncStorage } from '@react-native-async-storage/async-storage'
import { Text, View } from "react-native";
import { styles } from "./Index";

const getRocketLaunchesEndpoint = "https://api.spacexdata.com/v4/launches/query"

const RocketDetailScreen = ({ loading = false, } : { loading: Boolean }) => {

  const [isLoading, setLoading] = useState<Boolean>(loading);
  const [rocket, setRocket] = useState<Rocket>();
  const [launches, setLaunches] = useState<Launch[]>([]);
  const { getItem } = useAsyncStorage('@storage_key');

  const readItemFromStorage = async () => {
    const storedRocketJson = await getItem()
    if(storedRocketJson) {
      const storedRocket = JSON.parse(storedRocketJson)
      setRocket(storedRocket)
    } else {
      console.log("Couldn't get rocket")
    }
  };

  const getLaunches = async () => {
    try {
      const response = await fetch(getRocketLaunchesEndpoint, {
        method: 'POST',
        body: JSON.stringify({ rocket: rocket?.id })
      });

      const json = await response.json();
      setLaunches(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    readItemFromStorage()
    .then(() => getLaunches());
  }, []);

  
  const description = rocket?.description ?? "No Description Available"

  return (
    <View style={styles.window}>
      <Text>{"Hello!"}</Text>
    </View>
  );
}

export default RocketDetailScreen
