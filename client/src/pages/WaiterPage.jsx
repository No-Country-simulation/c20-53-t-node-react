import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import styles from "../styles/WaiterPage.module.css";
import { getMenuItems } from "../services/menuService";

function WaiterPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const items = await getMenuItems();
        setMenuItems(items);
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };
    fetchData();
  }, []);

  // Filtrar platos por nombre
  const filteredMenu = menuItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Agregar al carrito
  const addToCart = (menuItem) => {
    setCartItems((prevCart) => [...prevCart, menuItem]);
  };

  // Eliminar del carrito
  const removeFromCart = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
  };

  return (
    <div className={styles.waiterPage}>
      <Navbar />
      <h2>Tomar Órdenes</h2>

      <SearchBar onSearch={setSearchTerm} />

      <div className={styles.menuList}>
        {filteredMenu.length > 0 ? (
          filteredMenu.map((item) => (
            <div key={item.id} className={styles.menuItem}>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p>Precio: ${item.price}</p>
              <button onClick={() => addToCart(item)}>Añadir al Pedido</button>
            </div>
          ))
        ) : (
          <p>No se encontraron platos</p>
        )}
      </div>

      <div className={styles.cart}>
        <h3>Carrito</h3>
        {cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <div key={index} className={styles.cartItem}>
              <span>{item.name}</span>
              <span>${item.price}</span>
              <button onClick={() => removeFromCart(index)}>Eliminar</button>
            </div>
          ))
        ) : (
          <p>El carrito está vacío</p>
        )}
      </div>
    </div>
  );
}

export default WaiterPage;
