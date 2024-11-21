import { create } from "zustand";

const useAuthStore = create((set) => ({
  usuariosCadastrados: [
    { username: "emilys", password: "emilyspass" },
    
  ],
  usuariologado: false,
  usuarioAtual: null,
  token: null,
  perfil: {}, // Armazena os dados do perfil do usuário

  // Ação para login
  login: async (username, password) => {
    const response = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      set({
        usuariologado: true,
        usuarioAtual: username,
        token: data.token, // Salva o token retornado pela API
      });
    } else {
      throw new Error("Credenciais inválidas");
    }
  },

  // Ação para buscar os dados do perfil
  buscarPerfil: async () => {
   const { token } = useAuthStore.getState(); // Obtém o token diretamente do estado
 
   if (!token) {
     throw new Error("Usuário não autenticado");
   }
 
   const response = await fetch("https://dummyjson.com/users/1", {
     method: "GET",
     headers: {
       Authorization: `Bearer ${token}`, // Usa o token no cabeçalho
     },
   });
 
   if (response.ok) {
     const data = await response.json();
     set({ perfil: data }); // Salva os dados do perfil no estado
   } else {
     throw new Error("Erro ao buscar perfil");
   }
 },
 

  logout: () => set({ usuariologado: false, usuarioAtual: null, token: null, perfil: {} }),
}));

export default useAuthStore;
