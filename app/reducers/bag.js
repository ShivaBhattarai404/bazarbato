import { createSlice } from "@reduxjs/toolkit";

// structure of an item in the bag
// {
//   id: 1,
//   name: "Product Name",
//   price: 100,
//   quantity: 1,
// }
const cartSlice = createSlice({
  name: "bag",
  initialState: {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
  },
  reducers: {
    add(state, action) {
      state.items.push(action.payload);
      state.totalQuantity++;
      state.totalAmount += action.payload.price;
    },
    remove(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
      state.totalQuantity--;
      state.totalAmount -= action.payload.price;
    },
  },
});

export const { add, remove } = cartSlice.actions;
export default cartSlice.reducer;
