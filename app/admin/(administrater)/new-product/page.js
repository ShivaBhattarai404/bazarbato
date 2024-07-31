import { redirect } from "next/navigation";
import { readdir, writeFile, mkdir, unlink } from "fs/promises";
import { Buffer } from "buffer";
import path from "path";
import { put, del } from "@vercel/blob";

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

async function upload(filename, file) {
  try {
    return put(filename, file, {
      access: "public",
    });
  } catch (error) {
    console.log("error while uploading", error.message);
  }
}

async function deleteImage(filename) {
  try {
    console.log("deleting", filename);
    return del(filename);
  } catch (error) {
    console.log("error while deleting", error.message);
  }
}

// function to update the uploaded images
async function imageUpdateHandler(newImages, existingImages, slug = "") {
  const newImageNames = [];
  for (let image of newImages) {
    if (existingImages.includes(image)) {
      newImageNames.push(image);
      continue;
    }
    if (
      image === "null" ||
      typeof image === "string" ||
      image.type.split("/")[0] !== "image"
    )
      continue;
    const buffer = Buffer.from(await image.arrayBuffer());
    const filename = (Date.now() + "_" + image.name).replace(" ", "_");
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
  let response = [];
  for (let imageFile of images) {
    if (imageFile === "null" || imageFile.type.split("/")[0] !== "image")
      continue;
    const filename = `products/${slug}/${imageFile.name}`;
    response.push(upload(filename, imageFile));
  }
  let imageNames = await Promise.all(response);
  imageNames = imageNames.map((image) => image.url);
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
  const existingProduct = _id && (await Product.findOne({ _id }));

  // updating images if the product already exists
  // else uploading the images
  let imageNames = existingProduct
    ? imageUpdateHandler(images, existingProduct.url_key)
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
  if (existingProduct) {
    // updating the existing product object
    product = existingProduct;
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
  console.log("product saved successfully");
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
    const existingProduct = await Product.findOne({ url_key });
    if (existingProduct) {
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
