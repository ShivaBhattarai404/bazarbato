import Card from "@/components/Card/Card";
import styles from "./page.module.css";
import formStyles from "@/public/styles/form.module.css";
import AdminPageHeading from "@/components/Utils/AdminPageHeading";
import Link from "next/link";

export const metadata = {
  title: "Coupon Details",
  description: "Coupon details page for admin",
};

export default function Dashboard({ params: { couponCode } }) {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };
  return (
    <div className={styles.container}>
      <AdminPageHeading back className={styles.title}>
        {couponCode} Coupon Details
        <Link
          className={`${formStyles.btn} ${styles.editBtn}`}
          href={`/admin/new-coupon?coupon=${couponCode}`}
        >
          Edit Coupon
        </Link>
      </AdminPageHeading>
      <div className={styles.cardWrapper}>
        <Card className={`${styles.card} ${styles.orderInfo}`}>
          <span className={styles.cardTitle}>Used History</span>
          {/* <p className={styles.fallback}>
            Customer doesnot have any orders yet.
          </p> */}

          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.order_number}>Order number</th>
                <th className={styles.no_of_products}>Products with coupon</th>
                <th className={styles.total}>Deducted amount</th>
              </tr>
            </thead>
            <tbody>
              {new Array(6).fill("").map((order, index) => (
                <tr key={index}>
                  <td className={styles.order_number}>
                    <Link href={`/admin/orders/${index}`}>{couponCode}</Link>
                  </td>
                  <td className={styles.no_of_products}>{index * 4 + 2}</td>
                  <td className={styles.total}>Rs. 200</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
        <Card className={`${styles.card} ${styles.couponInfo}`}>
          <h1>Coupon Code</h1>
          <p>{couponCode}</p>
          <h1>Type</h1>
          <p>Percentage discount on specific product</p>
          <h1>Free shipping?</h1>
          <p>No</p>
          <h1>Start date</h1>
          <p>01 Jul 2024</p>
          <h1>End date</h1>
          <p>15 Jul 2024</p>
          <h1>Status</h1>
          <p>Enabled</p>
        </Card>
      </div>
    </div>
  );
}
