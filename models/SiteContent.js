import mongoose, { Schema } from "mongoose";

const { ObjectId } = Schema.Types;

const SiteContentSchema = new Schema(
  {
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    products: {
      type: [ObjectId],
      ref: "Product",
    },
    categories: {
      type: [ObjectId],
      ref: "Category",
    },
  },
  { timestamps: true }
);

export default mongoose.models.SiteContent ||
  mongoose.model("SiteContent", SiteContentSchema);
