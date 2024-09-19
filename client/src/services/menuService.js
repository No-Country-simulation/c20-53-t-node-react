import axios from "axios";
//import api from "./apiService";

export const getMenuItems = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/v1/dishes");
    return response.data;
  } catch (error) {
    console.error("Error fetching menu items:", error);
    throw error;
  }
};
// Función para agregar un nuevo plato
export const addMenuItem = async (newItem) => {
  try {
    const response = await axios.post("http://localhost:3000/api/v1/dishes", {
      name: newItem.name,
      price: newItem.price,
      description: newItem.description,
      photo: newItem.photo,
      categoryID: newItem.categoryID, // Incluimos categoryID en la solicitud
    });
    return response.data;
  } catch (error) {
    console.error("Error adding item:", error);
    throw error;
  }
};

// Función para eliminar un plato
export const deleteMenuItem = async (id) => {
  try {
    await axios.api.delete(`http://localhost:3000/api/v1/dishes/${id}`);
  } catch (error) {
    console.error("Error deleting item:", error);
    throw error;
  }
};
// menuService.js

// menuService.js

export const getRandomMenuItems = async () => {
  const response = await fetch("http://localhost:3000/api/v1/dishes/random");
  if (!response.ok) {
    throw new Error("Failed to fetch random dishes");
  }
  return response.json();
};

// Función para editar un plato
export const updateMenuItem = async (id, item) => {
  try {
    const response = await axios.patch(
      `http://localhost:3000/api/v1/dishes/${id}`,
      {
        name: item.name,
        description: item.description,
        price: item.price,
        photo: item.photo,
        categoryID: item.categoryID, // Incluimos categoryID en la solicitud
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating item:", error);
    throw error;
  }
};
