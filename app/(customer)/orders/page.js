import Image from "next/image";
import Link from "next/link";

import Path from "@/components/_customer/Path/Path";
import styles from "./page.module.css";
import hoodie from "@/public/images/p1.png";
import { IoIosArrowForward } from "react-icons/io";

export default function Orders() {
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
        {new Array(3).fill(0).map((_, i) => (
          <div key={i} className={styles.order}>
            <div className={styles.orderHeader}>
              <div
                // classNames options -: processing, shipped, delivered
                className={[styles.orderStatus, styles.processing].join(" ")}
              >
                processing
              </div>
              <div className={styles.orderDate}>
                {new Date().toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </div>
            </div>
            <div className={styles.orderBody}>
              <Image src={hoodie} alt="product" width={100} height={100} />
              <div className={styles.orderInfo}>
                <div className={styles.orderId}>Order ID: ABC-6457325</div>
                <div className={styles.orderItems}>
                  Hoodie{" "}
                  <Link href="#" className={styles.extraItems}>
                    & 2 more items
                  </Link>
                </div>
                <div className={styles.orderPrice}>Rs 20.00</div>
              </div>
              <div className={styles.orderCTA}>
                <IoIosArrowForward />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
