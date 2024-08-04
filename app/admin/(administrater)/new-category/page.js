import Category from "@/models/Category";

import { checkIfCategoryExists, deleteFile, uploadFile } from "@/helpers/crud";

import styles from "./page.module.css";

import AdminPageHeading from "@/components/Utils/AdminPageHeading";
import CategoryForm from "./form";
import dbConnect from "@/helpers/dbConnect";
import { deepCopy } from "@/helpers/utils";

async function handleSubmit(formData) {
  "use server";
  await dbConnect();
  const _id = formData.get("_id");
  const name = formData.get("name");
  const categoryCode = formData.get("code");
  const parentCategory = formData.get("parent");
  const isParent = String(parentCategory).toLowerCase() === "null";
  const description = formData.get("description");
  const banner = formData.get("banner");
  const status = formData.get("status");
  const visibility = formData.get("include-in-menu");
  const url_key = formData.get("url-key");
  const meta_title = formData.get("meta-title");
  const meta_description = formData.get("meta-description");
  const meta_keywords = formData.get("meta-keywords");

  // if its not a parent category and the parent category is not found
  // then return an error
  const checkParentExists = Category.findOne({ code: parentCategory });
  // check if its a update request or a new category request
  // if a category exists then update the category
  // else create a new category
  const categoryExists = _id ? Category.findById(_id) : Promise.resolve(null);
  const [existingParent, existingCategory] = await Promise.all([
    checkParentExists,
    categoryExists,
  ]);
  // if the parent category does not exist and the category is not a parent category
  // then return and no need to send a message as the request could not be procced by frontend validation
  if (!isParent && !existingParent) {
    return;
  }
  let category;
  if (existingCategory) {
    let category = existingCategory;
    let bannerUrl = category.banner;
    // if the banner is a file and the category exists
    // then delete the existing banner and upload the new banner
    if (banner && typeof banner !== "string") {
      bannerUrl = await Promise.all([
        uploadFile(
          banner,
          `category/${existingCategory.url_key}/${banner.name}`
        ),
        deleteFile(category.banner),
      ])[0].url;
    }
    category.name = name;
    category.isParent = isParent;
    if (isParent) category.parent = parentCategory;
    category.description = description;
    category.banner = bannerUrl;
    category.status = status;
    category.visibility = visibility;
    category.meta_title = meta_title;
    category.meta_description = meta_description;
    category.meta_keywords = meta_keywords;
  } else {
    const bannerUrl = await uploadFile(
      banner,
      `category/${url_key}/${banner.name}`
    );
    category = new Category({
      name,
      code: categoryCode,
      description,
      isParent,
      banner: bannerUrl.url,
      status,
      visibility,
      url_key,
      meta_title,
      meta_description,
      meta_keywords,
    });
    if (isParent) category.parent = parentCategory;
  }
  await category.save();
  return {
    error: false,
    message: "Category saved successfully",
  };
}

// function to fetch the category by its url_key
async function getCategoryByUrlKey(url_key) {
  try {
    if (!url_key) return null;
    await dbConnect();
    const category = await Category.findOne({ url_key });
    return deepCopy(category);
  } catch {
    return null;
  }
}

export default async function NewCategory({
  searchParams: { category: slug },
}) {
  const category = await getCategoryByUrlKey(slug);

  return (
    <div className={`${styles.container} homepadding`}>
      <AdminPageHeading back="/admin/categories" className={styles.title}>
        Create A New Category
      </AdminPageHeading>

      <CategoryForm
        handleSubmit={handleSubmit}
        checkIfCategoryExists={checkIfCategoryExists}
        category={category}
      />
    </div>
  );
}
