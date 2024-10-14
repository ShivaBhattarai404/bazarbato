import Card from "@/components/Card/Card";
import styles from "./page.module.css";
import AdminPageHeading from "@/components/Utils/AdminPageHeading";
import Link from "next/link";
import { deepCopy, formatDate } from "@/helpers/utils";
import dbConnect from "@/helpers/dbConnect";
import User from "@/models/User";
import mongoose from "mongoose";
import Order from "@/models/Order";
import { notFound } from "next/navigation";

export async function generateMetadata({ params: { id } }) {
  try {
    const customer = await getCustomerById(id);
    return {
      title: customer.firstName + " " + customer.lastName,
    };
  } catch (error) {
    return {
      title: "customer",
    };
  }
}
async function getCustomerById(_id) {
  try {
    await dbConnect();
    const [customer, orders] = await Promise.all([
      User.findById(_id)
        .select("-password -createdAt -updatedAt -__v -bag -wishlist")
        .lean(),
      Order.find({ user: _id }).select("placedAt grossTotal").lean(),
    ]);
    return deepCopy({ ...customer, orders });
  } catch (error) {
    return null;
  }
}

export default async function Customer({ params: { id } }) {
  const customer = await getCustomerById(id);
  if (!customer) return notFound();

  return (
    <div className={styles.container}>
      <AdminPageHeading back className={styles.title}>
        {customer.firstName} {customer.lastName}
      </AdminPageHeading>
      <div className={styles.cardWrapper}>
        <Card className={`${styles.card} ${styles.orderInfo}`}>
          <span className={styles.cardTitle}>Order History</span>
          {customer.orders.length === 0 ? (
            <p className={styles.fallback}>
              Customer doesnot have any orders yet.
            </p>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.order_number}>Order number</th>
                  <th className={styles.date}>Date</th>
                  <th className={styles.total}>total</th>
                </tr>
              </thead>
              <tbody>
                {customer?.orders?.map((order) => (
                  <tr key={order._id}>
                    <td className={styles.order_number}>
                      <Link href={`/admin/orders/${order._id}`}>
                        {order._id}
                      </Link>
                    </td>
                    <td className={styles.date}>
                      {formatDate(order.placedAt)}
                    </td>
                    <td className={styles.total}>Rs. {order.grossTotal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Card>
        <Card className={`${styles.card} ${styles.customerInfo}`}>
          <h1>Full name</h1>
          <p>
            {customer.firstName} {customer.lastName}
          </p>
          <h1>Phone</h1>
          <p>{customer.phone}</p>
          <h1>Email</h1>
          <p>{customer.email}</p>
          <h1>Phone Verfied</h1>
          <p>{customer.phoneVerified ? "Yes" : "No"}</p>
          <h1>Email Verfied</h1>
          <p>{customer.emailVerified ? "Yes" : "No"}</p>
        </Card>
      </div>
    </div>
  );
}
