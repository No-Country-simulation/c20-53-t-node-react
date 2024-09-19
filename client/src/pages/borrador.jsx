import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, deleteItem, editItem } from "../store/menuSlice";
import {
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from "../services/menuService";
import Navbar from "../components/Navbar";

// Definir las categorías y subcategorías con IDs en formato MongoDB
const categories = {
  platos: {
    id: "64c123456789012345678901",
    name: "Platos",
    subcategories: {
      carnes: { id: "64c123456789012345678902", name: "Carnes" },
      pastas: { id: "64c123456789012345678903", name: "Pastas" },
      guarniciones: { id: "64c123456789012345678904", name: "Guarniciones" },
    },
  },
  bebidas: {
    id: "64c223456789012345678901",
    name: "Bebidas",
    subcategories: {
      vinosCervezas: { id: "64c223456789012345678902", name: "Vinos/Cervezas" },
      sinAlcohol: { id: "64c223456789012345678903", name: "Sin Alcohol" },
    },
  },
  postres: {
    id: "64c323456789012345678901",
    name: "Postres",
    subcategories: {
      helados: { id: "64c323456789012345678902", name: "Helados" },
      tortas: { id: "64c323456789012345678903", name: "Tortas" },
    },
  },
};

function OwnerPage() {
  const dispatch = useDispatch();
  const menuItems = useSelector((state) => state.menu.items);
  const [newItem, setNewItem] = useState({
    name: "",
    price: "",
    description: "",
    photo: "",
    categoryID: "",
    subcategoryID: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentItemId, setCurrentItemId] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // Estado para la búsqueda

  const handleAddOrEditItem = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        const updatedItem = await updateMenuItem(currentItemId, newItem);
        dispatch(editItem({ id: currentItemId, updatedItem }));
        setNewItem({
          name: "",
          price: "",
          description: "",
          photo: "",
          categoryID: "",
          subcategoryID: "",
        });
        setIsEditing(false);
        setCurrentItemId(null);
      } else {
        const addedItem = await addMenuItem(newItem);
        dispatch(addItem(addedItem));
        setNewItem({
          name: "",
          price: "",
          description: "",
          photo: "",
          categoryID: "",
          subcategoryID: "",
        });
      }
    } catch (error) {
      console.error("Error during operation:", error);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await deleteMenuItem(id);
      dispatch(deleteItem(id));
    } catch (error) {
      console.error("Error during deletion:", error);
    }
  };

  const handleEditItem = (item) => {
    setNewItem({
      name: item.name,
      price: item.price,
      description: item.description,
      photo: item.photo,
      categoryID: item.categoryID,
      subcategoryID: item.subcategoryID,
    });
    setCurrentItemId(item.id);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setNewItem({
      name: "",
      price: "",
      description: "",
      photo: "",
      categoryID: "",
      subcategoryID: "",
    });
    setIsEditing(false);
    setCurrentItemId(null);
  };

  // Filtrar los items por el término de búsqueda
  const filteredItems = menuItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Obtener el nombre de la categoría y subcategoría a partir de los IDs
  const getCategoryName = (categoryID) => {
    for (let key in categories) {
      if (categories[key].id === categoryID) return categories[key].name;
      for (let subKey in categories[key].subcategories) {
        if (categories[key].subcategories[subKey].id === categoryID)
          return categories[key].subcategories[subKey].name;
      }
    }
    return "Desconocido";
  };

  return (
    <div>
      <Navbar />
      <h2>Gestión del Menú</h2>

      {/* Campo de búsqueda */}
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Buscar por nombre"
      />

      <form onSubmit={handleAddOrEditItem}>
        <input
          type="text"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          placeholder="Nombre del Plato"
          required
        />
        <input
          type="number"
          value={newItem.price}
          onChange={(e) =>
            setNewItem({ ...newItem, price: Number(e.target.value) })
          }
          placeholder="Precio"
          required
        />
        <input
          type="text"
          value={newItem.description}
          onChange={(e) =>
            setNewItem({ ...newItem, description: e.target.value })
          }
          placeholder="Descripción"
          required
        />
        <input
          type="text"
          value={newItem.photo}
          onChange={(e) => setNewItem({ ...newItem, photo: e.target.value })}
          placeholder="URL de la Imagen"
          required
        />

        <select
          value={newItem.categoryID}
          onChange={(e) =>
            setNewItem({
              ...newItem,
              categoryID: e.target.value,
              subcategoryID: "",
            })
          }
          required
        >
          <option value="">Seleccione una Categoría</option>
          {Object.keys(categories).map((key) => (
            <option key={categories[key].id} value={categories[key].id}>
              {categories[key].name}
            </option>
          ))}
        </select>

        {newItem.categoryID && (
          <select
            value={newItem.subcategoryID}
            onChange={(e) =>
              setNewItem({ ...newItem, subcategoryID: e.target.value })
            }
            required
          >
            <option value="">Seleccione una Subcategoría</option>
            {Object.keys(categories).map((key) =>
              categories[key].id === newItem.categoryID
                ? Object.keys(categories[key].subcategories).map((subKey) => (
                    <option
                      key={categories[key].subcategories[subKey].id}
                      value={categories[key].subcategories[subKey].id}
                    >
                      {categories[key].subcategories[subKey].name}
                    </option>
                  ))
                : null
            )}
          </select>
        )}

        <button type="submit">
          {isEditing ? "Guardar Cambios" : "Agregar Plato"}
        </button>
        {isEditing && (
          <button type="button" onClick={handleCancelEdit}>
            Cancelar
          </button>
        )}
      </form>

      <div>
        {filteredItems.map((item) => (
          <div key={item.id}>
            <h3>{item.name}</h3>
            <p>Precio: ${item.price}</p>
            <p>Descripción: {item.description}</p>
            <img src={item.photo} alt={item.name} width="100" />
            <p>Categoría: {getCategoryName(item.categoryID)}</p>
            <p>
              Subcategoría:{" "}
              {item.subcategoryID ? getCategoryName(item.subcategoryID) : "N/A"}
            </p>
            <button onClick={() => handleEditItem(item)}>Editar</button>
            <button onClick={() => handleDeleteItem(item.id)}>Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OwnerPage;
