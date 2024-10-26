import { StyleSheet, Dimensions, Button } from "react-native";
import { themas } from "../../global/themas";

export const style = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: themas.colors.primary,
    borderRadius: 5,
    padding: 10,
    backgroundColor: themas.colors.white,
    width: 280,
    marginBottom: 10,
  },
});
