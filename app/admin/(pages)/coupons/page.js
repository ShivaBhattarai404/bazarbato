import dbConnect from "@/helpers/dbConnect";
import CouponClientComponent from "./component";
import DiscountCoupon from "@/models/DiscountCoupon";
import { deepCopy } from "@/helpers/utils";

// function to delete coupon or coupons
async function deleteCoupons(couponIds) {
  "use server";
  try {
    await dbConnect();
    const response = await DiscountCoupon.deleteMany({
      _id: { $in: couponIds },
    });
    return { error: null, message: "Coupon deleted successfully" };
  } catch (error) {
    return { error: "Server Error, Something went wrong" };
  }
}

// function to set the status of coupon to inactive
async function disableCoupons(couponIds) {
  "use server";
  try {
    await dbConnect();
    const response = await DiscountCoupon.updateMany(
      { _id: { $in: couponIds } },
      { isActive: false }
    );
    return { error: null, message: "Coupon disabled successfully" };
  } catch (error) {
    return { error: "Server Error, Something went wrong" };
  }
}

async function fetchCoupons(skip, limit) {
  // connecting to database
  try {
    await dbConnect();
    const [coupons, totalCount] = await Promise.all([
      DiscountCoupon.find()
        .skip(skip)
        .limit(limit)
        .select("code validFrom validUntil usageCount status isActive")
        .sort({ createdAt: -1 })
        .lean(),
      DiscountCoupon.countDocuments(),
    ]);
    return { coupons: deepCopy(coupons), totalCount };
  } catch (error) {
    return [];
  }
}

export default async function Coupons({
  searchParams: { page = 1, perPage = 10 },
}) {
  const skip = (page - 1) * perPage;
  const limit = perPage;
  const { coupons, totalCount } = await fetchCoupons(skip, limit);
  return (
    <CouponClientComponent
      coupons={coupons}
      deleteCoupons={deleteCoupons}
      disableCoupons={disableCoupons}
      couponsCount={totalCount}
    />
  );
}
