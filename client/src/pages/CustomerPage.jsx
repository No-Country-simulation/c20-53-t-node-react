import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
//import axios from "axios";
import styles from "../styles/CustomerPage.module.css";
import { getMenuItems } from "../services/menuService";

function CustomerPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMenuItems();
        setMenuItems(data);
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };
    fetchData();
  }, []);

  const filteredMenu = menuItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      <h2>Menú</h2>
      <SearchBar onSearch={setSearchTerm} />
      <div className={styles.menuList}>
        {filteredMenu.map((item) => (
          <div key={item.id} className={styles.menuItem}>
            <h3>{item.name}</h3>
            <p>Precio: ${item.price}</p>
            <button>Añadir al Pedido</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CustomerPage;
