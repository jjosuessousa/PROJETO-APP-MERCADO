import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';

export default function AddLocation() {
  const [locations, setLocations] = useState([]);
  const [formData, setFormData] = useState({
    nome: '',
    cep: '',
    logradouro: '',
    numero: '',
    bairro: '',
    cidade: '',
    estado: '',
  });
  const [loading, setLoading] = useState(false);

  // Atualiza os dados do formulário
  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  // Função para adicionar um novo local
  const addLocation = async () => {
    // Valida se todos os campos obrigatórios foram preenchidos
    if (!formData.nome || !formData.cep) {
      Alert.alert('Erro', 'Os campos Nome e CEP são obrigatórios.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        'https://api-produtos-6p7n.onrender.com/locations',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const addedLocation = await response.json();
        setLocations((prev) => [...prev, addedLocation]); // Adiciona o local na lista
        Alert.alert('Sucesso', 'Local adicionado com sucesso!');
        setFormData({
          nome: '',
          cep: '',
          logradouro: '',
          numero: '',
          bairro: '',
          cidade: '',
          estado: '',
        }); // Limpa os campos do formulário
      } else {
        const errorData = await response.json();
        Alert.alert('Erro', errorData.message || 'Erro ao adicionar o local.');
      }
    } catch (error) {
      console.error('Erro ao adicionar o local:', error);
      Alert.alert('Erro', 'Ocorreu um erro de rede. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Adicionar Local</Text>

      {/* Campos do formulário */}
      {[
        { label: 'Nome *', field: 'nome' },
        { label: 'CEP *', field: 'cep', keyboardType: 'numeric' },
        { label: 'Logradouro', field: 'logradouro' },
        { label: 'Nº', field: 'numero', keyboardType: 'numeric' },
        { label: 'Bairro', field: 'bairro' },
        { label: 'Cidade', field: 'cidade' },
        { label: 'Estado', field: 'estado' },
      ].map(({ label, field, keyboardType }) => (
        <TextInput
          key={field}
          style={styles.input}
          placeholder={label}
          value={formData[field]}
          onChangeText={(value) => handleInputChange(field, value)}
          keyboardType={keyboardType || 'default'}
        />
      ))}

      {/* Botão de salvar */}
      <View style={styles.buttonContainer}>
        <Button
          title={loading ? 'Salvando...' : 'Salvar'}
          onPress={addLocation}
          disabled={loading}
          color="#28a745"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    marginTop: 20,
  },
});
