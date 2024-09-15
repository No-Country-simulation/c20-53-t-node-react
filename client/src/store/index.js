import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./menuSlice";
import orderReducer from "./orderSlice";

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    order: orderReducer,
  },
});
