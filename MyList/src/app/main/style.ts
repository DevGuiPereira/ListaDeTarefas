import { StyleSheet, Dimensions } from "react-native";
import { themas } from "../../global/themas";

export const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    height: Dimensions.get("window").height / 1.23,
    width: "100%",
    backgroundColor: themas.colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: themas.colors.white,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
  },
  buttonText: {
    color: themas.colors.black,
    fontSize: 16,
    fontWeight: "bold",
  },
});
