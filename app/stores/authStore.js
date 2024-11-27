import { create } from "zustand";

const useAuthStore = create((set) => ({
  usuarioLogado: false,
  token: '',
  Login: async (usuario, senha) => {
    try {
      const loginResponse = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: usuario, // Nome de usuário
          password: senha,   // Senha do usuário
        }),
      });

      if (loginResponse.ok) {
        const loginData = await loginResponse.json();
        set({
          usuarioLogado: true,
          token: loginData.token, // Armazena o token retornado
        });
        return { success: true, message: 'Usuário logado com sucesso!' };
      } else {
        const errorData = await loginResponse.json();
        return { success: false, message: errorData.message || 'Erro ao fazer login!' };
      }
    } catch (error) {
      return { success: false, message: 'Ocorreu um erro inesperado. Tente novamente!' };
    }
  },
}));

export default useAuthStore;
