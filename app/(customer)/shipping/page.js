// helper functions
import { deepCopy } from "@/helpers/utils";
import { getUser } from "@/helpers/auth";
import dbConnect from "@/helpers/dbConnect";
import Bag, {
  calculateDiscountAmountForEntireOrder,
  calculateDiscountAmountForProduct,
} from "@/models/Bag";

// database models
import User from "@/models/User";
import Order from "@/models/Order";
import Product from "@/models/Product";

// components
import DiscountCoupon from "@/models/DiscountCoupon";
import ShippingComponent from "./component";

// data
import { DELIVERY_CHARGES } from "./data";

// function to check single item and return the item with all the correct information
async function checkSingleItem(item) {
  const product = await Product.findById(item.product)
    .select("name price sku url_key images category")
    .lean();
  if (!product) {
    return null;
  }
  item.name = product.name;
  item.price = product.price;
  item.sku = product.sku;
  item.url_key = product.url_key;
  item.image = product.images[0];
  item.category = product.category;

  const coupon = item.coupon
    ? await DiscountCoupon.findOne({
        code: item.coupon,
      })
    : null;
  if (coupon) {
    item.discountAmount =
      calculateDiscountAmountForProduct(product, coupon) * item.quantity;
  } else {
    item.coupon = null;
    item.discountAmount = 0;
  }
  item.total = item.price - item.discountAmount;
  return item;
}

// this function ensures that the all the items, coupons, and shipping information is correct
// it will correct the order and return the corrected order
async function createOrder(order) {
  "use server";
  // connect database
  try {
    await dbConnect();
  } catch (error) {
    return { error: "Server Error! Cannot connect to database" };
  }
  // user check
  try {
    const user = await getUser();
    if (!user) {
      return { error: "User not found" };
    }
    order.user = user._id;
  } catch (error) {
    return { error: "User not found" };
  }

  // calculate shipping charges
  const { country, province, district, city } = order.shipping;
  const countryCharge = DELIVERY_CHARGES[country]?.charges;
  const provinceCharge =
    DELIVERY_CHARGES[country]?.provinces[province]?.charges;
  const districtCharge =
    DELIVERY_CHARGES[country]?.provinces[province]?.districts[district]
      ?.charges;
  const cityCharge =
    DELIVERY_CHARGES[country]?.provinces[province]?.districts[district]?.cities[
      city
    ]?.charges;
  if (countryCharge && provinceCharge && districtCharge && cityCharge) {
    order.shipping.deliveryCharge =
      countryCharge + provinceCharge + districtCharge + cityCharge;
  } else {
    return { error: "Invalid shipping information" };
  }

  // loop through items and check for each item
  order.items = (
    await Promise.all(order.items.map((item) => checkSingleItem(item)))
  ).filter((item) => item);

  // calculate total items and total amount
  order.totalItems = order.items.reduce((acc, item) => acc + item.quantity, 0);
  order.total = order.items.reduce((acc, item) => acc + item.total, 0);

  const noneOfTheItemsHaveCoupon = order.items.every((item) => !item.coupon);
  if (noneOfTheItemsHaveCoupon && order.coupon) {
    // Apply cart coupon only if no product coupons are applied
    try {
      if (!order.coupon) {
        // If coupon is not found, invalidate the cart coupon
        throw new Error("Coupon not found");
      }
      const coupon = await DiscountCoupon.findOne({ code: order.coupon });
      if (!coupon) {
        // If coupon is not found, invalidate the cart coupon
        throw new Error("Coupon not found");
      }
      order.discountAmount = calculateDiscountAmountForEntireOrder(
        order,
        coupon
      );
    } catch {
      // If any product has a coupon, invalidate the cart coupon
      order.coupon = null;
      order.discountAmount = 0;
    }
  } else {
    // If any product has a coupon, invalidate the cart coupon
    order.coupon = null;
    order.discountAmount = 0;
  }
  order.grossTotal =
    order.total - order.discountAmount + order.shipping.deliveryCharge;
  // order.payment = getPaymentMethod(order);
  try {
    const orderDoc = new Order({
      user: order.user,
      items: order.items,
      totalItems: order.totalItems,
      total: order.total,
      coupon: order.coupon,
      discountAmount: order.discountAmount,
      shipping: order.shipping,
      grossTotal: order.grossTotal,
    });
    await orderDoc.save();
    const bagIsDeleted = await Bag.findOneAndDelete({ user: order.user });
    if (bagIsDeleted) {
      await User.findByIdAndUpdate(order.user, {
        $set: { bag: null },
      });
    }
    return { error: null, order: deepCopy(orderDoc) };
  } catch (error) {
    return { error: "Failed to create order" };
  }
}

export default function ShippingPage() {
  return <ShippingComponent createOrder={createOrder} />;
}
