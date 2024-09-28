import Link from "next/link";

import dbConnect from "@/helpers/dbConnect";
import Category from "@/models/Category";

import styles from "./page.module.css";

import CategoryTable from "./table";
import { deepCopy } from "@/helpers/utils";
import { deleteFile } from "@/helpers/crud";
import Product from "@/models/Product";

async function fetchCategories() {
  await dbConnect();
  try {
    // const categories = await Category.find({});
    const categories = await Category.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "category",
          as: "products",
        },
      },
      {
        $project: {
          name: 1,
          isParent: 1,
          status: 1,
          visibility: 1,
          url_key: 1,
          productCount: { $size: "$products" },
        },
      },
    ]);
    return deepCopy(categories);
  } catch {
    return [];
  }
}

// function to delete categories
async function deleteCategories(categoryIDs) {
  "use server";
  try {
    await dbConnect();
  } catch (error) {
    return { error: "Failed to connect to database" };
  }
  try {
    const categoriesAssociatedWithChildren = await Category.countDocuments({
      parent: { $in: categoryIDs },
    });
    if (categoriesAssociatedWithChildren > 0)
      return { error: "Cannot delete categories which has children" };

    const categoriesAssociatedWithProducts = await Product.countDocuments({
      category: { $in: categoryIDs },
    });
    if (categoriesAssociatedWithProducts > 0)
      return { error: "Cannot delete categories which has products" };

    const categories = await Category.find({
      _id: { $in: categoryIDs },
    }).select("banner");

    const deleteBannerPromises = categories.map((category) =>
      deleteFile(category.banner)
    );
    const categoryDeletePromise = Category.deleteMany({
      _id: { $in: categoryIDs },
    });
    try {
      await Promise.all([...deleteBannerPromises, categoryDeletePromise]);
    } catch (error) {
      return { error: "Server Error, Failed to delete category banners" };
    }
    return { error: null };
  } catch {
    return { error: "Some error occured. Try refreshing the page" };
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
      <CategoryTable
        categories={categories}
        deleteCategories={deleteCategories}
      />
    </div>
  );
}
