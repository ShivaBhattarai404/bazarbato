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
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [modal, setModal] = useState(false);

  const productSelectHandler = (e) => {
    const { value } = e.target;
    if (selectedProducts.includes(value)) {
      setSelectedProducts((prev) => prev.filter((item) => item !== value));
    } else {
      setSelectedProducts((prev) => [...prev, value]);
    }
  };

  return (
    <div className={styles.container}>
      {modal && (
        <Modal
          btn1Text="Mark as shipped"
          btn2Text="Cancel"
          onCancel={() => setModal(false)}
          title={`Fullfill ${selectedProducts.length} products`}
          paragraph="Notification will be sent to the customer."
        />
      )}

      <div className={styles.title}>
        <h1>Orders</h1>
      </div>
      <Card className={styles.card}>
        <input
          type="text"
          placeholder="Search"
          className={`${formStyles.input} ${styles.search}`}
        />
        <select className={`${formStyles.select}`}>
          <option value="all">All</option>
          <option value="paid">Paid</option>
          <option value="not-paid">Not paid</option>
        </select>
        <select className={`${formStyles.select} ${styles.sort}`}>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="priceAsc">Price: Low to High</option>
          <option value="priceDesc">Price: High to Low</option>
        </select>

        {selectedProducts.length > 0 && (
          <div className={styles.controls}>
            <div className={styles.no_of_selected_product}>
              {selectedProducts.length} selected
            </div>
            <div
              className={styles.mark_as_shipped}
              onClick={() => setModal(true)}
            >
              Mark as shipped
            </div>
          </div>
        )}

        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.checkbox}></th>
              <th className={styles.order_number}>Order number</th>
              <th className={styles.date}>Date</th>
              <th className={styles.email}>Customer email</th>
              <th className={styles.shipment_status}>Shipment status</th>
              <th className={styles.payment_status}>Payment status</th>
              <th className={styles.total}>total</th>
            </tr>
          </thead>
          <tbody>
            {new Array(6).fill("").map((_, i) => (
              <tr key={i}>
                <td className={styles.checkbox}>
                  <CheckBox
                    id={`all-products-${i}`}
                    value={i}
                    onClick={productSelectHandler}
                  />
                </td>
                <td className={styles.order_number}>
                  <Link href="/admin/orders/some-id">#1654321</Link>
                </td>
                <td className={styles.date}>Jun 29, 2024</td>
                <td className={styles.email}>shivabhattarai15@gmail.com</td>
                <td className={styles.shipment_status}>
                  {i === 0 && <span className={styles.delivered}>Delivered</span>}
                  {i === 1 && <span className={styles.shipped}>Shipped</span>}
                  {i === 2 && <span className={styles.shipped}>Shipped</span>}
                  {i === 3 && <span className={styles.processing}>Processing</span>}
                  {i === 4 && <span className={styles.processing}>Processing</span>}
                  {i === 5 && <span className={styles.processing}>Processing</span>}
                </td>
                <td className={styles.payment_status}>
                  {i > 1 ? (
                    <span className={styles.processing}>Pending</span>
                  ) : (
                    <span className={styles.paid}>Paid</span>
                  )}
                </td>
                <td className={styles.total}>Rs. 1000.20</td>
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
