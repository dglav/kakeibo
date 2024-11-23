import "~/global.css";

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Appearance, Platform } from "react-native";
import { useColorScheme } from "~/lib/useColorScheme";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from "react-native-safe-area-context";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before getting the color scheme.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { colorScheme, isDarkColorScheme } = useColorScheme();

  React.useEffect(() => {
    (async () => {
      if (Platform.OS === "web") {
        document.documentElement.style.colorScheme = colorScheme;
      } else {
        Appearance.setColorScheme(colorScheme);
      }
    })().finally(() => {
      SplashScreen.hideAsync();
    });
  }, []);

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
          >
            <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
            <Stack>
              <Stack.Screen name="index" />
              <Stack.Screen name="expenses" options={{ headerShown: false }} />
            </Stack>
          </ThemeProvider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
