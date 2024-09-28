import { configureStore } from "@reduxjs/toolkit";
import bagReducer from "../reducers/bag";
import userReducer from "../reducers/user";
import orderReducer from "../reducers/order";

const store = configureStore({
  reducer: {
    bag: bagReducer,
    user: userReducer,
    order: orderReducer,
  },
});

export default store;
