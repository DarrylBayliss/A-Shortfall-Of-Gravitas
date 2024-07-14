import { Text, View } from "react-native";
import { styles } from "./RocketListScreen";

const getRocketLaunchesEndpoint = "https://api.spacexdata.com/v4/launches/query"

const RocketDetailScreen = () => {
  return (
    <View
      style={styles.window}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}

export default RocketDetailScreen
