"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import styles from "./page.module.css";
import formStyles from "@/public/styles/form.module.css";

import Card from "@/components/Card/Card";
import AdminPageHeading from "@/components/Utils/AdminPageHeading";

import { formatDate } from "@/helpers/utils";
import Modal from "@/components/_admin/Modal/Modal";
import { useDispatch } from "react-redux";
import { resetError, setError } from "@/app/reducers/utils";

function Product({ product }) {
  if (!product) {
    return null;
  }

  return (
    <div className={styles.product}>
      <Image src={product.image} alt={product.name} width={50} height={50} />
      <div className={styles.info}>
        <Link href={`/product/${product.url_key}`} className={styles.name}>
          {product.name}
        </Link>
        <p className={styles.sku}>{product.sku}</p>
        {product.coupon && (
          <p className={styles.attribute}>
            <b>Coupon:</b> {product.coupon} (Rs {product.discountAmount} off)
          </p>
        )}
        {product?.attributes?.map((attribute) => (
          <p key={attribute.name} className={styles.attribute}>
            <b>{attribute.name}:</b> {attribute.value}
          </p>
        ))}
      </div>
      <h1 className={styles.qty}>
        Rs {product.price}*{product.quantity}
        {product.coupon && "-" + product.discountAmount}
      </h1>
      <h1 className={styles.total}>Rs {product.total}</h1>
    </div>
  );
}

export default function OrderComponent({
  order: initialOrder,
  changeOrderStatus,
}) {
  const [order, setOrder] = useState(initialOrder);
  const [loading, setLoading] = useState(false);
  const [modalType, setModalType] = useState(null);
  const dispatch = useDispatch();

  const modalTitle =
    order.orderStatus === "PROCESSING"
      ? "Mark as shipped"
      : "Mark as delivered";
  const btn1Text =
    order.orderStatus === "PROCESSING"
      ? "Mark as Shipped"
      : "Mark as Delivered";

  const orderStatusChangeHandler = async () => {
    dispatch(resetError());
    setLoading(true);
    try {
      const response = await changeOrderStatus(order._id);
      if (response.error) {
        dispatch(setError(response.error));
      }
      setOrder(response.order);
    } catch (error) {
      dispatch(setError("Something went wrong"));
    } finally {
      setLoading(false);
      setModalType("");
    }
  };

  return (
    <div className={`${styles.container} homepadding`}>
      {modalType && (
        <Modal
          btn1Text={btn1Text}
          btn2Text="Cancel"
          bgColor2="#2c6ecb"
          onCancel={() => setModalType("")}
          onOk={orderStatusChangeHandler}
          title={modalTitle}
          paragraph={"Customer will be notified about the status"}
          loading={loading}
        />
      )}

      <AdminPageHeading back className={styles.title}>
        Order {order._id}
        <span
          className={
            order.orderStatus === "PROCESSING"
              ? styles.processing
              : order.orderStatus === "SHIPPED"
              ? styles.shipped
              : styles.delivered
          }
        >
          {order.orderStatus.toLowerCase()}
        </span>{" "}
        <span
          className={
            order.paymentStatus === "PAID" ? styles.paid : styles.processing
          }
        >
          {order.paymentStatus.toLowerCase()}
        </span>
      </AdminPageHeading>
      <div className={styles.cardWrapper}>
        <Card className={`${styles.card} ${styles.status}`}>
          <span className={styles.cardTitle}>
            {order.orderStatus.toLowerCase()}
          </span>
          {order.items.map((product) => (
            <Product key={product._id} product={product} />
          ))}

          <button
            className={formStyles.btn}
            onClick={() =>
              setModalType(
                order.orderStatus === "DELIVERED" ? null : order.orderStatus
              )
            }
          >
            Mark as{" "}
            {order.orderStatus === "PROCESSING" ? "Shipped" : "Delivered"}
          </button>
        </Card>

        <Card className={`${styles.card} ${styles.customerNote}`}>
          <span className={styles.cardTitle}>Customer Notes</span>
          <p>{order.shipping.customerNote || "No notes from customer"}</p>
        </Card>

        <Card className={`${styles.card} ${styles.customer}`}>
          <span className={styles.cardTitle}>Customer</span>
          <div className={styles.box}>
            <Link
              className={styles.name}
              href={`/admin/customers/${order.user._id}`}
            >
              {order.user.firstName} {order.user.lastName}
            </Link>
            <p>{order.user.email}</p>
          </div>
          <div className={styles.box}>
            <h1>Shipping Info</h1>
            <p>{order.shipping.name}</p>
            <p>
              {order.shipping.address}, {order.shipping.city}{" "}
              {order.shipping.district} {order.shipping.province}{" "}
              {order.shipping.country}, {order.shipping.postalCode}
            </p>
          </div>
          <div className={styles.box}>
            <h1>Contact Information</h1>
            <p>
              {order.shipping.phone}, {order.shipping.alternativePhone}
            </p>
          </div>
          <div className={styles.box}>
            <h1>Order Date</h1>
            <p>{formatDate(order.placedAt)}</p>
          </div>
        </Card>
        <Card className={`${styles.card} ${styles.payment}`}>
          <span className={styles.cardTitle}>Order Summary</span>
          <table className={styles.table}>
            <tbody>
              <tr>
                <td>Subtotal</td>
                <td>{order.totalItems} items</td>
                <td>Rs {order.total}</td>
              </tr>
              <tr>
                <td colSpan={2}>Shipping</td>
                <td>+Rs {order.shipping.deliveryCharge}</td>
              </tr>
              {order.coupon && (
                <tr>
                  <td>Discount</td>
                  <td>{order.coupon}</td>
                  <td>-Rs {order.discountAmount}</td>
                </tr>
              )}
              <tr>
                <td colSpan={2}>Total</td>
                <td>Rs {order.grossTotal}</td>
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
