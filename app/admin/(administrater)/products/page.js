import Link from "next/link";

import styles from "./page.module.css";
import ProductTable from "./table";
import dbConnect from "@/helpers/dbConnect";
import Product from "@/models/Product";
import { deepCopy } from "@/helpers/utils";

export const metadata = {
  title: "Products",
  description: "Products page",
};

async function fetchProducts() {
  try {
    await dbConnect();
    const products = await Product.find({});
    return products;
  } catch (error) {
    return [];
  }
}

export default async function ProductsPage() {
  const products = await fetchProducts();
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>Products</h1>
        <Link className={styles.newProductLink} href="/admin/new-product">
          New Product
        </Link>
      </div>
      <ProductTable products={deepCopy(products)} />
    </div>
  );
}
