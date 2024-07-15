import React from "react";
import { Image } from 'expo-image';
import { SafeAreaView, View, Text, FlatList, StatusBar, StyleSheet, Pressable } from "react-native";
import { Rocket } from '../constants/Types';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

type Props = {
  rockets: Rocket[];
  onItemClick: (arg0: Rocket) => void;
};

const RocketList : React.FC<Props> = ({rockets, onItemClick} ) => {

  const RocketItem = ({rocket, onItemClick} : {rocket: Rocket, onItemClick: (arg0: Rocket) =>  void}) => {
    return (
      <Pressable
        onPress={() => onItemClick(rocket)}>
          <View style={styles.item}>
          <Image style={styles.image}
            source={rocket.flickr_images[0]}
            placeholder={{ blurhash }}
            contentFit="fill"
            transition={1000}/>
          <View style={styles.textColumn}>
              <Text> {rocket.name} </Text>
              <Text> {rocket.country} </Text>
          </View>
          </View>
      </Pressable>
    );
  };

  return (
      <SafeAreaView style={styles.container}>
            <FlatList 
              data={rockets}
              numColumns={1}
              renderItem={({item} ) => <RocketItem rocket={item}
                                                   onItemClick={(rocket) => onItemClick(rocket)}/>}
             />
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    item: {
      flex: 1,
      flexDirection: 'row'
    },
    image: {
      padding: 30,
      marginVertical: 16,
      marginHorizontal: 16,
    },
    textColumn: {
      marginVertical: 16,
      marginHorizontal: 16,
    }
  });

  export default RocketList