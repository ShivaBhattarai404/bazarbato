"use client";

// core modules
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import { notFound, useRouter } from "next/navigation";

// custom components
import CartProgressBar from "@/components/_customer/CartProgressBar/CartProgressBar";

// CSS files
import styles from "./page.module.css";

export default function OrderReview() {
  const order = useSelector((state) => state.order.order);
  const router = useRouter();
  const confirmClickHandler = () => {
    router.replace("/payment?order=" + order._id);
  };

  if (!order) {
    // if there is no order placed then it makes no sense to show the review page
    return notFound();
  }

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
          Full name: <b>{order?.shipping?.name}</b>
        </span>
        <span>
          Address:{" "}
          <b>
            {order?.shipping?.address}, {order?.shipping?.city},{" "}
            {order?.shipping?.district} {order?.shipping?.province}{" "}
            {order?.shipping?.country}
          </b>
        </span>
        <span>
          Phone: <b>{order?.shipping?.phone}</b>
        </span>
        <span>
          Alternative phone number: <b>{order?.shipping?.alternativePhone}</b>
        </span>
        <span>
          Order note: <b>{order?.shipping?.customerNote}</b>
        </span>
      </div>
      <hr className={styles.hr} />

      <h2 className={styles.sectionTitle}>Your Items</h2>
      {order?.items &&
        order.items?.length > 0 &&
        order.items.map((item, i) => (
          // item.product contains the product id which is reference to the product
          <div key={item.product} className={styles.product}>
            <Link href={`/product/${item.url_key}`}>
              <Image
                className={styles.productImg}
                src={item.image}
                alt={item.name}
                width={100}
                height={100}
              />
            </Link>
            <div className={styles.productInfo}>
              <Link href={`/product/${item.url_key}`}>
                <h2 className={styles.productName}>{item.name}</h2>
              </Link>
              {/* <span className={styles.productAttribute}>Size: M</span> */}
              {item.coupon && (
                <span className={styles.productAttribute}>
                  Coupon: {item.coupon}
                </span>
              )}
            </div>
            <div className={styles.priceAndQuantity}>
              <span className={styles.price}>
                Rs {item.price} * {item.quantity} = {item.price * item.quantity}
              </span>
              {item.discountAmount > 0 && (
                <div className={styles.qty}>-Rs {item.discountAmount}</div>
              )}
              {/* <span className={styles.qty}>Qty: {item.quantity}</span> */}
              {item.discountAmount > 0 && (
                <div className={styles.qty}>Rs {item.total}</div>
              )}
            </div>
          </div>
        ))}

      <hr className={styles.hr} />

      <div className={styles.summary}>
        <h3 className={styles.sectionTitle}>Order Summary</h3>
        <ul className={styles.summaryList}>
          <li>
            <span>Subtotal</span>
            <span>Rs {order.total}</span>
          </li>
          <li>
            <span>Delivery charge</span>
            <span>Rs {order.shipping.deliveryCharge}</span>
          </li>
          <li>
            <span>Gross amount (including tax)</span>
            <span>Rs {order.grossTotal}</span>
          </li>
        </ul>
        <button className={styles.continueBtn} onClick={confirmClickHandler}>
          Continue to payment
        </button>
      </div>
    </section>
  );
}
