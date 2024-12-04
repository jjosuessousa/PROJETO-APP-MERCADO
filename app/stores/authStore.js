import { create } from 'zustand';

const useAuthStore = create((set, get) => ({
  token: '', // Inicialmente o token está vazio
  usuarioLogado: false,

  // Função para fazer login e armazenar o token
  Login: async (username, password) => {
    console.log('Botão de login pressionado');
    console.log(`Iniciando login com: ${username} ${password}`);

    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) { // Verifica se o status HTTP indica sucesso
        console.log('Login bem-sucedido:', data);
        set({
          token: data.accessToken,
          usuarioLogado: true,
        });
        return { success: true, data };
      } else {
        console.error('Erro no login:', data.message || 'Erro desconhecido');
        return { success: false, message: data.message || 'Erro ao fazer login' };
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      return { success: false, message: 'Erro inesperado. Tente novamente!' };
    }
  },

  // Função para obter detalhes do usuário usando o token
  getUserDetails: async () => {
    const token = get().token; // Recupera o token armazenado

    if (!token) {
      return { success: false, message: 'Token não encontrado!' };
    }

    try {
      const response = await fetch('https://dummyjson.com/auth/me', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`, // Inclui o token no cabeçalho Authorization
        },
        credentials: 'include', // Inclui cookies, se necessário
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Detalhes do usuário:', data);
        return { success: true, data };
      } else {
        console.error('Erro ao obter detalhes do usuário:', data.message || 'Erro desconhecido');
        return { success: false, message: data.message || 'Erro ao obter detalhes do usuário!' };
      }
    } catch (error) {
      console.error('Erro ao obter detalhes do usuário:', error);
      return { success: false, message: 'Erro inesperado. Tente novamente!' };
    }
  },

  // Função para realizar logout
  logout: () => {
    set({ token: '', usuarioLogado: false });
  },

  // Obter o token armazenado
  getToken: () => get().token,
}));

export default useAuthStore;
