import api from "./apiService";

// Servicio para hacer login
export const login = async (email, password) => {
  try {
    const response = await api.post("/auth/auth", {
      email,
      password,
    });
    const { access_token } = response.data;
    localStorage.setItem("token", access_token); // Guardar el token en localStorage
    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

// Servicio para hacer registro
export const register = async (email, password, name, phone) => {
  try {
    const response = await api.post("/auth", { email, password });
    return response.data;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};

// Servicio para obtener el perfil del usuario autenticado
export const getProfile = async () => {
  try {
    const response = await api.get("/auth/profile");
    return response.data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
};

// Servicio para hacer logout
export const logout = () => {
  localStorage.removeItem("token");
};
