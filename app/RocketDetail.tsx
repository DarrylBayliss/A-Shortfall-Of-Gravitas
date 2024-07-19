import React, { useEffect, useState} from 'react';
import { Rocket, Launch } from '../constants/Types';
import { Image } from 'expo-image';
import { useAsyncStorage } from '@react-native-async-storage/async-storage'
import { Text, View, StyleSheet } from "react-native";
import LaunchesList from '@/components/LaunchesList';

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
      setLaunches(json.docs);
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

  return (
    <View style={styles.window}>
      { rocket ?
      <View>
      <Image style={styles.image}
            source={rocket.flickr_images[0]}
            contentFit="fill"
            transition={1000}/>
        <Text>{rocket.description}</Text>
        <LaunchesList launches={launches}/>
      </View> : <Text>"Hello"</Text> }
    </View>
  );
}

const styles = StyleSheet.create({
    window: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: "center",
      marginHorizontal: 16,
    },
    image: {
      height: 200,
      padding: 30,
      marginVertical: 16,
    }
  });

export default RocketDetailScreen
