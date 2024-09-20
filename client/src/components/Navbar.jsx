import styles from "../styles/Navbar.module.css";
import logo from "../assets/logo.svg"; // Asegúrate de ajustar el nombre de la imagen y la extensión

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <a href="/">
        <img src={logo} alt="Logo" className={styles.logo} />
      </a>
      <ul className={styles.navLinks}>
        <li>
          <a href="/owner">Dueño</a>
        </li>
        <li>
          <a href="/waiter">Camarero</a>
        </li>
        <li>
          <a href="/">Comensal</a>
        </li>
        <li>
          <a href="/login">Login</a>
        </li>
        <li>
          <a href="/register">Registro</a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
