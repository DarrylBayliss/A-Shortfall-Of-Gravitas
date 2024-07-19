import React from "react";
import { Image } from 'expo-image';
import { SafeAreaView, View, Text, FlatList, StatusBar, StyleSheet } from "react-native";
import { Launch } from '../constants/Types';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

type Props = {
  launches: Launch[];
};

const LaunchesList : React.FC<Props> = ({launches} ) => {

  const convertUTCToLocalTime = (dateString : string) => {
   let date = new Date(dateString); 

   const formattedDate = Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: "long",
    year: 'numeric',
  }); 

   return formattedDate.format(date)
}

  const LaunchItem = ({launch} : {launch: Launch}) => {
    return (
        <View style={styles.item}>
        <Image style={styles.image}
          source={launch.links.patch.small}
          placeholder={{ blurhash }}
          contentFit="fill"/>
        <View style={styles.textColumn}>
            <Text> {launch.name + " " + convertUTCToLocalTime(launch.date_utc)} </Text>
            <Text> Successful Launch {String(launch.success)} </Text>
        </View>
        </View>
    );
  };

  return (
      <SafeAreaView style={styles.container}>
            <FlatList 
              data={launches}
              numColumns={1}
              renderItem={({item} ) => <LaunchItem launch={item}/>}
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

  export default LaunchesList