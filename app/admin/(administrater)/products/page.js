"use client";

import Link from "next/link";

import styles from "./page.module.css";
import formStyles from "@/public/styles/form.module.css";
import Card from "@/components/Card/Card";
import CheckBox from "@/components/CheckBox/CheckBox";
import frame from "@/public/images/frame.png";
import Image from "next/image";
import { useState } from "react";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";

export default function ProductsPage() {
  const [selectedProducts, setSelectedProducts] = useState([]);

  const productSelectHanler = (e) => {
    const { value } = e.target;
    if (selectedProducts.includes(value)) {
      setSelectedProducts((prev) => prev.filter((item) => item !== value));
    } else {
      setSelectedProducts((prev) => [...prev, value]);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>Products</h1>
        <Link className={styles.newProductLink} href="/admin/new-product">
          New Product
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
            <div className={styles.delete_btn}>Delete</div>
            <div className={styles.enable_or_disable_btn}>Disable</div>
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
              <th></th>
            </tr>
          </thead>
          <tbody>
            {new Array(6).fill("").map((_, i) => (
              <tr key={i}>
                <td className={styles.checkbox}>
                  <CheckBox
                    id={`all-products-${i}`}
                    value={i}
                    onClick={productSelectHanler}
                  />
                </td>
                <td className={`${styles.thumbnail} ${styles.image}`}>
                  <Image src={frame} width={60} height={55} alt="frame" />
                </td>
                <td className={styles.name}>
                  <Link href="#">Product {i + 1}</Link>
                </td>
                <td className={styles.price}>Rs 10.00</td>
                <td className={styles.sku}>SKU001</td>
                <td className={styles.stock}>10</td>
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
                <input className={formStyles.input} type="number" defaultValue="10" />
                per page
              </td>
              <td colSpan={4} className={styles.pagination}>
                <button className={styles.first}><AiOutlineDoubleLeft /></button>
                <button className={styles.prev}><HiOutlineChevronLeft /></button>
                <input className={formStyles.input} type="number" defaultValue="1" />
                <button className={styles.next}><HiOutlineChevronRight /></button>
                <button className={styles.last}><AiOutlineDoubleRight  /></button>
                <span>36 records</span>
              </td>
            </tr>
          </tfoot>
        </table>
      </Card>
    </div>
  );
}
