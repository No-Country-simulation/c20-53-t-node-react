// components/RegisterForm.jsx
import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../store/authSlice";

function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer"); // Role puede ser customer, waiter o owner
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser({ email, password, role }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="customer">Comensal</option>
        <option value="waiter">Camarero</option>
        <option value="owner">Dueño</option>
      </select>
      <button type="submit">Registrarse</button>
    </form>
  );
}

export default RegisterForm;
