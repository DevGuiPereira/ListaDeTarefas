import { StyleSheet, Dimensions, Button } from "react-native";
import { themas } from "../../global/themas";

export const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    height: Dimensions.get("window").height / 1.24,
    width: "100%",
    backgroundColor: themas.colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
});
