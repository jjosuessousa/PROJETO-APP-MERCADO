import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import useAuthStore from "../stores/authStore";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
         
          if (route.name === "home") {
            iconName = "add-circle";
          } else if (route.name === "addProduto") {
            iconName = "add-circle";
          } else if (route.name === "perfil") {
            iconName = "person";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tabs.Screen name="home" options={{ title: "home" }} />
      <Tabs.Screen name="addProduto" options={{ title: "Adicionar Produto" }} />
      <Tabs.Screen name="perfil" options={{ title: "Perfil" }} />
    </Tabs>
  );
}
