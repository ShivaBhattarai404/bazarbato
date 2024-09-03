"use server";

import { put, del } from "@vercel/blob";
import AWS from "aws-sdk";

import Category from "@/models/Category";
import Product from "@/models/Product";
import Attribute from "@/models/Attribute";
import dbConnect from "./dbConnect";
import AttributeSet from "@/models/AttributeSet";

// upload images to digital ocean space object storage using aws s3 bucket
export async function uploadFile(file, filename) {
  const arrayBuffer = await file.arrayBuffer();
  console.log("From crud.js [line:14]", file, "\nBuffer is ", arrayBuffer);
  try {
    const s3 = new AWS.S3({
      endpoint: process.env.DO_SPACES_ENDPOINT,
      accessKeyId: process.env.DO_SPACES_KEY,
      secretAccessKey: process.env.DO_SPACES_SECRET,
    });
    const params = {
      Bucket: process.env.DO_SPACES_BUCKET,
      Key: "premps/" + filename,
      Body: Buffer.from(arrayBuffer),
      ACL: "public-read",
    };
    const data = await s3.upload(params).promise();
    return Promise.resolve({ url: data.Location });
  } catch (error) {
    console.log("Error while uploading file ->", error.message);
    throw new Error("Error while uploading file ->" + filename);
  }
}

// delete images from digital ocean space object storage
export async function deleteFile(filename) {
  try {
    const s3 = new AWS.S3({
      endpoint: process.env.DO_SPACES_ENDPOINT,
      accessKeyId: process.env.DO_SPACES_KEY,
      secretAccessKey: process.env.DO_SPACES_SECRET,
    });
    const params = {
      Bucket: process.env.DO_SPACES_BUCKET,
      Key: filename,
    };
    const response = await s3.deleteObject(params).promise();
  } catch (error) {
    console.log(error)
    throw new Error("Error while deleting file ->" + filename);
  }
}

// upload images using vercel blob
// export async function uploadFile(file, filename) {
//   try {
//     return put(filename, file, {
//       access: "public",
//     });
//   } catch (error) {
//     throw new Error("Error while uploading file ->" + filename);
//   }
// }

// delete images form vercel blob
// export async function deleteFile(filename) {
//   try {
//     return del(filename);
//   } catch (error) {
//     throw new Error("Error while deleting file ->" + filename);
//   }
// }

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
    console.log("Error Occured while checking existence ->", error.message);
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
export async function checkIfAttributeSetExists(filter) {
  return checkExistence(filter, AttributeSet);
}
