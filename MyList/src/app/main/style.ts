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
    padding: 15,
    marginBottom: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  circleButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 15,
    backgroundColor: "transparent",
  },
  taskDetails: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  taskDate: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  taskDescription: {
    fontSize: 14,
    color: "#333",
  },
  absoluteButtonContainer: {
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
    alignItems: "center",
  },
  taskList: {
    paddingBottom: 100,
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
    marginTop: 20,
  },
});
