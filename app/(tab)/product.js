import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";

// Dados mockados para exibição inicial
const MOCK_DATA = [
  {
    id: 1,
    nome: "Abacate Paulista",
    preco: "R$ 8,99",
    local: "Mercale - Avenida Ceará",
    vendedor: "Alan123",
    imagem: "https://via.placeholder.com/100", // Exemplo de imagem placeholder
  },
  {
    id: 2,
    nome: "Abacate Paulista",
    preco: "R$ 8,99",
    local: "Mercale - Avenida Ceará",
    vendedor: "Alan123",
    imagem: "https://via.placeholder.com/100",
  },
  {
    id: 3,
    nome: "Abacate Paulista",
    preco: "R$ 8,99",
    local: "Mercale - Avenida Ceará",
    vendedor: "Alan123",
    imagem: "https://via.placeholder.com/100",
  },
];

// Simulação de busca de produtos
const fetchProducts = async (query = "") => {
  // Aqui você pode substituir pela chamada à API real.
  if (query) {
    return MOCK_DATA.filter((item) =>
      item.nome.toLowerCase().includes(query.toLowerCase())
    );
  }
  return MOCK_DATA;
};

export default function HomeScreen() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  // Carregar produtos inicialmente
  useEffect(() => {
    (async () => {
      const data = await fetchProducts();
      setProducts(data);
    })();
  }, []);

  // Função de busca de produtos
  const handleSearch = async () => {
    const data = await fetchProducts(search);
    setProducts(data);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>

      {/* Campo de Pesquisa */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar produto"
          value={search}
          onChangeText={setSearch}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>🔍</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de Produtos */}
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            {/* Imagem do Produto */}
            <Image source={{ uri: item.imagem }} style={styles.productImage} />
            
            {/* Detalhes do Produto */}
            <View style={styles.productDetails}>
              <Text style={styles.productName}>{item.nome}</Text>
              <Text style={styles.productPrice}>{item.preco}</Text>
              <Text style={styles.productLocation}>{item.local}</Text>
              <Text style={styles.productSeller}>Vendedor: {item.vendedor}</Text>
            </View>
          </View>
        )}
      />
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
  searchContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  searchButton: {
    marginLeft: 10,
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  searchButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  productItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  productDetails: {
    flex: 1,
    marginLeft: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    color: "#28a745",
    marginBottom: 5,
  },
  productLocation: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
  productSeller: {
    fontSize: 14,
    color: "#999",
  },
});