import { redirect } from "next/navigation";
import { readdir, writeFile, mkdir, unlink } from "fs/promises";
import { Buffer } from "buffer";
import path from "path";

// product model or schema
import Product from "@/models/Product";
import AttributeSet from "@/models/AttributeSet";

import styles from "./page.module.css";
import AdminPageHeading from "@/components/Utils/AdminPageHeading";
import NewProductForm from "./form";
import dbConnect from "@/helpers/dbConnect";
import { deepCopy } from "@/helpers/utils";

export const metadata = {
  title: "Create a new product",
};

// function to update the uploaded images
async function imageUpdateHandler(newImages, slug = "") {
  const productImagePaths = path.join(
    process.cwd(),
    "images",
    "products",
    slug
  );
  const existingImages = await readdir(productImagePaths);
  const newImageNames = [];
  for (let image of newImages) {
    if (existingImages.includes(image)) {
      newImageNames.push(image);
    }
    if (
      image === "null" ||
      typeof image === "string" ||
      image.type.split("/")[0] !== "image"
    )
      continue;
    const buffer = Buffer.from(await image.arrayBuffer());
    const filename = (Date.now() + image.name).replace(" ", "_");
    newImageNames.push(filename);
    await writeFile(path.join(productImagePaths, filename), buffer);
  }
  for (let image of existingImages) {
    if (newImageNames.includes(image)) continue;
    await unlink(path.join(productImagePaths, image));
  }
  return newImageNames;
}

// function to upload images to the server
async function imageUploadHandler(images, slug = "") {
  "use server";
  const imageNames = [];
  for (const image of images) {
    if (image === "null" || image.type.split("/")[0] !== "image") continue;
    const filename = (Date.now() + image.name).replace(" ", "_");
    imageNames.push(filename);
  }
  images.map(async (file, index) => {
    if (file === "null" || file.type.split("/")[0] !== "image") return;
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = imageNames[index];
    // making a directory for the product images with the product's slug
    await mkdir(path.join(process.cwd(), "images", "products", slug), {
      recursive: true,
    });
    // writing the image to the file system
    return writeFile(
      path.join(process.cwd(), "images", "products", slug, filename),
      buffer
    );
  });
  await Promise.all(images);
  return imageNames;
}

async function formSubmitHandler(formData) {
  "use server";
  // connecting to database
  await dbConnect();
  // extracting input field values
  const _id = formData.get("_id");
  const name = formData.get("name");
  const price = formData.get("price");
  const category = formData.get("category");
  const description = formData.get("description");
  const images = formData.getAll("images");
  const url_key = formData.get("url_key");
  const meta_title = formData.get("meta_title");
  const meta_keywords = formData.get("meta_keywords");
  const meta_description = formData.get("meta_description");
  const status = formData.get("status");
  const visibility = formData.get("visibility");
  const stock_availability = formData.get("stock_availability");
  const quantity = formData.get("quantity");
  const attributeSet = formData.get("attribute_set");
  
  // checking if the product with the same url_key already exists
  const productExists = _id && await Product.findOne({ url_key });

  // updating images if the product already exists
  // else uploading the images
  let imageNames = productExists
    ? imageUpdateHandler(images, url_key)
    : imageUploadHandler(images, url_key);

  // fetching schema of attributes of the selected attribute set from database
  let attributeSetSchema = AttributeSet.findOne({
    name: attributeSet,
  }).populate("attributes");

  // combining both promises to get the resolved values and reducing the time taken
  [imageNames, attributeSetSchema] = await Promise.all([
    imageNames,
    attributeSetSchema,
  ]);

  const attributes = attributeSetSchema
    ? attributeSetSchema.attributes.map((attribute) => {
        const code = attribute.code;
        const name = attribute.name;
        const type = attribute.type;
        const value = formData.get(name);
        return { code, name, type, value };
      })
    : [];
  let product;
  if (productExists) {
    // updating the existing product object
    product = productExists;
    product.name = name;
    product.price = price;
    product.category = category;
    product.description = description;
    product.images = imageNames;
    product.meta_title = meta_title;
    product.meta_keywords = meta_keywords;
    product.meta_description = meta_description;
    product.status = status;
    product.visibility = visibility;
    product.stock_availability = stock_availability;
    product.quantity = quantity;
    product.attributeSet = attributeSet;
    product.attributes = attributes;
  } else {
    // creating a new product object
    product = new Product({
      name,
      price,
      category,
      description,
      images: imageNames,
      url_key,
      meta_title,
      meta_keywords,
      meta_description,
      status,
      visibility,
      stock_availability,
      quantity,
      attributeSet,
      attributes,
    });
  }

  // saving the product to the database
  await product.save();
  redirect("/admin/products");
}

async function fetchAttributes() {
  await dbConnect();
  const attributes = await AttributeSet.find({}).populate("attributes");
  const formattedAttributes = attributes.map((attributeSet) => {
    return {
      name: attributeSet.name,
      attributes: attributeSet.attributes.map((attribute) => {
        const modifiedAttribute = {
          name: attribute.name,
          code: attribute.code,
          type: attribute.type,
        };
        if (attribute.type.toLowerCase() === "select") {
          modifiedAttribute.options = attribute.options;
        }
        return modifiedAttribute;
      }),
    };
  });
  return formattedAttributes;
}

async function checkIfProductExists(url_key) {
  "use server";
  try {
    await dbConnect();
    const productExists = await Product.findOne({ url_key });
    if (productExists) {
      return { ack: true, exists: true };
    } else {
      return { ack: true, exists: false };
    }
  } catch (error) {
    return { ack: false, error: "Internal Server Error" };
  }
}

async function getProduct(url_key) {
  try {
    await dbConnect();
    const product = await Product.findOne({ url_key });
    return product;
  } catch {
    return null;
  }
}

export default async function NewProduct({ searchParams: { product: slug } }) {
  const [attributeSet, product] = await Promise.all([
    fetchAttributes(),
    getProduct(slug),
  ]);

  return (
    <div className={`${styles.container} homepadding`}>
      <AdminPageHeading back="/admin/products">
        Create A New Product
      </AdminPageHeading>
      <NewProductForm
        attributeSet={attributeSet}
        handleSubmit={formSubmitHandler}
        checkIfProductExists={checkIfProductExists}
        product={deepCopy(product)}
      />
    </div>
  );
}
