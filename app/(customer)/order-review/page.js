import CartProgressBar from "@/components/_customer/CartProgressBar/CartProgressBar";
import styles from "./page.module.css";
import { FiMinus, FiPlus } from "react-icons/fi";
import { FaFileInvoice } from "react-icons/fa";
import Image from "next/image";
import tshirt from "@/public/images/p1.png";
import Link from "next/link";

export default function OrderReview() {
  return (
    <section className={styles.section}>
      <CartProgressBar
        active={3}
        labelPosition="bottom"
        className={styles.progressBar}
        steps={["Cart", "Shipping", "Review", "Payment"]}
      />
      <hr />

      <div className={styles.delivery}>
        <h2 className={styles.sectionTitle}>Shipping Information</h2>
        <span>
          Full name: <b>Sapana Bhandari</b>
        </span>
        <span>
          Address: <b>Jaganath school agadi, Sunwal-12 Bhumahi, Nawalparasi</b>
        </span>
        <span>
          Phone: <b>9825452908</b>
        </span>
        <span>
          Alternative phone number: <b>9825452908</b>
        </span>
        <span>
          Order note:{" "}
          <b>Ma ghara vayeni vni diyeko duita number ma phone garnu hola</b>
        </span>
      </div>
      <hr className={styles.hr} />

      <h2 className={styles.sectionTitle}>Your Items</h2>
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

      <div className={styles.summary}>
        <h3 className={styles.sectionTitle}>Order Summary</h3>
        <ul className={styles.summaryList}>
          <li>
            <span>Subtotal</span>
            <span>Rs 460</span>
          </li>
          <li>
            <span>Delivery charge</span>
            <span>Rs 50</span>
          </li>
          <li>
            <span>Gross amount (including tax)</span>
            <span>Rs 510</span>
          </li>
        </ul>
        <Link href="/payment" className={styles.continueBtn}>
          Confirm Order
        </Link>
      </div>
    </section>
  );
}
