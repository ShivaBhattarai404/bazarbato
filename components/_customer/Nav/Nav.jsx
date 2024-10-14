import Link from "next/link";
import styles from "./Nav.module.css";
import menCategory from "@/public/images/mens-banner.jpg";
import Image from "next/image";
import dbConnect from "@/helpers/dbConnect";
import SiteContent from "@/models/SiteContent";
import { deepCopy } from "@/helpers/utils";
import Category from "@/models/Category";

async function getNavParentCategories() {
  try {
    await dbConnect();

    // Fetch parent categories from the `SiteContent`
    const { categories: parentCategories } = await SiteContent.findOne({
      subject: "NAV_PARENT_CATEGORIES",
    })
      .populate("categories", "name code banner")
      .lean();
    // Retrieve subcategories for each parent category
    const categoriesWithSubcategories = await Category.aggregate([
      {
        $match: {
          _id: { $in: parentCategories.map((cat) => cat._id) }, // Match the parent categories
        },
      },
      {
        $lookup: {
          from: "categories", // Collection to lookup (assuming it's "categories")
          localField: "_id", // Parent category _id
          foreignField: "parent", // Field in subcategories that points to the parent
          as: "subCategories", // The field to add the subcategories
        },
      },
      {
        $project: {
          name: 1,
          code: 1,
          banner: 1,
          subCategories: {
            $slice: [
              {
                $map: {
                  input: "$subCategories", // For each subcategory
                  as: "subCategory",
                  in: {
                    _id: "$$subCategory._id", // Select specific fields
                    name: "$$subCategory.name", // Select specific fields
                    code: "$$subCategory.code",
                    banner: "$$subCategory.banner",
                  },
                },
              },
              5, // Limit to 5 subcategories
            ],
          },
        },
      },
    ]);

    return deepCopy(categoriesWithSubcategories);
  } catch (error) {
    return [];
  }
}

export default async function Nav() {
  const parentCategories = await getNavParentCategories();

  return (
    <nav className={styles.nav}>
      <div className={styles.nav_menu}>
        <ul className={styles.links}>
          <li className={styles.link}>
            <Link href="/">Home</Link>
          </li>
          <li className={styles.link}>
            <Link href="/category">Categories</Link>
            <div className={styles.dropdownPanel}>
              {parentCategories.slice(0, 4).map((category) => (
                <ul key={category._id} className={styles.dropdownPanelList}>
                  <li className={styles.menuTitle}>
                    <Link href={`/category?code=${category.code}`}>
                      {category.name}
                    </Link>
                  </li>

                  {category?.subCategories?.map((subCategory) => (
                    <li key={subCategory._id} className={styles.panelListItem}>
                      <Link href={`/search?category=${subCategory.code}`}>
                        {subCategory.name}
                      </Link>
                    </li>
                  ))}

                  <li className={styles.panelListItem}>
                    <Link href={`/category?code=${category.code}`}>
                      <Image
                        src={category.banner}
                        alt={category.name}
                        width={250}
                        height={119}
                      />
                    </Link>
                  </li>
                </ul>
              ))}
            </div>
          </li>
          {parentCategories.slice(5, 10).map((category) => (
            <li key={category._id} className={styles.link}>
              <Link href={`/category?code=${category.code}`}>
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
