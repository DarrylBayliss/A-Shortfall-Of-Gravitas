import React from "react";
import { Image } from 'expo-image';
import { SafeAreaView, View, Text, FlatList, StatusBar, StyleSheet, Pressable } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { Rocket } from "@/app/RocketListScreen";

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export default function RocketList({rockets, onItemClick} : {rockets: Rocket[], onItemClick: () => void}) {

  const RocketItem = ({rocket, onItemClick} : {rocket: Rocket, onItemClick: () => void }) => {
    // const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
    // const color = item.id === selectedId ? 'white' : 'black';
    return (
      <Pressable
        onPress={() => onItemClick}>
          <Image style={styles.item}
            source={rocket. flickr_images[0]}
            placeholder={{ blurhash }}
            contentFit="fill"
            transition={1000}/>
          <View style={styles.textColumn}>
              <Text> {rocket.name} </Text>
              <Text> {rocket.country} </Text>
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
                                                   onItemClick={onItemClick}/>}
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
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    textColumn: {
        flex: 1,
        paddingStart: 10
    }
  });