import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import useAuthStore from './stores/authStore'; // Ajuste o caminho se necessário

export default function LoginScreen() {
  const [usuario, setUsuario] = useState('emilys'); // Estado para o usuário
  const [senha, setSenha] = useState('emilyspass'); // Estado para a senha
  const Login = useAuthStore((state) => state.Login); // Obtém a função Login do Zustand
  const router = useRouter();

  // Função de login
  const logar = async () => {
    console.log('Botão de login pressionado'); // Log para depuração
    if (usuario && senha) {
      console.log('Iniciando login com:', usuario, senha); // Log do estado
      const response = await Login(usuario, senha); // Chama a função Login do Zustand
      console.log('aquiResposta do login:', response); // Log da resposta
      if (response.success) {
        Alert.alert('LOGADO COM SUCESSO', response.message);
        router.push('/home'); // Redireciona para a tela principal
      }  
    } else {
      Alert.alert('Atenção', 'Preencha todos os campos!');
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require('./src/logo.png')} // Substitua pelo caminho do seu logo
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
      <TouchableOpacity onPress={() => router.push('/cadastro')}>
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
