// core react and next.js modules
import { notFound } from "next/navigation";

// helper functions
import dbConnect from "@/helpers/dbConnect";
import { deepCopy } from "@/helpers/utils";
import { getUser } from "@/helpers/crud";

// database models
import Product from "@/models/Product";
import Bag, {
  calculateDiscountAmountForProduct,
  checkCouponApplicability,
  checkCouponValidity,
} from "@/models/Bag";
import User from "@/models/User";

// custom components
import PageComponent from "./page-component";
import { revalidatePath } from "next/cache";
import DiscountCoupon from "@/models/DiscountCoupon";

export const metadata = {
  title: "Product Page",
};

// function to fetch that specific product from the database which has the given slug
async function getProductFromSlug(slug) {
  try {
    // try connecting to database
    await dbConnect();
  } catch (error) {
    // if database connection fails, return null
    return null;
  }
  try {
    const product = await Product.findOne({ url_key: slug })
      .populate("category category.parent", "name url_key parent")
      .select("name sku price attributes category description images")
      .lean();
    return deepCopy(product);
  } catch (error) {
    console.log("error from fetch prducts", error);
    return null;
  }
}

// function to add product into the bag
async function addToBag({ _id: productId, sku, attributes, coupon, quantity }) {
  "use server";

  // get user
  const userStoredInCookies = await getUser();
  if (!userStoredInCookies) {
    return { error: "User not found" };
  }
  const product = await Product.findById(productId)
    .lean()
    .select("name sku images price category url_key");
  if (!product) {
    return { error: "Product not found" };
  }
  const user = await User.findById(userStoredInCookies._id)
    .select("bag")
    .populate("bag");
  if (!user) {
    return { error: "User not found" };
  }
  // if user has an existing bag/cart then add product to that bag/cart
  if (user.bag) {
    const bag = user.bag;
    const item = bag.items.find(
      (item) => item.sku === sku && item.product.toString() === productId
    );
    // if product already exists in the cart then increase the quantity of that product
    if (item) {
      item.quantity = quantity;
      item.coupon = coupon;
      await bag.save();
      revalidatePath("/bag");
      return;
    }
    // if product does not exist in the cart then add the product to the cart
    bag.items.push({
      product: product._id,
      name: product.name,
      sku: product.sku,
      image: product.images[0],
      url_key: product.url_key,
      price: product.price,
      category: product.category,
      quantity,
      coupon,
    });
    await bag.save();
    revalidatePath("/bag");
    console.log("product added to bag");
    return;
  } else {
    // if user does not have an existing bag/cart then create a new cart and add product to that cart
    const cart = new Bag({
      user: userStoredInCookies._id,
      items: [
        {
          product: product._id,
          name: product.name,
          sku: product.sku,
          image: product.images[0],
          url_key: product.url_key,
          price: product.price,
          category: product.category,
          quantity,
          coupon,
        },
      ],
    });
    try {
      const response = await cart.save();
      await User.findByIdAndUpdate(userStoredInCookies._id, {
        bag: response._id,
      });
      revalidatePath("/bag");
      console.log("product added to bag");
    } catch (error) {
      console.log(error);
    }
  }
}

// function to apply coupon
async function applyCoupon(couponCode, appliedProduct) {
  "use server";
  if (!couponCode) {
    return { error: "Coupon code is required" };
  }
  if (!appliedProduct) {
    return { error: "Product id is required" };
  }
  try {
    await dbConnect();
  } catch (error) {
    return { error: "Server Error, cannot connect to database" };
  }

  try {
    const product = await Product.findById(appliedProduct._id).lean();
    if (!product) {
      return { error: "Product not found" };
    } else {
      product.total = product.price * appliedProduct.quantity;
    }
    const coupon = await DiscountCoupon.findOne({ code: couponCode }).lean();
    if (!coupon) {
      return { error: "Coupon not found" };
    }

    if (!checkCouponValidity(coupon)) {
      return { error: "Invalid or expired coupon" };
    }
    if (!checkCouponApplicability(coupon, product)) {
      return { error: "Coupon not applicable on this product" };
    }
    const discountAmount = calculateDiscountAmountForProduct(product, coupon);
    if (discountAmount === 0) {
      return { error: "Coupon not applicable on this product" };
    }
    return { error: null, discountAmount };
  } catch (error) {
    return { error: "Server Error, cannot apply coupon" };
  }
}

export default async function ProductPage({ params: { slug } }) {
  const product = await getProductFromSlug(slug);
  if (!product) {
    return notFound();
  }
  return (
    <PageComponent
      product={product}
      addToBag={addToBag}
      applyCoupon={applyCoupon}
    />
  );
}
