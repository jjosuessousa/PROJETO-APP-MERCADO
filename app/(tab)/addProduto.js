import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";

export default function Produtos() {
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [preco, setPreco] = useState("");
  const [nome, setNome] = useState("");
  const [categoria, setCategoria] = useState("");
  const [local, setLocal] = useState("");
  const [descricao, setDescricao] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    async function loadCategories() {
      try {
        const response = await fetch(
          "https://api-produtos-6p7n.onrender.com/categories"
        );
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        Alert.alert("Erro", "Não foi possível carregar as categorias.");
      }
    }

    async function loadLocations() {
      try {
        const response = await fetch(
          "https://api-produtos-6p7n.onrender.com/locations"
        );
        const data = await response.json();
        setLocations(data);
      } catch (error) {
        Alert.alert("Erro", "Não foi possível carregar os locais.");
      }
    }

    loadCategories();
    loadLocations();
  }, []);

  const handleInputChange = (text) => {
    const numericValue = text.replace(/[^0-9.]/g, "");
    setPreco(numericValue);
  };

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permissão necessária",
        "Permita o acesso à galeria para selecionar imagens."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const permissionResult =
      await ImagePicker.requestCameraPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permissão necessária",
        "Permita o acesso à câmera para tirar fotos."
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const cadastrar = async () => {
    if (!selectedImage || !nome || !preco || !categoria || !local) {
      Alert.alert("Erro", "Por favor, preencha todos os campos obrigatórios!");
      return;
    }

    const data = new FormData();
    data.append("nome", nome);
    data.append("preco", preco);
    data.append("descricao", descricao);
    data.append("usuario", "Osvaldo");
    data.append("categoriaId", categoria);
    data.append("localId", local);
    data.append("image", {
      uri: selectedImage,
      type: "image/jpeg",
      name: "image.jpg",
    });

    const url = "https://api-produtos-6p7n.onrender.com/products";
    try {
      const response = await fetch(url, {
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        Alert.alert("Sucesso", "Produto cadastrado com sucesso!");
        setNome("");
        setPreco("");
        setDescricao("");
        setCategoria("");
        setLocal("");
        setSelectedImage(null);
      } else {
        const errorData = await response.json();
        Alert.alert(
          "Erro",
          errorData.message || "Erro ao cadastrar o produto!"
        );
      }
    } catch (error) {
      Alert.alert("Erro", "Erro ao enviar os dados para a API!");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.label}>Nome *</Text>
        <TextInput style={styles.input} onChangeText={setNome} value={nome} />

        <Text style={styles.label}>Preço *</Text>
        <TextInput
          style={styles.input}
          value={preco}
          onChangeText={handleInputChange}
          keyboardType="numeric"
          placeholder="Digite um valor numérico"
        />

        <Text style={styles.label}>Local *</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={local}
            style={styles.picker}
            onValueChange={(itemValue) => setLocal(itemValue)}
          >
            <Picker.Item label="Selecione um local..." value="" />
            {locations.map((location) => (
              <Picker.Item
                key={location.id}
                label={location.nome}
                value={location.id}
              />
            ))}
          </Picker>
        </View>

        <Text style={styles.label}>Categorias *</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={categoria}
            style={styles.picker}
            onValueChange={(itemValue) => setCategoria(itemValue)}
          >
            <Picker.Item label="Selecione uma categoria..." value="" />
            {categories.map((category) => (
              <Picker.Item
                key={category.id}
                label={category.nome}
                value={category.id}
              />
            ))}
          </Picker>
        </View>

        <Text style={styles.label}>Observação</Text>
        <TextInput
          style={styles.input}
          onChangeText={setDescricao}
          value={descricao}
        />

        <Text style={styles.label}>Fotos *</Text>
        <View style={styles.boxImage}>
          {selectedImage ? (
            <>
              <Image
                source={{ uri: selectedImage }}
                style={styles.imagePreview}
              />
              <TouchableOpacity
                onPress={() => setSelectedImage(null)}
                style={styles.removeButton}
              >
                <Text style={styles.removeButtonText}>Excluir</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity onPress={pickImage} style={styles.addButton}>
                <Text style={styles.addButtonText}>Selecionar da Galeria</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={takePhoto} style={styles.addButton}>
                <Text style={styles.addButtonText}>Tirar Foto</Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        <TouchableOpacity onPress={cadastrar} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  label: { marginBottom: 5, fontSize: 16, fontWeight: "bold" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    height: 40,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 15,
  },
  picker: { height: 40 },
  boxImage: { marginBottom: 20 },
  imagePreview: { width: 100, height: 100, marginBottom: 10 },
  removeButton: { backgroundColor: "red", padding: 10, borderRadius: 5 },
  removeButtonText: { color: "white", textAlign: "center" },
  addButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  addButtonText: { color: "white", textAlign: "center" },
  saveButton: { backgroundColor: "#28a745", padding: 15, borderRadius: 5 },
  saveButtonText: { color: "white", textAlign: "center", fontSize: 16 },
});
