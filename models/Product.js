import mongoose, { Schema } from "mongoose";
import Category from "./Category";

const SchemaTypes = Schema.Types;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    sku: {
      type: String,
      required: true,
    },
    price: {
      type: SchemaTypes.Number,
      required: true,
    },
    category: {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: Category,
    },
    description: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    rating: {
      type: Number,
      default: 0,
    },
    url_key: {
      type: String,
      required: true,
    },
    meta_title: {
      type: String,
      required: true,
    },
    meta_description: {
      type: String,
      required: true,
    },
    meta_keywords: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "enabled",
    },
    visibility: {
      type: String,
      default: "visible",
    },
    stock_availability: {
      type: String,
      default: "no",
    },
    quantity: {
      type: Number,
      required: true,
      default: 0,
    },
    attributeSet: {
      type: String,
      required: true,
    },
    attributes: [
      {
        code: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          required: true,
        },
        value: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);
