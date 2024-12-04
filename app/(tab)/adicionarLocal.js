import React, { useState } from 'react'; 
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native'; 
 
export default function AddLocation() { 
  const [name, setName] = useState(''); 
  const [cep, setCep] = useState(''); 
  const [logradouro, setLogradouro] = useState(''); 
  const [numero, setNumero] = useState(''); 
  const [bairro, setBairro] = useState(''); 
  const [cidade, setCidade] = useState(''); 
  const [estado, setEstado] = useState(''); 
  const [loading, setLoading] = useState(false); 
 
  // Função para buscar os dados do endereço a partir do CEP 
  const fetchAddressByCep = async (cep) => { 
    if (cep.length !== 8) return; // Validar se o CEP tem 8 caracteres 
 
    setLoading(true); 
     
    try { 
      const response = await fetch(`https://brasilapi.com.br/api/cep/v2/${cep}`); 
       
      // Verificar se a resposta foi bem-sucedida 
      if (response.ok) { 
        const data = await response.json(); 
         
        // Verifica se os dados existem 
        if (data) { 
          setLogradouro(data.street || ''); 
          setBairro(data.neighborhood || ''); 
          setCidade(data.city || ''); 
          setEstado(data.state || ''); 
        } else { 
          Alert.alert('CEP não encontrado!', 'O CEP informado não retornou resultados válidos.'); 
        } 
      } else { 
        throw new Error('Falha ao buscar o CEP. Tente novamente.'); 
      } 
    } catch (error) { 
      console.error('Erro ao buscar o CEP:', error); 
      Alert.alert('Erro ao buscar o CEP', 'Tente novamente mais tarde.'); 
    } finally { 
      setLoading(false); 
    } 
  }; 
 
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
    Alert.alert('Dados salvos com sucesso!'); 
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
        onChangeText={(text) => { 
          setCep(text); 
          if (text.length === 8) { 
            fetchAddressByCep(text); // Chama a função para buscar dados do CEP 
          } 
        }} 
        placeholder="Digite o CEP" 
        keyboardType="numeric" 
      /> 
 
      {loading && <Text>Carregando...</Text>} 
 
      <Text style={styles.label}>Logradouro</Text> 
      <TextInput 
        style={styles.input} 
        value={logradouro} 
        onChangeText={setLogradouro} 
        placeholder="Digite o logradouro" 
        editable={false} // Desabilitado, pois será preenchido automaticamente 
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
        editable={false} // Desabilitado, pois será preenchido automaticamente 
      /> 
 
      <Text style={styles.label}>Cidade</Text> 
      <TextInput 
        style={styles.input} 
        value={cidade} 
        onChangeText={setCidade} 
        placeholder="Digite a cidade" 
        editable={false} // Desabilitado, pois será preenchido automaticamente 
      /> 
 
      <Text style={styles.label}>Estado</Text> 
      <TextInput 
        style={styles.input} 
        value={estado} 
        onChangeText={setEstado} 
        placeholder="Digite o estado" 
        editable={false} // Desabilitado, pois serápreenchido automaticamente 
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