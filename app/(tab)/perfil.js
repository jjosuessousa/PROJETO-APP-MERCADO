import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import useAuthStore from '../stores/authStore'; // Importa a loja Zustand

export default function PerfilScreen() {
  const router = useRouter();
  const token = useAuthStore((state) => state.token); // Obtém o token do Zustand
  const logout = useAuthStore((state) => state.logout); // Função para logout
  const [user, setUser] = useState(null); // Estado para armazenar os dados do usuário
  const [loading, setLoading] = useState(true); // Estado para indicador de carregamento

  // Função para buscar os dados do perfil do usuário
  const fetchUserData = async () => {
    if (!token) {
      Alert.alert('Erro', 'Token inválido ou não encontrado. Faça login novamente.');
      router.replace('/login'); // Redireciona para a tela de login
      setLoading(false);
      return;
    }

    console.log('Token:', token); // Verifica o token no console

    try {
      const response = await fetch('https://dummyjson.com/auth/me', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`, // Adiciona o token no cabeçalho
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData); // Define os dados do usuário
      } else {
        throw new Error('Falha ao buscar os dados do perfil.');
      }
    } catch (error) {
      Alert.alert('Erro', error.message);
    } finally {
      setLoading(false); // Oculta o indicador de carregamento
    }
  };

  // Busca os dados do usuário ao montar o componente
  useEffect(() => {
    fetchUserData();
  }, []);

  // Renderiza um indicador de carregamento enquanto os dados estão sendo buscados
  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#27ae60" />
      </View>
    );
  }

  // Renderiza uma mensagem de erro se os dados do usuário não forem encontrados
  if (!user) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={styles.errorText}>Não foi possível carregar os dados do perfil.</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={fetchUserData} // Tenta buscar os dados novamente
        >
          <Text style={styles.retryButtonText}>Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Renderiza os dados do perfil do usuário
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: user.image || 'https://via.placeholder.com/100' }}
          style={styles.profileImage}
        />
        <Text style={styles.name}>{user.firstName} {user.lastName || 'Usuário'}</Text>
      </View>

      <View style={styles.options}>
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => router.push('/editarPerfil')} // Redireciona para a tela de edição de perfil
        >
          <Text style={styles.optionTitle}>Editar Perfil</Text>
          <Text style={styles.optionSubtitle}>Atualizar email, segurança, etc.</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => {
            logout(); // Executa logout
            router.replace('home'); // Redireciona para a tela de login
          }}
        >
          <Text style={styles.optionTitle}>Sair</Text>
          <Text style={styles.optionSubtitle}>Fazer logout do aplicativo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#27ae60',
    alignItems: 'center',
    paddingVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  options: {
    marginTop: 20,
  },
  optionButton: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  optionSubtitle: {
    fontSize: 14,
    color: '#888',
  },
  retryButton: {
    padding: 10,
    backgroundColor: '#27ae60',
    borderRadius: 5,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 16,
    color: '#e74c3c',
    marginBottom: 20,
  },
});
