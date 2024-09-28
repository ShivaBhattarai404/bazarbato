"use client";

import { Provider } from "react-redux";
import store from "./store";

export default function UserContextProvider({ children, user }) {
  console.log("inserting user into the store");
  store.dispatch({ type: "user/setUser", payload: user });
  return <Provider store={store}>{children}</Provider>;
}
