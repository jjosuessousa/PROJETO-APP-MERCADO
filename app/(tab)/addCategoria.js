import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, ActivityIndicator, StyleSheet } from 'react-native';

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!categoryName.trim()) {
      Alert.alert('Erro', 'O campo Nome é obrigatório.');
      return;
    }

    setLoading(true);

    try {
      console.log('Enviando categoria:', categoryName);

      const response = await fetch('https://api-produtos-6p7n.onrender.com/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: categoryName }), // Enviando apenas o campo "name"
      });

      console.log('Status da resposta:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('Resposta da API:', data);
        Alert.alert('Sucesso', 'Categoria adicionada com sucesso!');
        setCategoryName('');
      } else if (response.status === 404) {
        Alert.alert('Erro', 'O endpoint não foi encontrado. Verifique a URL ou entre em contato com o suporte da API.');
      } else {
        const errorData = await response.json();
        console.log('Erro da API:', errorData);
        Alert.alert('Erro', errorData.message || 'Erro ao adicionar a categoria.');
      }
    } catch (error) {
      console.error('Erro ao adicionar categoria:', error);
      Alert.alert('Erro', 'Erro de rede ou problema ao conectar-se com a API.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar Categoria</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome *"
        value={categoryName}
        onChangeText={setCategoryName}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#28a745" />
      ) : (
        <Button title="Salvar" color="#28a745" onPress={handleSave} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});

export default AddCategory;
