import { redirect } from "next/navigation";

// product model or schema
import Product from "@/models/Product";
import AttributeSet from "@/models/AttributeSet";

// helper functions
import dbConnect from "@/helpers/dbConnect";
import { deepCopy } from "@/helpers/utils";
import { checkIfProductExists, deleteFile, uploadFile } from "@/helpers/crud";

import styles from "./page.module.css";
import AdminPageHeading from "@/components/Utils/AdminPageHeading";
import NewProductForm from "./form";

export const metadata = {
  title: "Create a new product",
};

// function to update the uploaded images
async function imageUpdateHandler(images, existingImages, slug = "") {
  const response = [];
  for (let image of images) {
    if (existingImages.includes(image)) {
      response.push(Promise.resolve({ url: image }));
      continue;
    }
    if (
      image === "null" ||
      typeof image === "string" ||
      image.type.split("/")[0] !== "image"
    )
      continue;
    const filename = `products/${slug}/${image.name}`;
    console.log("uploading", filename);
    response.push(uploadFile(image, filename));
  }
  const deletionResponse = [];
  const imageNames = (await Promise.all(response)).map((image) => image.url);
  for (let image of existingImages) {
    if (imageNames.includes(image)) continue;
    deletionResponse.push(deleteFile(image));
  }
  await Promise.all(deletionResponse);
  return imageNames;
}

// function to upload images to the server
async function imageUploadHandler(images, slug = "") {
  "use server";
  let response = [];
  for (let imageFile of images) {
    if (imageFile === "null" || imageFile.type.split("/")[0] !== "image")
      continue;
    const filename = `products/${slug}/${imageFile.name}`;
    response.push(uploadFile(imageFile, filename));
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
  const sku = formData.get("sku");
  const price = formData.get("price");
  const category = formData.get("category");
  const description = formData.get("description");
  const images = formData.getAll("images");
  const key = formData.get("url_key");
  const url_key = key ? "".trim().replace(" ", "_") : "";
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
    ? imageUpdateHandler(
        images,
        existingProduct.images,
        existingProduct.url_key
      )
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
      sku,
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
