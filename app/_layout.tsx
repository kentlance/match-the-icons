import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import "../global.css";
import Index from "../app/(tabs)/index";
import GameScreen from "../app/(tabs)/gameScreen";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#333",
        },
        headerTintColor: "#fff", // change the text color to white
        headerTitleStyle: {
          color: "#fff", // change the text color to white
        },
      }}
    >
      <Stack.Screen name="Main Menu" component={Index} />
      <Stack.Screen name="Match The Icons!" component={GameScreen} />
    </Stack.Navigator>
  );
}
