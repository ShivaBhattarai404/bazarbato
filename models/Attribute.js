import mongoose, { Schema } from "mongoose";

const AttributeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: false,
  },
  isRequired: {
    type: Boolean,
    default: false,
  },
  showToCustomer: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.models.Attribute ||
  mongoose.model("Attribute", AttributeSchema);
