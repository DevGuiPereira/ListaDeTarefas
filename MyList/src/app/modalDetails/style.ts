// style.ts
import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent background
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    elevation: 5, // For Android shadow
  },
  taskTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  taskDate: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  taskDescription: {
    fontSize: 14,
    marginBottom: 15,
  },
  inputField: {
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: "column", // Stack buttons vertically
    width: "100%", // Make it full width of modal
    marginTop: 20, // Add some margin to separate from the task details
  },
  button: {
    backgroundColor: "#007BFF", // Example button color
    padding: 10,
    borderRadius: 5,
    marginVertical: 5, // Space between buttons
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
});
