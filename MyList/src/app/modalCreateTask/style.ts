import { StyleSheet } from "react-native";
import { themas } from "../../global/themas";

export const style = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: themas.colors.backgroundModal, // Fundo semi-transparente para o efeito de overlay
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: themas.colors.white,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: themas.colors.darkGray,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    width: "40%",
  },
  buttonText: {
    color: themas.colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  inputDescription: {
    marginBottom: 10,
  },
});
