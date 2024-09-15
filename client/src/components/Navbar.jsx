import "./Navbar.css"; // Puedes aplicar los estilos desde aquí

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">Mi Restaurante</div>
      <ul className="nav-links">
        <li>
          <a href="/">Inicio</a>
        </li>
        <li>
          <a href="/menu">Menú</a>
        </li>
        <li>
          <a href="/login">Iniciar Sesión</a>
        </li>
        <li>
          <a href="/signup">Registrarse</a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
