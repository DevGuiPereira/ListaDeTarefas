import { StyleSheet, Dimensions } from "react-native";
import { themas } from "../../global/themas";

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themas.colors.primary,
  },
  box: {
    height: Dimensions.get("window").height / 1.23,
    width: "100%",
    backgroundColor: themas.colors.primary,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  absoluteButtonContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  button: {
    backgroundColor: themas.colors.white,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: themas.colors.black,
    fontSize: 16,
    fontWeight: "bold",
  },
  taskSection: {
    flex: 1,
    backgroundColor: themas.colors.white,
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: "95%",
    alignSelf: "center",
  },
  taskSectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: themas.colors.black,
    marginBottom: 8,
  },
  noTasksText: {
    textAlign: "center",
    color: themas.colors.primary,
    marginTop: 20,
    fontSize: 14,
  },
  taskContainer: {
    flexDirection: "row", // Align items horizontally
    alignItems: "center", // Center vertically
    backgroundColor: "#f0f0f0",
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
    elevation: 1,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  taskDate: {
    fontSize: 14,
    color: "#666",
  },
  taskDescription: {
    fontSize: 16,
    marginTop: 5,
  },
  taskList: {
    padding: 10,
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "#999",
    marginTop: 20,
  },
  circleButton: {
    width: 30, // Diameter of the circle
    height: 30,
    borderRadius: 15, // Makes it a circle
    marginRight: 10, // Space between circle and title
  },
  taskDetails: {
    flex: 1, // Allows task details to take up remaining space
  },
});
