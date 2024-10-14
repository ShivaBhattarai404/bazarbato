// core modules
import Image from "next/image";
import Link from "next/link";

// custom components
import Path from "@/components/_customer/Path/Path";

// helper functions
import { getUser } from "@/helpers/auth";
import dbConnect from "@/helpers/dbConnect";
import { deepCopy, formatDate } from "@/helpers/utils";

// database models
import Order from "@/models/Order";

// styles
import styles from "./page.module.css";

// react-icons
import { IoIosArrowForward } from "react-icons/io";
import hoodie from "@/public/images/p1.png";

// function to fetch all the orders of the customer
async function fetchOrders() {
  try {
    await dbConnect();
    const user = await getUser();
    const orders = await Order.find({ user: user._id }).lean();
    return deepCopy(orders);
  } catch (error) {
    return [];
  }
}

export default async function Orders() {
  const orders = await fetchOrders();
  return (
    <section className={styles.section}>
      <h1 className={styles.title}>Order History</h1>
      <Path
        paths={[
          { name: "Home", href: "#" },
          { name: "My account", href: "#" },
          { name: "My orders", href: "#" },
        ]}
      />

      <div className={styles.orders}>
        {orders.map?.((order) => (
          <div key={order._id} className={styles.order}>
            <div className={styles.orderHeader}>
              <div
                // classNames options -: processing, shipped, delivered, cancelled
                className={[
                  styles.orderStatus,
                  styles[order.orderStatus.toLowerCase?.()],
                ].join(" ")}
              >
                {order.orderStatus.toLowerCase?.()}
              </div>
              <div className={styles.orderDate}>
                {formatDate(order.placedAt)}
              </div>
            </div>
            <div className={styles.orderBody}>
              <Link href={`/order/${order._id}`}>
                <Image
                  src={order.items[0].image}
                  alt="product"
                  width={100}
                  height={100}
                />
              </Link>
              <div className={styles.orderInfo}>
                <div className={styles.orderId}>Order ID: {order._id}</div>
                <div className={styles.orderItems}>
                  {order.items[0].name}{" "}
                  <Link href="#" className={styles.extraItems}>
                    {order.items.length > 1 &&
                      `& ${order.items.length - 1} more items`}
                  </Link>
                </div>
                <div className={styles.orderPrice}>Rs {order.grossTotal}</div>
              </div>
              <Link href={`/order/${order._id}`} className={styles.orderCTA}>
                <IoIosArrowForward />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
