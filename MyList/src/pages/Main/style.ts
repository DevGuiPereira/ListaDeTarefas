import { StyleSheet, Dimensions } from "react-native";
import { themas } from "../../global/themas";

export const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  box: {
    height: Dimensions.get("window").height / 1,
    width: "100%",
    backgroundColor: themas.colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
});
