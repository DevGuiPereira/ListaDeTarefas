// style.ts
import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  taskContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15, // Padding for the task container
    marginBottom: 15, // Space between tasks
    backgroundColor: "#fff",
    borderRadius: 10, // Rounded corners for a smoother look
  },
  circleButton: {
    width: 30, // Increased size for better visibility
    height: 30,
    borderRadius: 15,
    marginRight: 15,
    // Removed border to eliminate the blue outline
    // borderWidth: 2, // Removed for flat design
    // borderColor: "#007BFF", // Removed for flat design
    backgroundColor: "transparent", // Ensure the button is transparent or set your desired color
  },
  taskDetails: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 18, // Increased font size
    fontWeight: "bold",
    marginBottom: 5, // Space between title and date
  },
  taskDate: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5, // Space between date and description
  },
  taskDescription: {
    fontSize: 14, // Increased font size for better readability
    color: "#333",
  },
  editButton: {
    color: "#007BFF",
    marginTop: 5,
    fontSize: 14, // Increased font size for better visibility
  },
  absoluteButtonContainer: {
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 5,
    width: "100%",
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
  taskList: {
    paddingBottom: 100, // To avoid content being obscured by the button
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
    marginTop: 20,
  },
});
