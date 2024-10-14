"use client";

import styles from "./page.module.css";
import { Fragment } from "react";
import { MdPayment } from "react-icons/md";
import { AiOutlineCheck } from "react-icons/ai";
import { BsCalendarDate } from "react-icons/bs";
import { TiSortNumericallyOutline } from "react-icons/ti";
import RadioButton from "@/components/RadioButton/RadioButton";
import { useSelector } from "react-redux";
import { notFound } from "next/navigation";
import Link from "next/link";

export default function PaymentForm({ order, paymentData }) {
  return (
    <Fragment>
      <div className={styles.summary}>
        <h3 className={styles.sectionTitle}>Order Summary</h3>
        <ul className={styles.summaryList}>
          <li>
            <span>Subtotal</span>
            <span>Rs {order?.total}</span>
          </li>
          <li>
            <span>Delivery charge</span>
            <span>Rs {order?.shipping?.deliveryCharge}</span>
          </li>
          <li>
            <span>Gross amount (including tax)</span>
            <span>Rs {order?.grossTotal}</span>
          </li>
        </ul>
        <form
          action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
          method="POST"
          encType="application/x-www-form-urlencoded"
        >
          {paymentData?.ESEWA &&
            Object.entries(paymentData.ESEWA).map(([key, value]) => (
              <input key={key} name={key} hidden value={value} />
            ))}
          <button className={styles.continueBtn}>Pay through Esewa</button>
        </form>
      </div>
    </Fragment>
  );
}
