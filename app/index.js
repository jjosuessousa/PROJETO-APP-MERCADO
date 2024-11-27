import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import useAuthStore from './stores/authStore';

export default function LoginScreen() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const Login = useAuthStore((state) => state.Login);
  const router = useRouter();

  const logar = async () => {
    if (usuario && senha) {
      const response = await Login(usuario, senha);
      if (response.success) {
        Alert.alert('Sucesso', response.message);
        router.push('product'); // Redireciona para a tela de produtos
      } else {
        Alert.alert('Erro', response.message);
      }
    } else {
      Alert.alert('Atenção', 'Preencha todos os campos!');
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
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
    backgroundColor: '#f9f9f9',
  },
  button: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerText: {
    color: '#007bff',
    textDecorationLine: 'underline',
    marginTop: 10,
  },
});
