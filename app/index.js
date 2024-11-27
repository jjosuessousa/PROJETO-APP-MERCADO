import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import useAuthStore from './stores/authStore';

export default function LoginScreen() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const Login = useAuthStore((state) => state.Login);
  const router = useRouter();

  // Usa a função `login` da store Zustand
  const { login } = useAuthStore();

  const handleLogin = () => {
    try {
      login(username, password); // Verifica credenciais
      Alert.alert("Login bem-sucedido!");
      router.push(""); // Redireciona para a tela principal
    } catch (error) {
      Alert.alert("Erro", "Credenciais inválidas. Tente novamente.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require('../assets/images/logo.png')} // Substitua pelo caminho do seu logo
        style={styles.logo}
      />

      {/* Título */}
      <Text style={styles.title}>Login</Text>

      {/* Campo de Usuário */}
      <View style={styles.inputContainer}>
        <Text>Usuário</Text>
        <TextInput
          placeholder="Digite seu usuário"
          style={styles.input}
          value={usuario}
          onChangeText={setUsuario}
        />
      </View>

      {/* Campo de Senha */}
      <View style={styles.inputContainer}>
        <Text>Senha</Text>
        <TextInput
          placeholder="Digite sua senha"
          secureTextEntry
          style={styles.input}
          value={senha}
          onChangeText={setSenha}
        />
      </View>

      {/* Botão de Entrar */}
      <TouchableOpacity style={styles.button} onPress={logar}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      {/* Link de Registrar */}
      <TouchableOpacity onPress={() => router.push('cadastro')}>
        <Text style={styles.registerText}>Registrar</Text>
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