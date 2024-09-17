// components/PrivateRoute.jsx

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children, role }) {
  const user = useSelector((state) => state.auth.user); // Obtenemos el usuario autenticado desde el authSlice

  // Verificamos si el usuario está autenticado y tiene el rol adecuado
  if (!user || user.role !== role) {
    return <Navigate to="/login" />; // Redirige a la página de login si no está autenticado o no tiene el rol
  }

  return children; // Renderizamos los children (la página protegida)
}

export default PrivateRoute;
