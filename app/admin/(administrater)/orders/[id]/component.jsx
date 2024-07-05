"use client";

import Link from "next/link";
import Image from "next/image";

import styles from "./page.module.css";
import formStyles from "@/public/styles/form.module.css";

import Card from "@/components/Card/Card";
import AdminPageHeading from "@/components/Utils/AdminPageHeading";

import frame from "@/public/images/frame.png";
import { useRouter } from "next/navigation";

function Product({ products }) {
  const product = {
    name: "Frame",
    sku: "NJC83763-Black-M",
    price: "Rs. 500",
    image: frame,
    qty: 3,
    price: 500,
    coupon: "SUMMER200",
    attributes: [
      {
        name: "Color",
        value: "Black",
      },
      {
        name: "Size",
        value: "M",
      },
    ],
  };

  return (
    <div className={styles.product}>
      <Image src={product.image} alt={product.name} width={50} height={50} />
      <div className={styles.info}>
        <Link href={`/admin/new-product`} className={styles.name}>
          {product.name}
        </Link>
        <p className={styles.sku}>{product.sku}</p>
        {product.coupon && (
          <p className={styles.attribute}>
            <b>Coupon:</b> {product.coupon}
          </p>
        )}
        {product.attributes.map((attribute) => (
          <p key={attribute.name} className={styles.attribute}>
            <b>{attribute.name}:</b> {attribute.value}
          </p>
        ))}
      </div>
      <h1 className={styles.qty}>
        Rs {product.price}*{product.qty}
      </h1>
      <h1 className={styles.total}>Rs {product.price * product.qty}</h1>
    </div>
  );
}

export default function OrderComponent() {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };
  return (
    <div className={`${styles.container} homepadding`}>
      <AdminPageHeading back className={styles.title}>
        Order #ORD51687 <span className={styles.shipped}>Shipped</span>{" "}
        <span className={styles.paid}>Paid</span>
      </AdminPageHeading>
      <div className={styles.cardWrapper}>
        <Card className={`${styles.card} ${styles.status}`}>
          <span className={styles.cardTitle}>Shipped</span>
          <Product />
          <Product />
          <Product />
          <Product />

          <button className={formStyles.btn}>Mark as Delivered</button>
        </Card>

        <Card className={`${styles.card} ${styles.customerNote}`}>
          <span className={styles.cardTitle}>Customer Notes</span>
          <p>
            You can create a template note as a starting point for general notes
            that need to be slightly different for each order or return. For
            example, you want to track extensive data for returns.
          </p>
        </Card>

        <Card className={`${styles.card} ${styles.customer}`}>
          <span className={styles.cardTitle}>Customer</span>
          <div className={styles.box}>
            <Link className={styles.name} href="/admin/customers/1">
              Sapana Bhandari
            </Link>
          </div>
          <div className={styles.box}>
            <h1>Contact Information</h1>
            <p>sapanabhandari56@gmail.com</p>
            <p>98254764910</p>
          </div>
          <div className={styles.box}>
            <h1>Order Date</h1>
            <p>12 Jun 2024</p>
          </div>
          <div className={styles.box}>
            <h1>Shipping Address</h1>
            <p>Sapana Bhandari, Sunwal-12 Bhumahi Nawalparasi Nepal</p>
          </div>
        </Card>
        <Card className={`${styles.card} ${styles.payment}`}>
          <span className={styles.cardTitle}>Cash on Delivery</span>
          <table className={styles.table}>
            <tbody>
              <tr>
                <td>Subtotal</td>
                <td>3 items</td>
                <td>Rs 4500</td>
              </tr>
              <tr>
                <td colSpan={2}>Shipping</td>
                <td>Rs 100</td>
              </tr>
              <tr>
                <td>Discount</td>
                <td>FIRST100, SUMMER200</td>
                <td>Rs 300</td>
              </tr>
              <tr>
                <td colSpan={2}>Tax</td>
                <td>Rs 0</td>
              </tr>
              <tr>
                <td colSpan={2}>Total</td>
                <td>Rs 4300</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={3}>
                  <button className={formStyles.btn}>Print Invoice</button>
                </td>
              </tr>
            </tfoot>
          </table>
        </Card>
      </div>
    </div>
  );
}
