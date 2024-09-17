// pages/OwnerPage.jsx
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../store/menuSlice";
import axios from "axios";

function OwnerPage() {
  const dispatch = useDispatch();
  const menuItems = useSelector((state) => state.menu.items);
  const [newItem, setNewItem] = useState({ name: "", price: "" });

  const handleAddItem = (e) => {
    e.preventDefault();
    axios
      .post("/api/menu", newItem)
      .then((response) => {
        dispatch(addItem(response.data));
        setNewItem({ name: "", price: "" });
      })
      .catch((error) => console.error(error));
  };
  const handleDeleteItem = (id) => {
    axios
      .delete(`/api/menu/${id}`)
      .then(() => {
        dispatch(deleteItem(id));
      })
      .catch((error) => console.error(error));
  };
  return (
    <div>
      <h2>Gestión del Menú</h2>
      <form onSubmit={handleAddItem}>
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
          onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
          placeholder="Precio"
          required
        />
        <button type="submit">Agregar Plato</button>
      </form>

      <div>
        {menuItems.map((item) => (
          <div key={item.id}>
            <h3>{item.name}</h3>
            <p>Precio: ${item.price}</p>
            <button onClick={() => handleDeleteItem(item.id)}>Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OwnerPage;
