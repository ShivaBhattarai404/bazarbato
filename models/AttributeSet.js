import mongoose, { Schema } from "mongoose";

const { ObjectId } = Schema.Types;

const attributeSetSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    attributes: [
      {
        type: ObjectId,
        ref: "Attribute",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.AttributeSet ||
  mongoose.model("AttributeSet", attributeSetSchema);
