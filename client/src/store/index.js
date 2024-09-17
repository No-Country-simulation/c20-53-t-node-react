// store/index.js
import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./menuSlice";
import orderReducer from "./orderSlice";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    orders: orderReducer,
    auth: authReducer,
  },
});
