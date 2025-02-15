"use client";

// core modules
import Link from "next/link";
import { useState } from "react";

// custom components
import Card from "@/components/Card/Card";
import Modal from "@/components/_admin/Modal/Modal";
import CheckBox from "@/components/CheckBox/CheckBox";

// style modules
import styles from "./page.module.css";
import formStyles from "@/public/styles/form.module.css";

// react-icons
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";

export default function CustomerTable({ customers }) {
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [modalType, setModalType] = useState("");

  const productSelectHandler = (e) => {
    const { value } = e.target;
    if (selectedCustomers.includes(value)) {
      setSelectedCustomers((prev) => prev.filter((item) => item !== value));
    } else {
      setSelectedCustomers((prev) => [...prev, value]);
    }
  };

  const modalTitleKey = modalType === "disable" ? "Disable" : "Delete";
  const modalPargraphKey = modalType === "disable" ? "disable" : "delete";
  const btn1Text = modalType === "disable" ? "Disable" : "Delete";
  const elementName = selectedCustomers.length > 1 ? "customers" : "customer";
  const grammar = selectedCustomers.length > 1 ? "these" : "this";

  return (
    <div className={styles.container}>
      {modalType && (
        <Modal
          btn1Text={btn1Text}
          btn2Text="Cancel"
          bgColor2={modalType === "disable" ? "#2c6ecb" : "#d72c0d"}
          onCancel={() => setModalType("")}
          title={`${modalTitleKey} ${selectedCustomers.length} ${elementName}`}
          paragraph={`Are you sure you want to ${modalPargraphKey} ${grammar} ${elementName}?`}
        />
      )}

      <div className={styles.title}>
        <h1>Customers</h1>
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
          <option value="all">All</option>
          <option value="nameAsc">Name: A to Z</option>
          <option value="nameDesc">Name: Z to A</option>
        </select>

        {selectedCustomers.length > 0 && (
          <div className={styles.controls}>
            <div className={styles.no_of_selected_product}>
              {selectedCustomers.length} selected
            </div>
            {/* <div className={styles.enable} onClick={() => setModalType(true)}>
              Enable
            </div> */}
            <div
              className={styles.disable}
              onClick={() => setModalType("disable")}
            >
              Disable
            </div>
            <div
              className={styles.delete}
              onClick={() => setModalType("delete")}
            >
              Delete
            </div>
          </div>
        )}

        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.checkbox}></th>
              <th className={styles.fullname}>Full Name</th>
              <th className={styles.email}>Email</th>
              <th className={styles.phone}>Phone number</th>
              <th className={styles.orders}>Orders made</th>
              <th className={styles.status}>Verified</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer._id}>
                <td className={styles.checkbox}>
                  <CheckBox
                    id={customer._id}
                    value={customer._id}
                    onClick={productSelectHandler}
                  />
                </td>
                <td className={styles.fullname}>
                  <Link href={`/admin/customers/${customer._id}`}>
                    {customer.firstName} {customer.lastName}
                  </Link>
                </td>
                <td className={styles.email}>{customer.email}</td>
                <td className={styles.phone}>{customer.phone}</td>
                <td className={styles.orders}>{customer.orderCount}</td>
                <td className={styles.status}>
                  <span
                    className={customer.isVerified ? "" : styles.disabled}
                  />
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
