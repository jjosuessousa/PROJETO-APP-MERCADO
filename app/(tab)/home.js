import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import debounce from 'lodash/debounce'; // Importa debounce

export default function Home() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadProducts = async () => {
    const url = "https://api-produtos-6p7n.onrender.com/products";
    try {
      setLoading(true);
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } else {
        alert('Erro ao buscar produtos');
      }
    } catch (error) {
      alert('Erro ao carregar os produtos: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Recarrega produtos ao focar na tela
  useFocusEffect(
    useCallback(() => {
      loadProducts();
    }, [])
  );

  // Função de filtro com debounce
  const filterProducts = useCallback(
    debounce((query) => {
      const lowercasedQuery = query.toLowerCase();
      const filtered = products.filter((product) =>
        product.nome.toLowerCase().includes(lowercasedQuery) ||
        product.descricao?.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredProducts(filtered);
    }, 300), // Aguarda 300ms após o término da digitação
    [products]
  );

  // Atualiza o estado e executa o filtro
  const handleSearchChange = (query) => {
    setSearchQuery(query);
    filterProducts(query);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar produto"
          value={searchQuery}
          onChangeText={handleSearchChange} // Substitui a função de busca
        />
        <Icon name="search-outline" size={20} color="#999" style={styles.searchIcon} />
      </View>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4CAF50" />
          <Text style={styles.loadingText}>Carregando produtos...</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollView}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <View key={product.id} style={styles.productCard}>
                <Image
                  source={{ uri: `https://api-produtos-6p7n.onrender.com/${product.image}` }}
                  style={styles.productImage}
                />
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{product.nome}</Text>
                  <Text style={styles.productLocation}>
                    <Icon name="location-outline" size={14} color="#4CAF50" />{' '}
                    {product.Location?.nome || "Localização não informada"}
                  </Text>
                  <Text style={styles.productUser}>
                    <Icon name="person-outline" size={14} color="#4CAF50" />{' '}
                    {product.user || "Usuário não informado"}
                  </Text>
                  <Text style={styles.productPrice}>R$ {product.preco}</Text>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.noProductsText}>Nenhum produto encontrado</Text>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#f9f9f9',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  searchIcon: {
    marginLeft: 8,
  },
  scrollView: {
    paddingBottom: 16,
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  productInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  productLocation: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 4,
  },
  productUser: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  noProductsText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#757575',
    marginTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#757575',
  },
});
