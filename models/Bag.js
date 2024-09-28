import mongoose, { Schema } from "mongoose";
import Product from "./Product";
import User from "./User";
import DiscountCoupon from "./DiscountCoupon";

const { ObjectId } = mongoose.Schema.Types;

// Schema for individual cart item
const bagItemSchema = new Schema({
  product: {
    type: ObjectId,
    ref: Product,
    required: true,
  },
  name: { type: String, required: true },
  sku: { type: String, required: true },
  image: { type: String, required: true },
  url_key: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: ObjectId, required: true },
  quantity: { type: Number, required: true, min: 1 },

  // Product-level coupon
  coupon: {
    type: String,
    ref: DiscountCoupon,
    default: null, // Null if no product-specific coupon is applied
  },
  discountAmount: { type: Number, default: 0 }, // Discount applied to this product

  total: { type: Number, default: 0 }, // Total price for this item (quantity * price - discount)
});

// Cart schema
const bagSchema = new Schema(
  {
    user: { type: ObjectId, ref: "User", required: true },
    items: [bagItemSchema], // Cart items
    totalItems: { type: Number, default: 0 }, // Total number of items in cart
    total: { type: Number, default: 0 }, // Total price of all items before any discounts

    // Cart-level coupon
    coupon: {
      type: String,
      ref: DiscountCoupon,
      default: null, // Null if no cart-specific coupon is applied
    },
    discountAmount: { type: Number, default: 0 }, // Discount applied to the whole cart

    grossTotal: { type: Number, default: 0 }, // Final total after applying discounts
  },
  { timestamps: true }
);

// Pre-save hook to handle the logic
// this will be called before saving the cart
// bagSchema.pre("save", async function (next) {
bagSchema.pre("save", async function (next) {
  let hascoupons = false; // Track if any product has a coupon applied

  // Calculate product-level discounts
  for (const item of this.items) {
    item.total = item.price * item.quantity; // Calculate total price for this item
    if (item.coupon) {
      const coupon = await DiscountCoupon.findOne({ code: item.coupon });
      if (!coupon) continue; // Skip if coupon is not found
      // Apply product coupon. Validity and applicability checks are done in the applyCoupon function
      item.discountAmount =
        calculateDiscountAmountForProduct(item, coupon) * item.quantity;
      if (item.discountAmount === 0) {
        item.coupon = null; // Remove the coupon if it is not applicable or expired
      }
      item.total = item.total - item.discountAmount; // Apply discount to the total
      hascoupons = item.discountAmount > 0; // Mark that product coupon is applied
    }
  }

  // Cart-level discount
  if (this.coupon && !hascoupons) {
    // Apply cart coupon only if no product coupons are applied
    const coupon = await DiscountCoupon.findOne({ code: this.coupon });
    this.discountAmount = calculateDiscountAmountForEntireOrder(this, coupon);
    if (this.discountAmount === 0) {
      this.coupon = null; // Remove the coupon if it is not applicable or expired
    }
  } else {
    // If any product has a coupon, invalidate the cart coupon
    this.coupon = null;
    this.discountAmount = 0;
  }

  // Calculate total items and cart total
  this.totalItems = this.items.reduce(
    (total, item) => total + item.quantity,
    0
  );
  // Calculate cart total which is obtained by
  // summing up the total of all items
  // if any product has a coupon applied, the discount is already applied to the total
  this.total = this.items.reduce((total, item) => total + item.total, 0);

  // Calculate final total
  // if a cart coupon is applied, subtract the discount amount from the cart total
  this.grossTotal = this.total - this.discountAmount;
  next();
});

// Middleware for findOne
bagSchema.post("findOne", async function (doc, next) {
  if (doc) {
    await validateCoupons(doc); // Validate coupons and remove expired ones
  }
  next();
});

// Middleware for find (applies to arrays)
bagSchema.post("find", async function (docs, next) {
  for (const doc of docs) {
    await validateCoupons(doc); // Validate coupons for each document in the result
  }
  next();
});

