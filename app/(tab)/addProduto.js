import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

export default function AddDataWithImage() {
  // Estados para armazenar os valores dos campos do formulário
  const [local, setLocal] = useState('');
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [categoria, setCategoria] = useState('');
  const [observacao, setObservacao] = useState('');
  const [pickedImage, setPickedImage] = useState(null);

  // Hook para gerenciar permissões de câmera
  const [cameraPermissionInformation, requestPermission] = useCameraPermissions();

  // Função para verificar se a permissão para acessar a câmera foi concedida
  async function verifyPermission() {
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission(); // Solicita permissão
      return permissionResponse.granted; // Retorna se a permissão foi concedida
    }

    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Permissão Negada',
        'Conceda acesso à câmera para usar este recurso.'
      );
      return false; // Permissão negada
    }

    return true; // Permissão já concedida
  }

  // Função chamada ao pressionar o botão "Tirar Foto"
  async function handleTakePhoto() {
    const hasPermission = await verifyPermission(); // Verifica permissões
    if (!hasPermission) return; // Interrompe se não houver permissão

    const imageResult = await launchCameraAsync({
      allowsEditing: true, // Permite edição da imagem
      aspect: [16, 9], // Define proporção
      quality: 0.5, // Reduz qualidade para economizar espaço
    });

    if (!imageResult.canceled) {
      setPickedImage(imageResult.assets[0].uri); // Armazena o URI da imagem capturada
    }
  }

  // Função para salvar a imagem e os dados no dispositivo
  async function handleSaveData() {
    // Valida se todos os campos obrigatórios estão preenchidos
    if (!local || !nome || !preco || !categoria || !pickedImage) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios.');
      return;
    }

    try {
      // Copia a imagem para o armazenamento interno do dispositivo
      const fileName = pickedImage.split('/').pop(); // Extrai o nome do arquivo da URI
      const newPath = FileSystem.documentDirectory + fileName;

      await FileSystem.copyAsync({ from: pickedImage, to: newPath });

      Alert.alert(
        'Dados Salvos',
        `Imagem salva com sucesso!\nLocal: ${newPath}\n\nOutros Dados:\n- Local: ${local}\n- Nome: ${nome}\n- Preço: ${preco}\n- Categoria: ${categoria}\n- Observação: ${observacao}`
      );
    } catch (error) {
      Alert.alert('Erro', 'Houve um problema ao salvar os dados.');
    }
  }

  // Variável para exibir a imagem ou uma mensagem padrão
  let imagePreview = <Text style={styles.previewText}>Nenhuma imagem capturada</Text>;
  if (pickedImage) {
    imagePreview = <Image source={{ uri: pickedImage }} style={styles.imageStyle} />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Adicionar Dados</Text>

      <Text style={styles.label}>Local *</Text>
      <TextInput
        style={styles.input}
        value={local}
        onChangeText={setLocal}
        placeholder="Digite o local"
      />

      <Text style={styles.label}>Nome *</Text>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
        placeholder="Digite o nome"
      />

      <Text style={styles.label}>Preço *</Text>
      <TextInput
        style={styles.input}
        value={preco}
        onChangeText={setPreco}
        placeholder="Digite o preço"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Categoria *</Text>
      <TextInput
        style={styles.input}
        value={categoria}
        onChangeText={setCategoria}
        placeholder="Digite a categoria"
      />

      <Text style={styles.label}>Observação</Text>
      <TextInput
        style={[styles.input, styles.textarea]}
        value={observacao}
        onChangeText={setObservacao}
        placeholder="Digite alguma observação"
        multiline
        numberOfLines={4}
      />

      <View style={styles.imagePreviewContainer}>{imagePreview}</View>

      <Button title="Tirar Foto" onPress={handleTakePhoto} />
      <Button title="Salvar Dados" onPress={handleSaveData} color="#28a745" />
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
  textarea: {
    height: 80,
  },
  imagePreviewContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 200,
    backgroundColor: '#f0cced',
    marginVertical: 8,
    borderRadius: 8,
  },
  previewText: {
    color: '#592454',
  },
  imageStyle: {
    width: '100%',
    height: '100%',
  },
});
