import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import "react-native-reanimated";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Toaster } from "sonner-native";
import FindPasswordScreen from "./auth/FindPassword";
import SigninScreen from "./auth/Signin";
import HomeScreen from "./main";
import DetailPostScreen from "./post/DetailPostScreen";
import WritePostScreen from "./post/WritePost";

const Stack = createNativeStackNavigator();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider style={styles.container}>
      <ThemeProvider value={DarkTheme}>
        <Toaster />

        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Main" component={HomeScreen} />
          <Stack.Screen name="Signin" component={SigninScreen} />
          <Stack.Screen name="Signup" component={SigninScreen} />
          <Stack.Screen name="FindPassword" component={FindPasswordScreen} />
          <Stack.Screen name="WritePost" component={WritePostScreen} />
          <Stack.Screen name="DetailPost" component={DetailPostScreen} />
        </Stack.Navigator>

        <StatusBar style="auto" />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    userSelect: "none",
  },
});
