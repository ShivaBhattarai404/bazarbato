import mongoose, { Schema } from "mongoose";
import Attribute from "./Attribute";

const SchemaTypes = Schema.Types;

const attributeSetSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    attributes: [
      {
        type: Schema.Types.ObjectId,
        ref: Attribute,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.AttributeSet || mongoose.model("AttributeSet", attributeSetSchema);