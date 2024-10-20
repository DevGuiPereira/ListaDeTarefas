import { StyleSheet, Dimensions, Button } from "react-native";
import { themas } from "../../global/themas";

export const style = StyleSheet.create({
  button: {
    backgroundColor: themas.colors.primary, // Cor de fundo do botão
    paddingVertical: 10, // Espaçamento vertical
    paddingHorizontal: 20, // Espaçamento horizontal
    borderRadius: 5, // Cantos arredondados
    alignItems: "center", // Centraliza o texto
    justifyContent: "center", // Centraliza o texto
    marginBottom: 10,
  },
  buttonText: {
    color: themas.colors.black, // Cor do texto do botão
    fontSize: 16, // Tamanho da fonte
    fontWeight: "bold", // Peso da fonte
  },
});
