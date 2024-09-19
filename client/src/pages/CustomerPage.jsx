import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import ShoppingCart from "../components/ShoppingCart";
import Slider from "react-slick";
import styles from "../styles/CustomerPage.module.css";
import { getMenuItems, getRandomMenuItems } from "../services/menuService";

// Configuración del carrusel
const carouselSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
};

function CustomerPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [randomMenuItems, setRandomMenuItems] = useState([]);

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

  useEffect(() => {
    const fetchRandomItems = async () => {
      try {
        const items = await getRandomMenuItems();
        setRandomMenuItems(items);
      } catch (error) {
        console.error("Error fetching random menu items:", error);
      }
    };
    fetchRandomItems();
  }, []);

  // Filtrado por nombre y categoría
  const filteredMenu = menuItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "" || item.category === selectedCategory)
  );

  const addToCart = (menuItem) => {
    setCartItems((prevCart) => [...prevCart, menuItem]);
  };

  const editCartItem = (index, newItem) => {
    const updatedCart = [...cartItems];
    updatedCart[index] = newItem;
    setCartItems(updatedCart);
  };

  const removeFromCart = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div>
      <Navbar />
      <h2>Menú</h2>

      <div className={styles.filters}>
        <SearchBar onSearch={setSearchTerm} />
        <select
          onChange={handleCategoryChange}
          className={styles.categoryFilter}
        >
          <option value="">Todas las Categorías</option>
          <option value="Carnes">Carnes</option>
          <option value="Pastas">Pastas</option>
          <option value="Guarniciones">Guarniciones</option>
          <option value="Vinos/Cervezas">Vinos/Cervezas</option>
          <option value="Sin Alcohol">Sin Alcohol</option>
          <option value="Helados">Helados</option>
          <option value="Tortas">Tortas</option>
        </select>
      </div>

      {/* Carrusel de platos aleatorios */}
      <div className={styles.carouselContainer}>
        <h2>Platos Recomendados</h2>
        <Slider {...carouselSettings} className={styles.carousel}>
          {randomMenuItems.map((item) => (
            <div key={item.id} className={styles.carouselItem}>
              <img src={item.photo} alt={item.name} />
              <h3>{item.name}</h3>
              <p>Precio: ${item.price}</p>
              <button onClick={() => addToCart(item)}>Añadir al Pedido</button>
            </div>
          ))}
        </Slider>
      </div>

      <div className={styles.menuList}>
        {filteredMenu.map((item) => (
          <div key={item.id} className={styles.menuItem}>
            <h3>{item.name}</h3>
            <p>Precio: ${item.price}</p>
            <button onClick={() => addToCart(item)}>Añadir al Pedido</button>
          </div>
        ))}
      </div>

      <ShoppingCart
        cartItems={cartItems}
        editCartItem={editCartItem}
        removeFromCart={removeFromCart}
      />
    </div>
  );
}

export default CustomerPage;
