import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

export default function AddLocation() {
  const [name, setName] = useState('');
  const [cep, setCep] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');

  const handleSave = () => {
    // Aqui, você pode implementar a lógica para salvar os dados no servidor ou no estado global.
    console.log({
      name,
      cep,
      logradouro,
      numero,
      bairro,
      cidade,
      estado,
    });
    alert('Dados salvos com sucesso!');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Adicionar Local</Text>

      <Text style={styles.label}>Nome *</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Digite o nome"
      />

      <Text style={styles.label}>CEP</Text>
      <TextInput
        style={styles.input}
        value={cep}
        onChangeText={setCep}
        placeholder="Digite o CEP"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Logradouro</Text>
      <TextInput
        style={styles.input}
        value={logradouro}
        onChangeText={setLogradouro}
        placeholder="Digite o logradouro"
      />

      <Text style={styles.label}>Nº</Text>
      <TextInput
        style={styles.input}
        value={numero}
        onChangeText={setNumero}
        placeholder="Digite o número"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Bairro</Text>
      <TextInput
        style={styles.input}
        value={bairro}
        onChangeText={setBairro}
        placeholder="Digite o bairro"
      />

      <Text style={styles.label}>Cidade</Text>
      <TextInput
        style={styles.input}
        value={cidade}
        onChangeText={setCidade}
        placeholder="Digite a cidade"
      />

      <Text style={styles.label}>Estado</Text>
      <TextInput
        style={styles.input}
        value={estado}
        onChangeText={setEstado}
        placeholder="Digite o estado"
      />

      <Button title="Salvar" onPress={handleSave} color="#28a745" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
});
