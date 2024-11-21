import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Tabs } from "expo-router";

export default function Layout() {
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Login" }} />
        <Stack.Screen
          name="product"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="cadastro/index" options={{ title: "Cadastro" }} />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}

