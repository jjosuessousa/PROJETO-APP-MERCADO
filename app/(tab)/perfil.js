import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import useAuthStore from '../stores/authStore';

export default function PerfilScreen() {
  const router = useRouter();
  const token = useAuthStore((state) => state.token); // Obtém o token
  const [user, setUser] = useState(null); // Armazena os dados do usuário
  const [loading, setLoading] = useState(true); // Indicador de carregamento

  // Função para buscar dados do perfil
  const fetchUserData = async () => {
    if (!token) {
      Alert.alert('Erro', 'Token inválido. Faça login novamente.');
      router.replace(''); // Redireciona para a tela de login
      return;
    }

    try {
      const response = await fetch('https://dummyjson.com/auth/users/me', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`, // Envia o token no cabeçalho
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
      setLoading(false); // Oculta indicador de carregamento
    }
  };

  // Busca os dados do usuário na montagem do componente
  useEffect(() => {
    fetchUserData();
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#27ae60" />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={styles.errorText}>Não foi possível carregar os dados do perfil.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: user.image || 'https://via.placeholder.com/100' }}
          style={styles.profileImage}
        />
        <Text style={styles.name}>{user.name || 'Usuário'}</Text>
      </View>

      <View style={styles.options}>
        {/* Opções do perfil */}
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => router.push('../editarPerfil')}
        >
          <Text style={styles.optionTitle}>Editar Perfil</Text>
          <Text style={styles.optionSubtitle}>Email, segurança, mudar número</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => Alert.alert('Sair', 'Função de logout não implementada.')}
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
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  optionSubtitle: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  errorText: {
    fontSize: 16,
    color: '#e74c3c',
  },
});
