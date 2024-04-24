import { View, Text } from "@/src/components/Themed";
import { StyleSheet } from "react-native";

export default function HomeScreen() {
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
