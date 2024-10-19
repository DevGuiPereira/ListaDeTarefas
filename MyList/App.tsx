import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Principal from "./src/pages/Main";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Main from "./src/pages/Main";
import Details from "./src/pages/detalhes";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {
        <Tab.Navigator>
          <Tab.Screen name="Main" component={Main} />
          <Tab.Screen name="Details" component={Details} />
        </Tab.Navigator>
      }
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
