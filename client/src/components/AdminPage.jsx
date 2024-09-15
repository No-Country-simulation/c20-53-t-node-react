import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addDish, updateDish, deleteDish } from "../store/menuSlice";

function AdminPage() {
  const dispatch = useDispatch();
  const menuItems = useSelector((state) => state.menu.items);
  const [newDish, setNewDish] = useState({ name: "", price: "" });
  const [selectedDish, setSelectedDish] = useState(null);

  const handleAddDish = () => {
    dispatch(addDish(newDish));
    setNewDish({ name: "", price: "" });
  };

  const handleUpdateDish = () => {
    dispatch(updateDish(selectedDish));
    setSelectedDish(null);
  };

  const handleDeleteDish = (id) => {
    dispatch(deleteDish(id));
  };

  return (
    <div>
      <h1>Administrar Platos del Menú</h1>

      {/* Agregar nuevo plato */}
      <h2>Agregar Nuevo Plato</h2>
      <input
        type="text"
        placeholder="Nombre del Plato"
        value={newDish.name}
        onChange={(e) => setNewDish({ ...newDish, name: e.target.value })}
      />
      <input
        type="number"
        placeholder="Precio"
        value={newDish.price}
        onChange={(e) => setNewDish({ ...newDish, price: e.target.value })}
      />
      <button onClick={handleAddDish}>Agregar</button>

      {/* Listar platos y opciones de editar/eliminar */}
      <h2>Editar o Eliminar Platos</h2>
      <ul>
        {menuItems.map((item) => (
          <li key={item.id}>
            {selectedDish && selectedDish.id === item.id ? (
              <>
                <input
                  type="text"
                  value={selectedDish.name}
                  onChange={(e) =>
                    setSelectedDish({ ...selectedDish, name: e.target.value })
                  }
                />
                <input
                  type="number"
                  value={selectedDish.price}
                  onChange={(e) =>
                    setSelectedDish({ ...selectedDish, price: e.target.value })
                  }
                />
                <button onClick={handleUpdateDish}>Guardar</button>
              </>
            ) : (
              <>
                {item.name} - ${item.price}
                <button onClick={() => setSelectedDish(item)}>Editar</button>
                <button onClick={() => handleDeleteDish(item.id)}>
                  Eliminar
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPage;
