import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BoardScreen from "./BoardScreen";
import HomeScreen from "./HomeScreen";
import SettingsScreen from "./SettingsScreen";

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "HomeTab") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "BoardTab") {
              iconName = focused ? "list" : "list-outline";
            } else if (route.name === "SettingsTab") {
              iconName = focused ? "settings" : "settings-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#e53935",
          tabBarInactiveTintColor: "#888",
          tabBarStyle: {
            paddingBottom: 5,
            paddingTop: 5,
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{ tabBarLabel: "홈" }}
        />
        <Tab.Screen
          name="Board"
          component={BoardScreen}
          options={{ tabBarLabel: "게시판" }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ tabBarLabel: "설정" }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
}
