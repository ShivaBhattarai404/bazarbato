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

// const ORDER = {
//   user: "66dc175f0ff272e3689d913b",
//   items: [
//     {
//       product: "66de63a5cf925a675f2a7ed5",
//       name: "Smart watches Vital Plus",
//       sku: "SMART_WATCH",
//       image:
//         "https://premps.nyc3.digitaloceanspaces.com/premps/products/smart-watch/1725850533617-watch-1.jpg",
//       price: 5000,
//       category: "66de6321cf925a675f2a7eae",
//       quantity: 1,
//       coupon: null,
//       discountAmount: 0,
//       total: 5000,
//       url_key: "smart-watch",
//       discountAmount: 0,
//     },
//   ],
//   totalItems: 1,
//   total: 5000,
//   coupon: null,
//   discountAmount: 0,
//   shipping: {
//     name: "Shiva Bhattarai",
//     country: "India",
//     province: "Gujarat",
//     district: "Ahmedabad",
//     city: "Navrangpura",
//     address: "Vrundhavan",
//     postalCode: "390019",
//     phone: "09621197817",
//     alternativePhone: "09621197817",
//     customerNote: "ma ghara nahuna ni sakxu",
//     deliveryCharge: 445,
//   },
//   grossTotal: 5445,
// };

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
        >
          {paymentData?.ESEWA &&
            Object.entries(paymentData.ESEWA).map(([key, value]) => (
              <input key={key} name={key} hidden value={value} disabled />
            ))}
          <button className={styles.continueBtn}>Pay through Esewa</button>
        </form>
      </div>
    </Fragment>
  );
}
