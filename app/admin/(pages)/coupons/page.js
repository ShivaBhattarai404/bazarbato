import dbConnect from "@/helpers/dbConnect";
import CouponClientComponent from "./component";
import DiscountCoupon from "@/models/DiscountCoupon";
import { deepCopy } from "@/helpers/utils";

async function fetchCoupons() {
  // connecting to database
  try {
    await dbConnect();
  } catch (error) {
    return [];
  }

  try {
    const coupons = await DiscountCoupon.find()
      .select("code validFrom validUntil usageCount status isActive")
      .sort({ createdAt: -1 })
      .lean();
    return deepCopy(coupons);
  } catch (error) {
    return [];
  }
}
export default async function Coupons() {
  const coupons = await fetchCoupons();
  return <CouponClientComponent coupons={coupons} />;
}
