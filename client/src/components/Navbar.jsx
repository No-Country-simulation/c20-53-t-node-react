// components/Navbar.jsx
//import React from "react";
import styles from "../styles/Navbar.module.css";

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <h1>Restaurante</h1>
      <ul>
        <li>
          <a href="/owner">Dueño</a>
        </li>
        <li>
          <a href="/waiter">Camarero</a>
        </li>
        <li>
          <a href="/customer">Comensal</a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
