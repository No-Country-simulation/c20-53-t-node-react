import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    items: [],
    total: 0,
  },
  reducers: {
    addToOrder(state, action) {
      const item = action.payload;
      state.items.push(item);
      state.total += item.price;
    },
    clearOrder(state) {
      state.items = [];
      state.total = 0;
    },
  },
});

export const { addToOrder, clearOrder } = orderSlice.actions;

export default orderSlice.reducer;
