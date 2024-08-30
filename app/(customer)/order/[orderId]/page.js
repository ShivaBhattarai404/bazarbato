import Link from "next/link";
import Image from "next/image";

import styles from "./page.module.css";
import tshirt from "@/public/images/p1.png";

import { FaFileInvoice } from "react-icons/fa";
import { FiMinus, FiPlus } from "react-icons/fi";
import Path from "@/components/_customer/Path/Path";

export default function Order() {
  return (
    <section className={styles.section}>
      <Path
      className={styles.path}
        paths={[
          { name: "Home", href: "#" },
          { name: "Orders", href: "#" },
          { name: "ID 334902461", href: "#" },
        ]}
      />
      <div className={styles.title}>
        <h1>Order ID: 334902461</h1>
        <button className={styles.cta}>
          <FaFileInvoice />
          <span>Invoice</span>
        </button>
      </div>
      <div className={styles.date}>
        <span>
          Order Date: <b>12/12/2021</b>
        </span>
        <span>
          Order Status: <b>Delivered</b>
        </span>
      </div>
      <hr className={styles.hr} />

      {new Array(3).fill(0).map((_, i) => (
        <div key={i} className={styles.product}>
          <Image
            className={styles.productImg}
            src={tshirt}
            alt="product"
            width={100}
            height={100}
          />
          <div className={styles.productInfo}>
            <h2 className={styles.productName}>Macbook pro M1 14</h2>
            <span className={styles.productAttribute}>Size: M</span>
            <span className={styles.productAttribute}>Coupon: 123456</span>
          </div>
          <div className={styles.priceAndQuantity}>
            <span className={styles.price}>Rs 100.00</span>
            <span className={styles.qty}>Qty: 2</span>
          </div>
        </div>
      ))}

      <hr className={styles.hr} />

      <div className={styles.payment}>
        <h2 className={styles.sectionTitle}>Payment</h2>
        <button className={styles.cta}>
          <FaFileInvoice />
          <span>Not Paid</span>
        </button>
        {/* <span>
          Payment Method: <b>Cash on Delivery</b>
        </span> */}
      </div>

      <hr className={styles.hr} />

      <div className={styles.delivery}>
        <h2 className={styles.sectionTitle}>Delivery</h2>
        <span>
          Address: <b>Jaganath school agadi, Sunwal-12 Bhumahi, Nawalparasi</b>
        </span>
        <span>
          Phone: <b>1234567890</b>
        </span>
      </div>

      <hr className={styles.hr} />

      <div className={styles.summary}>
        <h2 className={styles.sectionTitle}>Order Summary</h2>
        <div className={styles.subtotal}>
          <span>Subtotal</span> <b>Rs 200.00</b>
        </div>
        <div className={styles.others}>
          Delivery{" "}
          <b>
            <FiPlus /> Rs 5.00
          </b>
        </div>
        <div className={styles.others}>
          Discount{" "}
          <b>
            <FiMinus /> Rs 2.00
          </b>
        </div>
        <div className={styles.total}>
          <span>Total</span>
          <b>Rs 203.00</b>
        </div>
      </div>
    </section>
  );
}
