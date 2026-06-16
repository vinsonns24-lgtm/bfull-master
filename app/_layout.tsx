import "../global.css";

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { DelayModal } from "../components/DelayModal";
import { ToastProvider } from "../components/Toast";
import { StoreProvider } from "../lib/store";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <SafeAreaProvider>
        <StoreProvider>
          <ToastProvider>
            <StatusBar style="dark" />
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="index" />
              <Stack.Screen name="login" />
              <Stack.Screen name="register" />
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="tenant/[id]" />
              <Stack.Screen name="orders" />
              <Stack.Screen name="favorites" />
              <Stack.Screen name="vouchers" />
              <Stack.Screen
                name="food/[id]"
                options={{ presentation: "modal" }}
              />
              <Stack.Screen
                name="campus"
                options={{ presentation: "transparentModal", animation: "fade" }}
              />
              <Stack.Screen
                name="payment"
                options={{ presentation: "transparentModal", animation: "fade" }}
              />
              <Stack.Screen
                name="review"
                options={{ presentation: "transparentModal", animation: "fade" }}
              />
            </Stack>
            <DelayModal />
          </ToastProvider>
        </StoreProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
