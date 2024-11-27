import React from 'react';
import { View, Text, Button } from 'react-native';
import useAuthStore from '../stores/authStore';

export default function Home() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <View style={{ padding: 20 }}>
      <Text>Bem-vindo, {user?.username}!</Text>
      <Button title="Sair" onPress={logout} />
    </View>
  );
}
