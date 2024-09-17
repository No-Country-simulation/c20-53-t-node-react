import api from "./apiService";

// Servicio para obtener todos los items del menú
export const getMenuItems = async () => {
  try {
    const response = await api.get("/dishes");
    return response.data;
  } catch (error) {
    console.error("Error fetching menu items:", error);
    throw error;
  }
};

// Servicio para crear un nuevo item en el menú
export const createMenuItem = async (menuItem) => {
  try {
    const response = await api.post("/dishes", menuItem);
    return response.data;
  } catch (error) {
    console.error("Error creating menu item:", error);
    throw error;
  }
};

// Servicio para actualizar un item del menú
export const updateMenuItem = async (id, menuItem) => {
  try {
    const response = await api.put(`/dishes/${id}`, menuItem);
    return response.data;
  } catch (error) {
    console.error("Error updating menu item:", error);
    throw error;
  }
};

// Servicio para eliminar un item del menú
export const deleteMenuItem = async (id) => {
  try {
    const response = await api.delete(`/dishes/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting menu item:", error);
    throw error;
  }
};
