import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from "react-native";
import { useRouter } from "expo-router";
import useAuthStore from "./stores/authStore";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // Usa a função `login` da store Zustand
  const { login } = useAuthStore();

  const handleLogin = () => {
    try {
      login(username, password); // Verifica credenciais
      Alert.alert("Login bem-sucedido!");
      router.push("home"); // Redireciona para a tela principal
    } catch (error) {
      Alert.alert("Erro", "Credenciais inválidas. Tente novamente.");
    }
  };

  return (
    <View style={styles.container}>
      <Image 
        source={require('../app/src/logo.png')} // Caminho da sua imagem
        style={styles.image}
      />
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Usuário"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/cadastro")}>
        <Text style={styles.linkText}>Registre-se</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 10 },
  title: { fontSize: 24, marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 20 },
  button: { backgroundColor: "blue", padding: 15 },
  buttonText: { color: "white", textAlign: "center" },
  linkText: { color: "blue", marginTop: 20, fontWeight: "bold" },
  image: { width: 150, height: 150, marginVertical: 20, alignSelf: "center" },
});
/*Explicação
Credenciais Cadastradas:

A store contém um array usuariosCadastrados com as credenciais válidas.
Durante o login, a função find verifica se o username e password informados correspondem a um registro existente.
Erro para Credenciais Inválidas:

Se nenhuma combinação for encontrada, a função login dispara um erro com a mensagem "Credenciais inválidas".
Logout:

A função logout redefine os estados relacionados ao login.
Alerta no Frontend:

O componente exibe um alerta apropriado com Alert.alert para indicar sucesso ou erro no login.*/