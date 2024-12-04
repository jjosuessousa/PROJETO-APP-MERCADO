import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";


export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
         
          if (route.name === "home") {
            iconName = "home";
          
          } else if (route.name === "addProduto") {
            iconName = "apps";

          } else if (route.name === "addCategoria") {
            iconName = "add-circle";
          } else if (route.name === "adicionarLocal") {
            iconName = "location";

          } else if (route.name === "perfil") {
            iconName = "person";
          } 

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "gray",
         
      })}
    >
    
    <Tabs.Screen 
        name="home" 
        options={{ headerShown: false }} // Esconde o cabeçalho
      />
      <Tabs.Screen 
        name="addProduto" 
        options={{ headerShown: false }} // Esconde o cabeçalho
      />
      <Tabs.Screen 
        name="addCategoria" 
        options={{ headerShown: false }} // Esconde o cabeçalho
      />
      <Tabs.Screen 
        name="adicionarLocal" 
        options={{ headerShown: false }} // Esconde o cabeçalho
      />
      <Tabs.Screen 
        name="perfil" 
        options={{ headerShown: false }} // Esconde o cabeçalho
      />
     
    
    </Tabs>
  );
}
