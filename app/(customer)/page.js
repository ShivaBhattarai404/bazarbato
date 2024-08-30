import { Fragment } from "react";

import Banner from "@/components/_customer/Banner/Banner";
import Category from "@/components/_customer/Category/Category";

import ProductContainer from "@/components/_customer/ProductContainer/ProductContainer";
import Testimonials from "@/components/_customer/Testimonials/Testimonials";

export default function Home() {
  return (
    <Fragment>
        <Banner />
        <Category />
        <ProductContainer />
        <Testimonials />
    </Fragment>
  );
}
