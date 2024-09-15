import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Slider from "react-slick";
import { fetchMenu, setSearchTerm } from "../store/menuSlice";
import { addToOrder } from "../store/orderSlice";
import Navbar from "./Navbar";
function App() {
  const dispatch = useDispatch();
  const menuItems = useSelector((state) => state.menu.items);
  const searchTerm = useSelector((state) => state.menu.searchTerm);
  const menuStatus = useSelector((state) => state.menu.status);
  const orderItems = useSelector((state) => state.order.items);
  const totalAmount = useSelector((state) => state.order.total);

  useEffect(() => {
    dispatch(fetchMenu());
  }, [dispatch]);

  const handleSearch = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const handleAddToOrder = (item) => {
    dispatch(addToOrder(item));
  };

  // Filtrar el menú basado en el término de búsqueda
  const filteredMenu = menuItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Seleccionar 5 platos del día
  const platosDelDia = menuItems.slice(0, 5);

  // Configuración del carrusel
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="App">
      <h1>Menú del Restaurante</h1>
      <Navbar />;{/* Carrusel de Platos del Día */}
      <h2>Platos del Día</h2>
      <Slider {...settings}>
        {platosDelDia.map((item) => (
          <div key={item.id} className="carousel-item">
            <h3>{item.name}</h3>
            <p>Precio: ${item.price}</p>
          </div>
        ))}
      </Slider>
      {/* Barra de búsqueda */}
      <input
        type="text"
        placeholder="Buscar comida..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <div>
        <h2>Menú</h2>
        {menuStatus === "loading" ? (
          <p>Cargando menú...</p>
        ) : menuStatus === "failed" ? (
          <p>Error al cargar el menú.</p>
        ) : (
          <div>
            {filteredMenu.length === 0 ? (
              <p>No se encontraron resultados.</p>
            ) : (
              filteredMenu.map((item) => (
                <div
                  key={item.id}
                  style={{
                    border: "1px solid #ccc",
                    padding: "10px",
                    margin: "10px",
                  }}
                >
                  <h3>{item.name}</h3>
                  <p>Precio: ${item.price}</p>
                  <button onClick={() => handleAddToOrder(item)}>Añadir</button>
                </div>
              ))
            )}
          </div>
        )}
      </div>
      <div>
        <h2>Tu Orden</h2>
        <ul>
          {orderItems.map((item, index) => (
            <li key={index}>
              {item.name} - ${item.price}
            </li>
          ))}
        </ul>
        <h3>Total: ${totalAmount}</h3>
        <button>Realizar Pedido</button>
      </div>
    </div>
  );
}

export default App;
