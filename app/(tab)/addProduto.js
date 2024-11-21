
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

const API_PRODUCTS_URL = "https://api-produtos-6p7n.onrender.com/products";

export default function AddProduto() {
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [local, setLocal] = useState("");
  const [categoria, setCategoria] = useState("");
  const [observacao, setObservacao] = useState("");
  const [foto, setFoto] = useState(null); // Foto capturada

  // Função para abrir a câmera
  const handleTakePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Permissão necessária", "É necessário permitir o uso da câmera.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
    });

    if (!result.canceled) {
      setFoto(result.uri);
    }
  };

  // Função para salvar o produto
  const handleAddProduct = async () => {
    if (!nome || !preco || !local || !categoria || !foto) {
      Alert.alert("Erro", "Preencha todos os campos obrigatórios.");
      return;
    }

    const formData = new FormData();
    formData.append("nome", nome);
    formData.append("preco", preco);
    formData.append("local", local);
    formData.append("categoria", categoria);
    formData.append("observacao", observacao);
    formData.append("foto", {
      uri: foto,
      type: "image/jpeg",
      name: `foto_${Date.now()}.jpg`,
    });

    try {
      const response = await fetch(API_PRODUCTS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });

      if (response.ok) {
        Alert.alert("Sucesso", "Produto adicionado com sucesso!");
        setNome("");
        setPreco("");
        setLocal("");
        setCategoria("");
        setObservacao("");
        setFoto(null);
      } else {
        Alert.alert("Erro", "Não foi possível adicionar o produto.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Ocorreu um erro ao adicionar o produto.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar Produto</Text>

      {/* Campo Local */}
      <TextInput
        style={styles.input}
        placeholder="Local *"
        value={local}
        onChangeText={setLocal}
      />

      {/* Campo Nome */}
      <TextInput
        style={styles.input}
        placeholder="Nome *"
        value={nome}
        onChangeText={setNome}
      />

      {/* Campo Preço */}
      <TextInput
        style={styles.input}
        placeholder="Preço *"
        keyboardType="numeric"
        value={preco}
        onChangeText={setPreco}
      />

      {/* Campo Categoria */}
      <TextInput
        style={styles.input}
        placeholder="Categoria *"
        value={categoria}
        onChangeText={setCategoria}
      />

      {/* Campo Observação */}
      <TextInput
        style={styles.input}
        placeholder="Observação"
        value={observacao}
        onChangeText={setObservacao}
        multiline
      />

      {/* Campo para Capturar Foto */}
      <View style={styles.photoContainer}>
        <TouchableOpacity style={styles.photoButton} onPress={handleTakePhoto}>
          <Text style={styles.photoButtonText}>Adicionar Foto</Text>
        </TouchableOpacity>
        {foto && (
          <View style={styles.imagePreview}>
            <Image source={{ uri: foto }} style={styles.image} />
            <TouchableOpacity onPress={() => setFoto(null)}>
              <Text style={styles.deleteText}>Excluir</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Botão Salvar */}
      <TouchableOpacity style={styles.saveButton} onPress={handleAddProduct}>
        <Text style={styles.saveButtonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  photoContainer: {
    marginBottom: 20,
  },
  photoButton: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  photoButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  imagePreview: {
    marginTop: 10,
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 5,
  },
  deleteText: {
    color: "red",
    fontSize: 14,
    textDecorationLine: "underline",
  },
  saveButton: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
