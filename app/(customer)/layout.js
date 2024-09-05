import { Fragment } from "react";

import Header from "@/components/_customer/Header/Header";
import Nav from "@/components/_customer/Nav/Nav";

import "./global.css";
import Footer from "@/components/_customer/Footer/Footer";
import MobileNav from "@/components/_customer/MobileNav/MobileNav";

export const metadata = {
  title: "Home | Premps",
};

export default function RootLayout({ children }) {
  return (
    <Fragment>
      <Header />
      <Nav />
      <MobileNav />
      <main>{children}</main>
      <Footer />
    </Fragment>
  );
}
