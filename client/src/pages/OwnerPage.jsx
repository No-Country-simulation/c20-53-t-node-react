import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, deleteItem, editItem, setItems } from "../store/menuSlice";
import {
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
  getMenuItems,
} from "../services/menuService";
import Navbar from "../components/Navbar";
import styles from "../styles/OwnerPage.module.css";
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
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentItemId, setCurrentItemId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const items = await getMenuItems(searchTerm);
        dispatch(setItems(items));
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    fetchItems();
  }, [searchTerm, dispatch]);

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
    });
    setIsEditing(false);
    setCurrentItemId(null);
  };
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
    <div className={styles.container}>
      <Navbar className={styles.navbar} />
      <h2>Gestión del Menú</h2>
      <form className={styles.form} onSubmit={handleAddOrEditItem}>
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
            setNewItem({ ...newItem, categoryID: e.target.value })
          }
          required
        >
          <option value="">Selecciona una categoría</option>
          <optgroup label="Platos">
            <option value="64b8e2e4c45e3b4faef8f2f0">Carnes</option>
            <option value="64b8e2e4c45e3b4faef8f2f1">Pastas</option>
            <option value="64b8e2e4c45e3b4faef8f2f2">Guarniciones</option>
          </optgroup>
          <optgroup label="Bebidas">
            <option value="64b8e2e4c45e3b4faef8f2f3">Vinos/Cervezas</option>
            <option value="64b8e2e4c45e3b4faef8f2f4">Sin Alcohol</option>
          </optgroup>
          <optgroup label="Postres">
            <option value="64b8e2e4c45e3b4faef8f2f5">Helados</option>
            <option value="64b8e2e4c45e3b4faef8f2f6">Tortas</option>
          </optgroup>
        </select>
        <button type="submit">
          {isEditing ? "Guardar Cambios" : "Agregar Plato"}
        </button>
        {isEditing && (
          <button type="button" onClick={handleCancelEdit}>
            Cancelar
          </button>
        )}
      </form>

      <div className={styles.search}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar por nombre"
        />
      </div>

      <div className={styles.itemList}>
        {menuItems.map((item) => (
          <div className={styles.item} key={item.id}>
            <h3>{item.name}</h3>
            <p>Precio: ${item.price}</p>
            <p>Descripción: {item.description}</p>
            <img src={item.photo} alt={item.name} />
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
