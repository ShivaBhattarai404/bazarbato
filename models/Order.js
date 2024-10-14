import mongoose, { Schema } from "mongoose";
import DiscountCoupon from "./DiscountCoupon";
const { ObjectId } = Schema.Types;

// Schema for each item in the order
const orderItemSchema = new Schema({
  product: {
    type: ObjectId,
    ref: "Product",
    required: true,
  }, // Product ID
  name: { type: String, required: true }, // Product name
  sku: { type: String, required: true }, // SKU (Stock Keeping Unit)
  image: { type: String, required: true }, // Image URL
  price: { type: Number, required: true }, // Product price at the time of order
  category: {
    type: ObjectId,
    ref: "Category",
    required: true,
  }, // Product category ID
  quantity: { type: Number, required: true }, // Quantity of the product
  coupon: {
    type: String,
    ref: "Coupon",
    required: false,
  }, // Coupon applied to this product, if any
  discountAmount: { type: Number, required: true, default: 0 }, // Discount amount applied to the product
  total: { type: Number, required: true }, // Total price for this item (after discount)
  url_key: { type: String, required: true }, // Product URL key
  discountAmount: { type: Number, required: true, default: 0 }, // Any other discount amount
});

// Schema for shipping details
const shippingSchema = new Schema({
  name: { type: String, required: true }, // Shipping recipient name
  country: { type: String, required: true }, // Country
  province: { type: String, required: true }, // Province or state
  district: { type: String, required: true }, // District
  city: { type: String, required: true }, // City
  address: { type: String, required: true }, // Street address
  postalCode: { type: String, required: true }, // Postal or zip code
  phone: { type: String, required: true }, // Primary contact phone
  alternativePhone: { type: String, required: false }, // Alternative phone number (optional)
  customerNote: { type: String, required: false }, // Customer note for delivery (optional)
  deliveryCharge: { type: Number, required: true }, // Delivery charge
});

// Payment schema
const paymentSchema = new Schema({
  method: {
    type: String,
    enum: ["ESEWA", "Khalti"],
    required: true,
  }, // Payment method
  amount: { type: Number, required: true }, // Payment amount
  details: { type: Object, required: false }, // Payment details (specific to the payment method)
  transaction_uuid: { type: String, required: true }, // Unique transaction ID
});

// Main Order schema
const orderSchema = new Schema({
  user: { type: ObjectId, ref: "User", required: true }, // User ID of the customer
  items: [orderItemSchema], // Array of ordered items
  totalItems: { type: Number, required: true }, // Total number of items in the order
  total: { type: Number, required: true }, // Total cost of the order (before delivery)
  coupon: {
    type: String,
    ref: "Coupon",
    required: false,
  }, // Coupon applied to the whole cart (if any)
  discountAmount: { type: Number, required: true, default: 0 }, // Total discount amount for the whole order
  shipping: shippingSchema, // Shipping details
  grossTotal: { type: Number, required: true }, // Gross total (including delivery charges)
  payment: {
    type: paymentSchema,
    required: false,
  }, // Payment information
  paymentStatus: {
    type: String,
    enum: ["PENDING", "PAID", "FAILED"],
    default: "PENDING",
  }, // Payment status
  orderStatus: {
    type: String,
    enum: ["PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"],
    default: "PROCESSING",
  }, // Current status of the order
  placedAt: { type: Date, default: Date.now }, // Date and time the order was placed
  createdAt: { type: Date, default: Date.now }, // Date and time the order was created
  cancelledAt: { type: Date, required: false }, // Date the order was cancelled (optional)
});

orderSchema.index(
  { createdAt: 1 },
  {
    expireAfterSeconds: 3600, // Automatically delete orders after 1 hour
    partialFilterExpression: { paymentStatus: "PENDING" }, // Only delete pending orders
  }
);

// Post-save hook to increase coupon usage counts
orderSchema.post("save", async function (doc) {
  // This code runs after the order is saved
  if (doc.paymentStatus !== "PAID") return;

  let orderCouponPromise = Promise.resolve();
  if (doc.coupon) {
    // Increment usage count for order-level coupon
    orderCouponPromise = DiscountCoupon.findOneAndUpdate({
      code: doc.coupon,
      $inc: { usageCount: 1 },
    });
  }

  // Increment usage count for product-level coupons
  const promises = doc.items.map((item) => {
    if (item.coupon) {
      return DiscountCoupon.findOneAndUpdate({
        code: item.coupon,
        $inc: { usageCount: 1 },
      });
    } else {
      return Promise.resolve();
    }
  });
  await Promise.all([...promises, orderCouponPromise]);
});

export default mongoose.models.Order || mongoose.model("Order", orderSchema);
