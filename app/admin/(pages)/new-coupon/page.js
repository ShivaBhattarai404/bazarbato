// core imports
import { revalidatePath } from "next/cache";

// database models
import Product from "@/models/Product";
import Category from "@/models/Category";
import DiscountCoupon from "@/models/DiscountCoupon";

// helper functions
import { checkIfCouponExists } from "@/helpers/crud";

// components
import NewCouponForm from "./form";
import dbConnect from "@/helpers/dbConnect";
import { deepCopy } from "@/helpers/utils";

export const metadata = {
  title: "New Coupon",
};

// function to add or update a coupon
async function addCoupon(formData) {
  "use server";
  const _id = formData.get("_id");
  const code = formData.get("code");
  const description = formData.get("description");
  const isActive = formData.get("status") === "true";
  const usageLimit = parseInt(formData.get("use-limit"));
  const validFrom = new Date(formData.get("start-date"));
  const validUntil = new Date(formData.get("end-date"));
  const freeShipping = formData.get("free-shipping") === "true";
  const forNewCustomers = formData.get("new-customers") === "true";
  console.log("discount type", formData.get("type"));
  const discountType = formData.get("type")?.toUpperCase();
  const applicableOn = formData.get("apply-on");
  const scope = formData.get("scope");
  const discountValue = parseFloat(formData.get("discount-value"));
  let maxDiscountAmount = parseFloat(formData.get("max-discount-amount") || 0);
  discountType === "FIXED" && (maxDiscountAmount = discountValue);
  const minPurchaseAmount = parseFloat(formData.get("min-order-amount") || 0);
  const minPurchaseQuantity = parseInt(formData.get("min-order-quantity") || 0);
  const applicableItems = formData.getAll("applicable-items");
  const applicableProducts = applicableOn === "PRODUCT" ? applicableItems : [];
  const applicableCategories =
    applicableOn === "CATEGORY" ? applicableItems : [];

  try {
    await dbConnect();
    revalidatePath("/admin/new-attribute");
    if (_id) {
      await DiscountCoupon.findByIdAndUpdate(_id, {
        code,
        description,
        isActive,
        usageLimit,
        validFrom,
        validUntil,
        applicableOn,
        scope,
        applicableProducts,
        applicableCategories,
      });
      return { error: null, message: "Attribute updated successfully" };
    } else {
      await DiscountCoupon.create({
        code,
        description,
        isActive,
        usageLimit,
        validFrom,
        validUntil,
        freeShipping,
        discountType,
        applicableOn,
        scope,
        maxDiscountAmount,
        forNewCustomers,
        minPurchaseAmount,
        minPurchaseQuantity,
        discountValue,
        applicableProducts,
        applicableCategories,
      });
      return { error: null, message: "Attribute created successfully" };
    }
  } catch (error) {
    console.log(error);
    return { error: "Server Error, Something went wrong" };
  }
}

// function to fetch all categories and products so that user can select for applicable items
async function fetchAllProductsAndCategories() {
  try {
    await dbConnect();
    const [products, categories] = await Promise.all([
      Product.aggregate([
        {
          $project: {
            code: "$_id", // Rename _id to "code"
            _id: 0, // Remove the original _id field
            name: 1, // Keep other fields as needed
            image: { $arrayElemAt: ["$images", 0] }, // Keep only the first image
          },
        },
      ]),
      Category.aggregate([
        {
          $project: {
            code: "$_id", // Rename _id to "code"
            _id: 0, // Remove the original _id field
            name: 1, // Keep other fields as needed
            image: "$banner",
          },
        },
      ]),
    ]);
    return deepCopy({ products, categories });
  } catch (error) {
    return { products: [], categories: [] };
  }
}

async function fetchCoupon(code) {
  if (!code) return null;
  try {
    await dbConnect();
    const coupon = await DiscountCoupon.findOne({ code }).select(
      "-__v, -createdAt, -updatedAt, -usageCount"
    );
    return deepCopy(coupon);
  } catch (error) {
    return null;
  }
}

export default async function NewCoupon({
  searchParams: { coupon: couponCode },
}) {
  const { products, categories } = await fetchAllProductsAndCategories();
  const coupon = await fetchCoupon(couponCode);

  return (
    <NewCouponForm
      addCoupon={addCoupon}
      checkIfCouponExists={checkIfCouponExists}
      products={products}
      categories={categories}
      coupon={coupon}
    />
  );
}
