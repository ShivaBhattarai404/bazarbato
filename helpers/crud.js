"use server";

import { put, del } from "@vercel/blob";

import Category from "@/models/Category";
import Product from "@/models/Product";
import Attribute from "@/models/Attribute";
import dbConnect from "./dbConnect";

export async function uploadFile(file, filename) {
  try {
    return put(filename, file, {
      access: "public",
    });
  } catch (error) {
    throw new Error("Error while uploading file ->" + filename);
  }
}

export async function deleteFile(filename) {
  try {
    return del(filename);
  } catch (error) {
    throw new Error("Error while deleting file ->" + filename);
  }
}

export async function checkExistence(filter, model) {
  try {
    await dbConnect();
    const existingProduct = await model.findOne({ ...filter });
    if (existingProduct) {
      return { ack: true, exists: true };
    } else {
      return { ack: true, exists: false };
    }
  } catch (error) {
    console.error(error);
    return { ack: false, error: "Internal Server Error" };
  }
}

export async function checkIfProductExists(filter) {
  return checkExistence(filter, Product);
}

export async function checkIfCategoryExists(filter) {
  return checkExistence(filter, Category);
}
export async function checkIfAttributeExists(filter) {
  return checkExistence(filter, Attribute);
}
