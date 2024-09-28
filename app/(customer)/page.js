import { Fragment } from "react";

import Banner from "@/components/_customer/Banner/Banner";
import Category from "@/components/_customer/Category/Category";

import ProductContainer from "@/components/_customer/ProductContainer/ProductContainer";
import Testimonials from "@/components/_customer/Testimonials/Testimonials";
import Product from "@/models/Product";
import dbConnect from "@/helpers/dbConnect";
import { deepCopy } from "@/helpers/utils";

async function fetchProducts() {
  try {
    await dbConnect();
  } catch {
    console.log("Cannot connect to database");
  }
  try {
    const products = await Product.find({})
      .select("category name price images url_key")
      .populate("category", "name")
      .lean();
    return deepCopy(products);
  } catch (error) {
    console.log("error from fetch prducts", error);
  }
  return [];
}
export default async function Home() {
  const products = await fetchProducts();
  return (
    <Fragment>
      <Banner />
      <Category />
      <ProductContainer products={products} />
      <Testimonials />
    </Fragment>
  );
}
