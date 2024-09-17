//import React from "react";
import PropTypes from "prop-types";
import styles from "../styles/SearchBar.module.css";

function SearchBar({ onSearch }) {
  return (
    <input
      className={styles.searchBar}
      type="text"
      placeholder="Buscar..."
      onChange={(e) => onSearch(e.target.value)}
    />
  );
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
