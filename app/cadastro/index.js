import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';

export default function CadastroScreen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [usuario, setUsuario] = useState('');
  const router = useRouter();

  const salvarCadastro = () => {
    if (email && senha && nomeCompleto && usuario) {
      // Aqui você pode adicionar a lógica de cadastro, como enviar os dados para uma API.
      Alert.alert('Cadastro realizado com sucesso!');
      router.navigate('Home'); // Redireciona para a tela de login após o cadastro.
    } else {
      Alert.alert('Preencha todos os campos!');
    }
  };

  return (
    <View style={styles.container}>
      {/* Botão de Voltar */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.push('')}>
        <Text style={styles.backButtonText}>{"<"} Voltar</Text>
      </TouchableOpacity>

      {/* Título */}
      <Text style={styles.title}>Cadastro</Text>

      {/* Campos de Entrada */}
      <View style={styles.inputContainer}>
        <Text>E-mail</Text>
        <TextInput
          placeholder="Digite seu e-mail"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text>Senha</Text>
        <TextInput
          placeholder="Digite sua senha"
          style={styles.input}
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text>Nome completo</Text>
        <TextInput
          placeholder="Digite seu nome completo"
          style={styles.input}
          value={nomeCompleto}
          onChangeText={setNomeCompleto}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text>Usuário</Text>
        <TextInput
          placeholder="Digite seu nome de usuário"
          style={styles.input}
          value={usuario}
          onChangeText={setUsuario}
        />
      </View>

      {/* Botão Salvar */}
      <TouchableOpacity style={styles.button} onPress={salvarCadastro}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    marginBottom: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: '#007bff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainer: {
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
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
