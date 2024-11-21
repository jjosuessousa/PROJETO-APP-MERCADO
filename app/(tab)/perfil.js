

import React, { useEffect } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import useAuthStore from "../stores/authStore";

export default function PerfilScreen() {
  const { perfil, buscarPerfil, token } = useAuthStore();

  useEffect(() => {
    const carregarPerfil = async () => {
      try {
        if (!token) {
          Alert.alert("Erro", "Usuário não autenticado. Faça login novamente.");
          return;
        }

        await buscarPerfil(); // Busca os dados do perfil
      } catch (error) {
        Alert.alert("Erro", error.message);
      }
    };

    carregarPerfil();
  }, [token]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>
      {perfil ? (
        <>
          <Text style={styles.text}>Nome: {perfil.firstName} {perfil.lastName}</Text>
          <Text style={styles.text}>Email: {perfil.email}</Text>
          <Text style={styles.text}>Telefone: {perfil.phone}</Text>
        </>
      ) : (
        <Text style={styles.text}>Carregando...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  text: { fontSize: 18, marginVertical: 10 },
});