// this function is used to ensure that if the coupon is expired or invalid, it is removed from the cart
export async function validateCoupons(bag) {
  if (!bag) return; // If no bag is found, skip the middleware

  let hasChanges = false; // Track if any changes are made to the bag

  // Check product-level coupons for each item in the bag
  for (const item of bag.items) {
    if (item.coupon) {
      const coupon = await DiscountCoupon.findOne({ code: item.coupon });

      // If the coupon is expired or invalid, remove it
      if (!coupon || !checkCouponValidity(coupon)) {
        item.coupon = null;
        item.discountAmount = 0;
        hasChanges = true;
      }
      if (item.discountAmount === 0) {
        item.coupon = null; // Remove the coupon if it is not applicable or expired
        hasChanges = true;
      }
    }
  }

  // Check if the cart-level coupon is expired
  if (bag.coupon) {
    const cartCoupon = await DiscountCoupon.findOne({ code: bag.coupon });

    // If the coupon is expired or invalid, remove it
    if (!cartCoupon || !checkCouponValidity(cartCoupon)) {
      bag.coupon = null;
      bag.discountAmount = 0;
      hasChanges = true;
    }
    if (bag.discountAmount === 0) {
      bag.coupon = null; // Remove the coupon if it is not applicable or expired
      hasChanges = true;
    }
  }

  // If any changes were made to the bag, save the updated document
  if (hasChanges) {
    // Update totalItems and total prices
    bag.totalItems = bag.items.reduce(
      (total, item) => total + item.quantity,
      0
    );
    bag.total = bag.items.reduce((total, item) => total + item.total, 0);
    bag.grossTotal = bag.total - bag.discountAmount;

    await bag.save();
  }
}

export default mongoose.models.Bag || mongoose.model("Bag", bagSchema);

export const checkCouponValidity = (coupon) => {
  // these checks can be done in same line but for readability purpose, I have separated them
  // if the coupon has not started yet, skip it
  if (coupon.validFrom > Date.now()) {
    return false;
  }
  // if the coupon is expired, skip it
  else if (coupon.validUntil < Date.now()) {
    return false;
  }
  // if the coupon is not active, skip it
  else if (!coupon.isActive) {
    return false;
  }
  // if the coupon has reached its usage limit, skip it
  else if (coupon.usageCount >= coupon.usageLimit) {
    return false;
  }
  return true;
};
export const checkCouponApplicability = (coupon, item) => {
  // if the coupon is not for this category, skip it
  if (
    coupon.applicableOn === "category" &&
    coupon.applicableCategories.indexOf(item.category) === -1
  ) {
    return false;
  }
  // if the coupon is not for this product, skip it
  else if (
    coupon.applicableOn === "products" &&
    coupon.applicableProducts.indexOf(item.product) === -1
  ) {
    return false;
  }
  // if the coupon is for new customers only and the user is not new, skip it
  // else if (coupon.forNewCustomers && !item.user.isNewCustomer) {
  //   return false;
  // }
  // if the coupon requires a minimum purchase amount and the user has not met it, skip it
  else if (item.total < coupon.minPurchaseAmount) {
    return false;
  }
  // if the coupon requires a minimum purchase quantity and the user has not met it, skip it
  else if (item.quantity < coupon.minPurchaseQuantity) {
    return false;
  }
  return true;
};
export const checkCouponApplicabilityForEntireOrder = (coupon, order) => {
  // if the coupon requires a minimum purchase amount and the user has not met it, skip it
  if (order.total < coupon.minPurchaseAmount) {
    return false;
  }
  // if the coupon requires a minimum purchase quantity and the user has not met it, skip it
  else if (order.totalItems < coupon.minPurchaseQuantity) {
    return false;
  }
  return true;
};
export const calculateDiscountAmountForProduct = (item, coupon) => {
  let calculatedDiscountAmount = 0;
  if (
    coupon &&
    checkCouponValidity(coupon) &&
    coupon.scope === "INDIVIDUAL" &&
    checkCouponApplicability(coupon, item)
  ) {
    if (coupon.discountType === "PERCENTAGE") {
      calculatedDiscountAmount = item.price * (coupon.discountValue / 100);
      if (calculatedDiscountAmount > coupon.maxDiscountAmount) {
        calculatedDiscountAmount = coupon.maxDiscountAmount;
      }
    } else if (coupon.discountType === "FIXED") {
      calculatedDiscountAmount = coupon.discountValue;
    }
    if (calculatedDiscountAmount > item.price) {
      calculatedDiscountAmount = item.price; // Discount cannot exceed product total
    }
  }
  return calculatedDiscountAmount;
};
export const calculateDiscountAmountForEntireOrder = (order, coupon) => {
  let calculatedDiscountAmount = 0;
  if (
    coupon &&
    checkCouponValidity(coupon) &&
    coupon.scope === "ENTIRE_ORDER" &&
    checkCouponApplicabilityForEntireOrder(coupon, order)
  ) {
    if (coupon.discountType === "PERCENTAGE") {
      calculatedDiscountAmount = (order.total * coupon.discountValue) / 100;
      if (calculatedDiscountAmount > coupon.maxDiscountAmount) {
        calculatedDiscountAmount = coupon.maxDiscountAmount;
      }
    } else if (coupon.discountType === "FIXED") {
      calculatedDiscountAmount = coupon.discountValue;
    }
    if (calculatedDiscountAmount > order.total) {
      calculatedDiscountAmount = order.total; // Discount cannot exceed cart total
    }
  }
  return calculatedDiscountAmount;
};
