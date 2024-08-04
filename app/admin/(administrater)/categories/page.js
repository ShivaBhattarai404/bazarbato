import Link from "next/link";

import dbConnect from "@/helpers/dbConnect";
import Category from "@/models/Category";

import styles from "./page.module.css";

import CategoryTable from "./table";
import { deepCopy } from "@/helpers/utils";

async function fetchCategories() {
  await dbConnect();
  try {
    const categories = await Category.find({});
    return deepCopy(categories);
  } catch {
    return [];
  }
}

export default async function ProductsPage() {
  const categories = await fetchCategories();
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>Coupons</h1>
        <Link className={styles.newCategoryLink} href="/admin/new-category">
          New Category
        </Link>
      </div>
      <CategoryTable categories={categories} />
    </div>
  );
}
