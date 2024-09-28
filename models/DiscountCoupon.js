import mongoose, { Schema } from "mongoose";
const { ObjectId } = Schema.Types;

// Define the schema for the discount coupon
const discountCouponSchema = new Schema(
  {
    code: { type: String, required: true, unique: true }, // Coupon code
    description: { type: String, required: true }, // Description of the coupon
    isActive: { type: Boolean, default: true }, // Whether the coupon is currently active
    usageLimit: { type: Number, default: 1 }, // Maximum number of times the coupon can be used
    validFrom: { type: Date, required: true }, // Start date of coupon validity
    validUntil: { type: Date, required: true }, // Expiry date of coupon
    freeShipping: { type: Boolean, default: false }, // Whether the coupon provides free shipping
    discountType: {
      type: String,
      enum: ["PERCENTAGE", "FIXED"],
      default: "FIXED",
    }, // Discount type
    applicableOn: {
      type: String,
      enum: ["PRODUCT", "CATEGORY"],
      required: true,
    }, // Coupon is applicable on products or categories
    scope: {
      type: String,
      enum: ["INDIVIDUAL", "ENTIRE_ORDER"],
      required: true,
    }, // Coupon is applicable for single product or entire order

    maxDiscountAmount: { type: Number }, // Maximum discount amount, if percentage-based
    forNewCustomers: { type: Boolean, default: false }, // Whether the coupon is for new customers only

    minPurchaseAmount: { type: Number, default: 0 }, // Minimum order value to apply the coupon
    minPurchaseQuantity: { type: Number }, // Minimum order value to apply the coupon

    discountValue: { type: Number, required: true }, // Discount value (either percentage or fixed amount)
    applicableProducts: { type: [ObjectId], ref: "Product" }, // List of products that the coupon can be applied to
    applicableCategories: { type: [ObjectId], ref: "Category" }, // List of categories that the coupon can be applied to
    usageCount: { type: Number, default: 0 }, // Tracks how many times the coupon has been used
  },
  { timestamps: true }
);

export default mongoose.models.DiscountCoupon ||
  mongoose.model("DiscountCoupon", discountCouponSchema);
