"use client";

import Link from "next/link";

import styles from "./page.module.css";
import formStyles from "@/public/styles/form.module.css";
import Card from "@/components/Card/Card";
import CheckBox from "@/components/CheckBox/CheckBox";
import { useState } from "react";
import Modal from "@/components/Modal/Modal";

export default function ProductsPage() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [modal, setModal] = useState(false);

  const categorySelectHandler = (e) => {
    const { value } = e.target;
    if (selectedCategories.includes(value)) {
      setSelectedCategories((prev) => prev.filter((item) => item !== value));
    } else {
      setSelectedCategories((prev) => [...prev, value]);
    }
  };

  const word = selectedCategories.length > 1 ? "categories" : "category";
  const grammar = selectedCategories.length > 1 ? "these" : "this";

  return (
    <div className={styles.container}>
      {modal && (
        <Modal
          btn1Text="Delete"
          btn2Text="Cancel"
          bgColor2="#d72c0d"
          onCancel={() => setModal(false)}
          title={`Delete ${selectedCategories.length} ${word}`}
          paragraph={`Are you sure you want to delete ${grammar} ${word}?`}
        />
      )}

      <div className={styles.title}>
        <h1>Coupons</h1>
        <Link className={styles.newCategoryLink} href="/admin/new-category">
          New Category
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
          <option value="parent">Parent Catgory</option>
          <option value="child">Child Category</option>
        </select>
        <select className={`${formStyles.select} ${styles.sort}`}>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="nameAsc">Name: A to Z</option>
          <option value="nameDesc">Name: Z to A</option>
          <option value="productsAsc">No. of products: Low to High</option>
          <option value="productsDesc">No. of products: High to Low</option>
        </select>

        {selectedCategories.length > 0 && (
          <div className={styles.controls}>
            <div className={styles.no_of_selected_items}>
              {selectedCategories.length} selected
            </div>
            <div className={styles.delete_btn} onClick={() => setModal(true)}>
              Delete
            </div>
          </div>
        )}

        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.checkbox}></th>
              <th className={styles.name}>Category Name</th>
              <th className={styles.no_of_products}>No. of products</th>
              <th className={styles.type}>Type</th>
              <th className={styles.is_in_menu}>Include in menu</th>
              <th className={styles.status}>Status</th>
            </tr>
          </thead>
          <tbody>
            {new Array(6).fill("").map((_, i) => (
              <tr key={i}>
                <td className={styles.checkbox}>
                  <CheckBox
                    id={`categories-${i}`}
                    value={i}
                    onClick={categorySelectHandler}
                  />
                </td>
                <td className={styles.name}>
                  <Link href={`/admin/new-category?category=${i}`}>Women</Link>
                </td>
                <td className={styles.no_of_products}>{Math.round((i * 6) / 4)}</td>
                <td className={styles.type}>{i % 4 ? "Parent" : "Child"}</td>
                <td className={styles.is_in_menu}>{i % 4 ? "Yes" : "No"}</td>
                <td className={styles.status}>
                  {/* <span className={styles.disabled} /> */}
                  <span disabled />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
