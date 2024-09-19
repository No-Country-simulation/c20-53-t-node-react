import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import OwnerPage from "./pages/OwnerPage";
import WaiterPage from "./pages/WaiterPage";
import CustomerPage from "./pages/CustomerPage";
//import PrivateRoute from "./components/PrivateRoute";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import "./styles/CustomerPage.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route
            path="/owner"
            element={
              // <PrivateRoute role="CLIENT">
              <OwnerPage />
              // </PrivateRoute>
            }
          />
          <Route
            path="/waiter"
            element={
              //<PrivateRoute role="waiter">
              <WaiterPage />
              //</PrivateRoute>
            }
          />
          <Route path="/customer" element={<CustomerPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);
