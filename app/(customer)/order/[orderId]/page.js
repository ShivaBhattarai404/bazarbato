// core react and nextjs modules
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

// database models
import Order from "@/models/Order";

// styles CSS modules
import styles from "./page.module.css";

// react icons
import { FaFileInvoice } from "react-icons/fa";
import { FiMinus, FiPlus } from "react-icons/fi";

// components
import Path from "@/components/_customer/Path/Path";

// helper functions
import dbConnect from "@/helpers/dbConnect";
import { capitalize, deepCopy, formatDate } from "@/helpers/utils";
import tshirt from "@/public/images/p1.png";
import { Fragment } from "react";

async function fetchOrderFromOrderId(orderID) {
  if (!orderID) return null;
  // fetch order from the server
  try {
    await dbConnect();
    const order = await Order.findById(orderID).lean();
    return deepCopy(order);
  } catch (error) {
    return null;
  }
}

export default async function OrderPage({ params: { orderId } }) {
  const order = await fetchOrderFromOrderId(orderId);

  if (!order) {
    return notFound();
  }

  return (
    <section className={styles.section}>
      <Path
        className={styles.path}
        paths={[
          { name: "Home", href: "#" },
          { name: "Orders", href: "#" },
          { name: `ID ${order._id}`, href: "#" },
        ]}
      />
      <div className={styles.title}>
        <h1>Order ID: {order._id}</h1>
        <button className={styles.cta}>
          <FaFileInvoice />
          <span>Download Invoice</span>
        </button>
      </div>
      <div className={styles.date}>
        <span>
          Order Date: <b>{formatDate(order.placedAt)}</b>
        </span>
        <span>
          Order Status: <b>{order.orderStatus}</b>
        </span>
      </div>
      <hr className={styles.hr} />

      {order.items.map((item) => (
        <div key={item._id} className={styles.product}>
          <Image
            className={styles.productImg}
            src={item.image}
            alt={item.name}
            width={100}
            height={100}
          />
          <div className={styles.productInfo}>
            <h2 className={styles.productName}>{item.name}</h2>
            {/* <span className={styles.productAttribute}>Size: M</span> */}
            {item.coupon && (
              <span className={styles.productAttribute}>
                Coupon: {item.coupon}
              </span>
            )}
          </div>
          <div className={styles.priceAndQuantity}>
            <span className={styles.price}>Rs 100.00</span>
            <span className={styles.qty}>Qty: 2</span>
            {item.coupon && (
              <span className={[styles.qty, styles.discountAmount].join(" ")}>
                Discount: Rs {item.discountAmount}
              </span>
            )}
          </div>
        </div>
      ))}

      <hr className={styles.hr} />

      <div className={styles.payment}>
        <h2 className={styles.sectionTitle}>Payment</h2>
        {order.paymentStatus !== "PAID" ? (
          <Link href={`/payment?order=${order._id}`}>
            <button className={styles.cta}>
              <FaFileInvoice />
              <span>Pay now</span>
            </button>
          </Link>
        ) : (
          <button className={styles.cta}>
            <FaFileInvoice />
            <span>{capitalize(order.paymentStatus)}</span>
          </button>
        )}
        {/* <span>
          Payment Method: <b>Cash on Delivery</b>
        </span> */}
      </div>

      <hr className={styles.hr} />

      <div className={styles.delivery}>
        <h2 className={styles.sectionTitle}>Delivery</h2>
        <span>
          Address:{" "}
          <b>{`${order.shipping.address} ${order.shipping.city} ${order.shipping.province} ${order.shipping.country}`}</b>
        </span>
        <span>
          Phone: <b>{order.shipping.phone}</b>
        </span>
        <span>
          Alternative Phone: <b>{order.shipping.alternativePhone}</b>
        </span>
      </div>

      <hr className={styles.hr} />

      <div className={styles.summary}>
        <h2 className={styles.sectionTitle}>Order Summary</h2>
        <div className={styles.subtotal}>
          <span>Subtotal</span> <b>Rs {order.total}</b>
        </div>
        <div className={styles.others}>
          Delivery{" "}
          <b>
            <FiPlus /> Rs {order.shipping.deliveryCharge}
          </b>
        </div>
        {order.coupon && (
          <Fragment>
            <p className={styles.others}>
              Discount Coupon{" "}
              <b>
                <FiMinus /> Rs {order.coupon}
              </b>
            </p>
            <p className={styles.others}>
              Discount{" "}
              <b>
                <FiMinus /> Rs {order.discountAmount}
              </b>
            </p>
          </Fragment>
        )}
        <div className={styles.total}>
          <span>Total</span>
          <b>Rs {order.grossTotal}</b>
        </div>
      </div>
    </section>
  );
}
