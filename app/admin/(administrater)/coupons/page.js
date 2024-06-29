"use client";

import Link from "next/link";

import styles from "./page.module.css";
import formStyles from "@/public/styles/form.module.css";
import Card from "@/components/Card/Card";
import CheckBox from "@/components/CheckBox/CheckBox";
import { useState } from "react";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import Modal from "@/components/Modal/Modal";

export default function ProductsPage() {
  const [selectedCoupons, setSelectedCoupon] = useState([]);
  const [modalType, setModalType] = useState("");

  const couponSelectHandler = (e) => {
    const { value } = e.target;
    if (selectedCoupons.includes(value)) {
      setSelectedCoupon((prev) => prev.filter((item) => item !== value));
    } else {
      setSelectedCoupon((prev) => [...prev, value]);
    }
  };

  const modalTitleKey = modalType === "disable" ? "Disable" : "Delete";
  const modalPargraphKey = modalType === "disable" ? "disable" : "delete";
  const btn1Text = modalType === "disable" ? "Disable" : "Delete";

  return (
    <div className={styles.container}>
      {modalType && (
        <Modal
          btn1Text={btn1Text}
          btn2Text="Cancel"
          bgColor2={modalType === "disable" ? "#2c6ecb" : "#d72c0d"}
          onCancel={() => setModalType("")}
          title={`${modalTitleKey} ${selectedCoupons.length} coupons`}
          paragraph={`Are you sure you want to ${modalPargraphKey} this coupon?`}
        />
      )}

      <div className={styles.title}>
        <h1>Coupons</h1>
        <Link className={styles.newProductLink} href="/admin/new-coupon">
          New Coupon
        </Link>
      </div>
      <Card className={styles.card}>
        <input
          type="text"
          placeholder="Search"
          className={`${formStyles.input} ${styles.search}`}
        />
        <select className={`${formStyles.select}`}>
          <option value="all">All</option>
          <option value="enabled">Enabled</option>
          <option value="disabled">Disabled</option>
        </select>
        <select className={`${formStyles.select} ${styles.sort}`}>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="nameAsc">Name: A to Z</option>
          <option value="nameDesc">Name: Z to A</option>
          <option value="priceAsc">Free shipping enabled</option>
        </select>

        {selectedCoupons.length > 0 && (
          <div className={styles.controls}>
            <div className={styles.no_of_selected_product}>
              {selectedCoupons.length} selected
            </div>
            <div
              className={styles.delete_btn}
              onClick={() => setModalType("delete")}
            >
              Delete
            </div>
            <div
              className={styles.enable_or_disable_btn}
              onClick={() => setModalType("disable")}
            >
              Disable
            </div>
          </div>
        )}

        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.checkbox}></th>
              <th className={styles.code}>Coupon Code</th>
              <th className={styles.startdate}>Start Date</th>
              <th className={styles.enddate}>End date</th>
              <th className={styles.usedtimes}>Used times</th>
              <th className={styles.status}>Status</th>
            </tr>
          </thead>
          <tbody>
            {new Array(6).fill("").map((_, i) => (
              <tr key={i}>
                <td className={styles.checkbox}>
                  <CheckBox
                    id={`all-products-${i}`}
                    value={i}
                    onClick={couponSelectHandler}
                  />
                </td>
                <td className={styles.code}>
                  <Link href="#">BUYXGETY {i + 1}</Link>
                </td>
                <td className={styles.startdate}>12 Jun 2024</td>
                <td className={styles.enddate}>20 Jul 2024</td>
                <td className={styles.usedtimes}>{i*3}</td>
                <td className={styles.status}>
                  {/* <span className={styles.disabled} /> */}
                  <span disabled />
                </td>
              </tr>
            ))}
          </tbody>

          <tfoot className={styles.tableFoot}>
            <tr>
              <td colSpan={2} className={styles.product_per_page}>
                Show
                <input
                  className={formStyles.input}
                  type="number"
                  defaultValue="10"
                />
                per page
              </td>
              <td colSpan={4} className={styles.pagination}>
                <button className={styles.first}>
                  <AiOutlineDoubleLeft />
                </button>
                <button className={styles.prev}>
                  <HiOutlineChevronLeft />
                </button>
                <input
                  className={formStyles.input}
                  type="number"
                  defaultValue="1"
                />
                <button className={styles.next}>
                  <HiOutlineChevronRight />
                </button>
                <button className={styles.last}>
                  <AiOutlineDoubleRight />
                </button>
                <span>36 records</span>
              </td>
            </tr>
          </tfoot>
        </table>
      </Card>
    </div>
  );
}
