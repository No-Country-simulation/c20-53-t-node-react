import PropTypes from "prop-types";
import styles from "../styles/ShoppingCart.module.css";

const ShoppingCart = ({ cartItems, editCartItem, removeFromCart }) => {
  return (
    <div className={styles.cart}>
      <h2>Carrito de Compras</h2>
      {cartItems.length === 0 ? (
        <p>No hay elementos en el carrito.</p>
      ) : (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index} className={styles.cartItem}>
              <h4>{item.name}</h4>
              <p>Precio: ${item.price}</p>
              <button onClick={() => removeFromCart(index)}>Eliminar</button>
              <button
                onClick={() =>
                  editCartItem(index, { ...item, price: item.price + 1 })
                }
              >
                Editar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
ShoppingCart.propTypes = {
  cartItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  editCartItem: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
};

export default ShoppingCart;
