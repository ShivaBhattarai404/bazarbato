import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    order: null,
  },
  reducers: {
    addOrder(state, action) {
      state.order = action.payload;
    },
    removeOrder(state) {
      state.order = null;
    },
  },
});

export const { addOrder, removeOrder } = orderSlice.actions;
export default orderSlice.reducer;
