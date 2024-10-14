import { BsArrowRight } from "react-icons/bs";
import e1Image from "@/public/images/explore/e1.png";
import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";
import dbConnect from "@/helpers/dbConnect";
import Category from "@/models/Category";
import { notFound } from "next/navigation";

function getRandInt(min = 0, max = Infinity) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function getCategories(code = "") {
  try {
    await dbConnect();
    const pipeline = [];

    if (code) {
      // If a code is given, find the parent category and include its subcategories with productCount
      pipeline.push(
        {
          $match: {
            code: code, // Match the parent category by code
            isParent: true, // Ensure it's a parent category
          },
        },
        {
          $lookup: {
            from: "categories", // Lookup subcategories from the same collection
            localField: "_id",
            foreignField: "parent", // Match subcategories with the parent category's ID
            as: "subCategories",
          },
        },
        {
          $unwind: "$subCategories", // Unwind subcategories to process them individually
        },
        {
          $lookup: {
            from: "products", // Lookup products for each subcategory
            localField: "subCategories._id",
            foreignField: "category", // Match products by subcategory ID
            as: "subCategories.products",
          },
        },
        {
          $group: {
            _id: "$_id",
            name: { $first: "$name" },
            code: { $first: "$code" },
            banner: { $first: "$banner" },
            description: { $first: "$description" },
            subCategories: {
              $push: {
                _id: "$subCategories._id",
                name: "$subCategories.name",
                code: "$subCategories.code",
                banner: "$subCategories.banner",
                description: "$subCategories.description",
                productCount: { $size: "$subCategories.products" }, // Count products in each subcategory
              },
            },
          },
        },
        { $limit: 1 } // Return only the parent category with subcategories
      );
    } else {
      // If no code is given, return all parent categories with subcategory count
      pipeline.push(
        {
          $match: {
            isParent: true, // Match only parent categories
          },
        },
        {
          $lookup: {
            from: "categories", // Lookup subcategories
            localField: "_id",
            foreignField: "parent",
            as: "subCategories",
          },
        },
        {
          $project: {
            name: 1,
            code: 1,
            banner: 1,
            description: 1,
            subCategoryCount: { $size: "$subCategories" }, // Count subcategories
          },
        }
      );
    }
    const result = await Category.aggregate(pipeline);
    return code && result.length > 0 ? result[0] : result;
  } catch (error) {
    return [];
  }
}

export default async function CatgoryPage({ searchParams: { code } }) {
  const categoryCode = code?.trim()?.toUpperCase();
  const categories = await getCategories(categoryCode);

  if (categoryCode && categories.length === 0) {
    return notFound();
  }

  const mappingArray = categories?.subCategories || categories;
  return (
    <section className={styles.explore}>
      <h1>
        {categories.subCategories
          ? `Sub Categories of ${categories.name}`
          : "Categories"}
      </h1>
      <div className={styles.explore_content}>
        {mappingArray.map((category, i) => (
          <Link
            key={category._id}
            href={
              category.productCount >= 0
                ? `/search?category=${category.code}`
                : `?code=${category.code}`
            }
          >
            <div className={styles.category_container}>
              <div className={styles.container_image}>
                <div className={styles.img}>
                  <Image
                    src={category.banner}
                    alt="images"
                    width={500}
                    height={500}
                  />
                </div>
                {category.productCount >= 0 ? (
                  <h5>{category.productCount} Products</h5>
                ) : (
                  <h5>{category.subCategoryCount} sub categories</h5>
                )}
              </div>
              <div className={styles.category_container_title}>
                <h4>{category.description}</h4>
                <h2>{category.name}</h2>
              </div>
              <div>
                See{" "}
                {category.productCount >= 0 ? "Collection" : "Sub Categories"}{" "}
                <BsArrowRight className={styles.aicon} />
              </div>
              <div className={styles.category_container_cover}>
                <Image
                  src={`/images/card_backgroung_svg/e${getRandInt(0, 5)}.svg`}
                  alt="category_name"
                  width={300}
                  height={300}
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
