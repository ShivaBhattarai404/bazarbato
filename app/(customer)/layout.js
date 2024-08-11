import { Fragment } from "react";

import Header from "@/components/Header/Header";
import Nav from "@/components/Nav/Nav";

import "./global.css";

export const metadata = {
  title: "Home | Premps",
};

export default function RootLayout({ children }) {
  return (
    <Fragment>
      <Header />
      <Nav />
      {children}
    </Fragment>
  );
}
