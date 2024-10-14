import Link from "next/link";
import styles from "./Category.module.css";
import dbConnect from "@/helpers/dbConnect";
import SiteContent from "@/models/SiteContent";
import { deepCopy } from "@/helpers/utils";
import Image from "next/image";

async function getCategoryBar() {
  try {
    await dbConnect();
    const { categories } = await SiteContent.find({
      subject: "FEATURED_CATEGORIES_BELOW_BANNER",
    })
      .populate("categories", "name code banner isParent")
      .lean();

    return deepCopy(categories);
  } catch (error) {
    return [];
  }
}

export default async function Category() {
  const categories = await getCategoryBar();
  return (
    <div className={`${styles.category} has-scrollbar`}>
      {categories?.map((category) => (
        <div key={category._id} className={styles.category_item}>
          <div className={styles.category_img_box}>
            <Image width={30} src={category.banner} alt={category.name} />
          </div>
          <div className={styles.category_content_box}>
            <div className={styles.category_content_flex}>
              <h3 className={styles.category_item_title}>{category.name}</h3>
              <p className={styles.category_item_amount}>(53)</p>
            </div>
            <Link
              href={
                category.isParent
                  ? `/category?code=${category.code}`
                  : `/search?category=${category.code}`
              }
              className={styles.category_btn}
            >
              Show all
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
