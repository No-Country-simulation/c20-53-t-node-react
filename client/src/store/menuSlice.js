import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk para obtener el menú desde el backend
export const fetchMenu = createAsyncThunk("menu/fetchMenu", async () => {
  const response = await axios.get("http://localhost:4000/api/menu"); // Cambia a tu ruta del backend
  return response.data;
});

const menuSlice = createSlice({
  name: "menu",
  initialState: {
    items: [],
    searchTerm: "",
    status: "idle",
  },
  reducers: {
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenu.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMenu.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchMenu.rejected, (state) => {
        state.status = "failed";
      });
  },
});
// Thunks para CRUD
export const fetchMenuAdmin = createAsyncThunk("menu/fetchMenu", async () => {
  const response = await axios.get("http://localhost:4000/api/menu");
  return response.data;
});

export const addDish = createAsyncThunk("menu/addDish", async (newDish) => {
  const response = await axios.post("http://localhost:4000/api/menu", newDish);
  return response.data;
});

export const updateDish = createAsyncThunk(
  "menu/updateDish",
  async (updatedDish) => {
    const response = await axios.put(
      `http://localhost:4000/api/menu/${updatedDish.id}`,
      updatedDish
    );
    return response.data;
  }
);

export const deleteDish = createAsyncThunk("menu/deleteDish", async (id) => {
  await axios.delete(`http://localhost:4000/api/menu/${id}`);
  return id;
});

export const { setSearchTerm } = menuSlice.actions;
export default menuSlice.reducer;
