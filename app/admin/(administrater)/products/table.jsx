"use client";

import Link from "next/link";
import { Fragment, useState } from "react";
import Image from "next/image";

import styles from "./page.module.css";
import formStyles from "@/public/styles/form.module.css";
import Card from "@/components/Card/Card";
import CheckBox from "@/components/CheckBox/CheckBox";
import Modal from "@/components/Modal/Modal";
import frame from "@/public/images/frame.png";

import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";

export default function ProductTable({ products }) {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [modalType, setModalType] = useState("");

  const productSelectHandler = (e) => {
    const { value } = e.target;
    if (selectedProducts.includes(value)) {
      setSelectedProducts((prev) => prev.filter((item) => item !== value));
    } else {
      setSelectedProducts((prev) => [...prev, value]);
    }
  };

  const modalTitleKey = modalType === "disable" ? "Disable" : "Delete";
  const modalPargraphKey = modalType === "disable" ? "disable" : "delete";
  const btn1Text = modalType === "disable" ? "Disable" : "Delete";

  return (
    <Fragment>
      {modalType && (
        <Modal
          btn1Text={btn1Text}
          btn2Text="Cancel"
          bgColor2={modalType === "disable" ? "#2c6ecb" : "#d72c0d"}
          onCancel={() => setModalType("")}
          title={`${modalTitleKey} ${selectedProducts.length} products`}
          paragraph={`Are you sure you want to ${modalPargraphKey} this product?`}
        />
      )}

      <Card className={styles.card}>
        <input
          type="text"
          placeholder="Search"
          className={`${formStyles.input} ${styles.search}`}
        />
        <select className={`${formStyles.select}`}>
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <select className={`${formStyles.select} ${styles.sort}`}>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="priceAsc">Price: Low to High</option>
          <option value="priceDesc">Price: High to Low</option>
          <option value="nameAsc">Name: A to Z</option>
          <option value="nameDesc">Name: Z to A</option>
        </select>

        {selectedProducts.length > 0 && (
          <div className={styles.controls}>
            <div className={styles.no_of_selected_product}>
              {selectedProducts.length} selected
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
              <th className={styles.thumbnail}>thumbnail</th>
              <th className={styles.name}>Name</th>
              <th className={styles.price}>Price</th>
              <th className={styles.sku}>SKU</th>
              <th className={styles.stock}>Stock</th>
              <th className={styles.status}>Status</th>
            </tr>
          </thead>
          <tbody>
            {products.length &&
              products.map((product) => (
                <tr key={product._id}>
                  <td className={styles.checkbox}>
                    <CheckBox
                      id={`all-products-${product._id}`}
                      value={product._id}
                      onClick={productSelectHandler}
                    />
                  </td>
                  <td className={`${styles.thumbnail} ${styles.image}`}>
                    <Image
                      src={product.images[0]}
                      width={60}
                      height={55}
                      alt={product.name}
                    />
                  </td>
                  <td className={styles.name}>
                    <Link
                      href={`/admin/new-product?product=${product.url_key}`}
                    >
                      {product.name}
                    </Link>
                  </td>
                  <td className={styles.price}>Rs {product.price}</td>
                  <td className={styles.sku}>{product.url_key}</td>
                  <td className={styles.stock}>{product.quantity}</td>
                  <td className={styles.status}>
                    <span
                      className={
                        product.status === "enabled" ? "" : styles.disabled
                      }
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
    </Fragment>
  );
}
