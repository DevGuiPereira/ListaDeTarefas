import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Main from "../app/main";
import Search from "../app/search";
import { StatusBar } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <StatusBar barStyle={"dark-content"} />
      <Tab.Navigator
        screenOptions={({ route }) => {
          const iconName =
            route.name === "MyList"
              ? "list-outline"
              : route.name === "Search"
              ? "search-outline"
              : "bug-outline";

          return {
            tabBarIcon: ({ color, size }) => (
              <Ionicons name={iconName} size={size} color={color} />
            ),
            tabBarActiveTintColor: "#dd1b1b",
            tabBarInactiveTintColor: "#8e8e93",
            headerTintColor: "#dd1b1b",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 20,
            },
          };
        }}
      >
        <Tab.Screen name="MyList" component={Main} />
        <Tab.Screen name="Search" component={Search} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
