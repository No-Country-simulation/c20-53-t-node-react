// store/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Acción para iniciar sesión
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials) => {
    const response = await axios.post("/api/login", credentials);
    return response.data; // Aquí espera que el backend devuelva un objeto con el usuario y el token
  }
);

// Acción para registrar un usuario
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userInfo) => {
    const response = await axios.post("/api/register", userInfo);
    return response.data; // Aquí también espera que el backend devuelva el usuario y el token
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null, // Aquí guardamos los datos del usuario (incluyendo el rol)
    name: null, // Agregar 'name'
    phone: null, // Agregar 'phone'
    token: null,
    status: "idle",
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user; // Guardamos los datos del usuario
        state.token = action.payload.token;
        state.status = "succeeded";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.status = "succeeded";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = "failed";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = "failed";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
