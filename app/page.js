import Banner from "@/components/Banner/Banner";
import Category from "@/components/Category/Category";
import Header from "@/components/Header/Header";
import Nav from "@/components/Nav/Nav";
import { Fragment } from "react";

import "./global.css";
import Footer from "@/components/Footer/Footer";
import ProductContainer from "@/components/ProductContainer/ProductContainer";
import Testimonials from "@/components/Testimonials/Testimonials";

export default function Home() {
  return (
    <Fragment>
      <Header />
      <Nav />
      <main>
        <Banner />
        <Category />
        <ProductContainer />
        <Testimonials />
      </main>
      <Footer />
    </Fragment>
  );
}
