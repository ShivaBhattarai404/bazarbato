// core react and next.js imports
import { revalidatePath } from "next/cache";

// helper functions
import { getUser } from "@/helpers/auth";
import { deepCopy } from "@/helpers/utils";
import dbConnect from "@/helpers/dbConnect";
import {
  calculateDiscountAmountForEntireOrder,
  validateCoupons,
} from "@/models/Bag";

// database models
import User from "@/models/User";

// components
import BagComponent from "./component";
import DiscountCoupon from "@/models/DiscountCoupon";

// metadata
export const metadata = {
  title: "Bag",
  description: "Bag",
};

async function getBag() {
  const userStoredInCookies = await getUser();
  if (!userStoredInCookies) {
    return null;
  }
  try {
    await dbConnect();
  } catch (error) {
    return null;
  }
  try {
    const user = await User.findById(userStoredInCookies._id).populate(
      "bag bag.items.product"
    );
    if (!user) {
      return { error: "User not found" };
    }
    if (user.bag.items.length === 0) {
      return null;
    }
    await validateCoupons(user.bag);
    return deepCopy(user.bag);
  } catch (error) {
    return null;
  }
}

async function changeItemQuantity(itemId, option) {
  "use server";
  try {
    await dbConnect();
  } catch (error) {
    return { error: "Database connection error" };
  }

  // get user
  try {
    const userStoredInCookies = await getUser();
    if (!userStoredInCookies) {
      return { error: "User not found" };
    }
    const user = await User.findById(userStoredInCookies._id)
      .select("bag")
      .populate("bag");
    if (!user) {
      return { error: "User not found" };
    }

    // if user has an existing bag/cart then increment quantity of the product
    if (user?.bag) {
      const bag = user.bag;
      const item = bag.items.find((item) => item._id.toString() === itemId);
      if (!item) {
        return { error: "Item not found" };
      }
      try {
        option === "INCREMENT" ? item.quantity++ : item.quantity--;
        const updatedBag = await bag.save({
          new: true,
          runValidators: true,
        });
        return { updatedBag: deepCopy(updatedBag) };
      } catch {
        return { error: "Something went wrong" };
      }
    } else {
      return { error: "Bag not found" };
    }
  } catch (error) {
    return { error: "User not found" };
  }
}

async function applyCoupon(couponCode) {
  "use server";
  try {
    await dbConnect();
  } catch (error) {
    return { error: "Database connection error" };
  }

  // get user
  try {
    const userStoredInCookies = await getUser();
    if (!userStoredInCookies) {
      return { error: "User not found" };
    }
    const user = await User.findById(userStoredInCookies._id)
      .select("bag")
      .populate("bag");
    if (!user) {
      return { error: "User not found" };
    }

    // if user has an existing bag/cart then apply coupon to the bag/cart
    if (user.bag) {
      const bag = user.bag;
      bag.coupon = couponCode;
      try {
        const coupon = await DiscountCoupon.findOne({ code: couponCode });
        bag.discountAmount = calculateDiscountAmountForEntireOrder(bag, coupon);
        if (bag.discountAmount === 0) {
          bag.coupon = null;
        }
        const updatedBag = await bag.save();
        console.log("updatedBag");
        return { updatedBag: deepCopy(updatedBag) };
      } catch (error) {
        return { error: "Something went wrong" };
      }
    }
  } catch (error) {
    return { error: "User not found" };
  }
}

// function to remove product from the bag
async function removeFromBag(itemId) {
  "use server";

  // get user
  const userStoredInCookies = await getUser();
  if (!userStoredInCookies) {
    return { error: "User not found" };
  }
  const user = await User.findById(userStoredInCookies._id)
    .select("bag")
    .populate("bag");
  if (!user) {
    return { error: "User not found" };
  }
  // if user has an existing bag/cart then remove product from that bag/cart
  if (user.bag) {
    const bag = user.bag;
    bag.items = bag.items.filter((item) => item._id.toString() !== itemId);
    const response = await bag.save();
    if (response.items.length === 0) {
      return { updatedBag: null };
    }
    return { updatedBag: deepCopy(response) };
  }
}

export default async function BagPage() {
  const bag = await getBag();
  return (
    <BagComponent
      bag={bag}
      applyCoupon={applyCoupon}
      removeFromBag={removeFromBag}
      changeItemQuantity={changeItemQuantity}
    />
  );
}
